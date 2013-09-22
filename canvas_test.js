//GLOBAL VARIABLES 
var window_width = $(window).width();
var window_height = $(window).height();
var pointer_diameter = 15;
var pointer_x = 5;
var pointer_y = 50;

var previousFrame = null;
var paused = false;
var pauseOnGesture = false;

// Setup Leap loop with frame callback function
var controllerOptions = {enableGestures: true};

//initial mouse
var mouse = [0.5,0.5];
chrome.runtime.sendMessage({"type": "init_pos", "x": mouse[0], "y": mouse[1]});
console.log(mouse[0]+mouse[1]);
var mouse_color = "#0000ff";



$(window).resize(function(){
  window_width = $(window).width();
  window_height = $(window).height();
});


Leap.loop(controllerOptions, function(frame) {

    var clickable = true;
  var only_hand;
  var left_hand;
  var right_hand;
  //Output number of hands and assign hand vars
  if (frame.hands.length == 0){
    mouse_color = "#000000"; //black
  } else if (frame.hands.length == 1) {
    only_hand = frame.hands[0];
    mouse_color = "#0000ff"; //blue
  } else if (frame.hands.length == 2) {
    mouse_color = "#0000ff"; //red
    if (frame.hands[0].palmPosition[0] < frame.hands[1].palmPosition[0]) {
      var left_num = 0;
    } else {
      var left_num = 1;
    }
    left_hand = frame.hands[left_num];
    right_hand = frame.hands[1-left_num];
    //send position data to math.js for processing
    chrome.runtime.sendMessage({"type" : "hand_pos", "left_pos" : left_hand.palmPosition, "right_pos" : right_hand.palmPosition}, 
      function(response) {
        mouse = [response.x, response.y];
      }
    );

    //figure out if mouse is clicking
    pointer_y = (1-mouse[1])*window_height;
    pointer_x = mouse[0]*window_width;

    //scroll functionality
    //scales with closeness to edge
    if ((1-mouse[1]) > .9)
      scrollDown(60*(1-mouse[1]));

    if ((1-mouse[1]) < .1)
      scrollUp(60*(mouse[1]));

    if (mouse[0] < .1)
      scrollLeft(60*(1-mouse[0]));

    if (mouse[0] > .9)
      scrollRight(60*mouse[0]);    
    //console.log(pointer_x+", "+pointer_y);

    if ((right_hand.pointables.length == 1) 
	&& clickable){
	clickable = false;
	setTimeout( function () { clickable = true; }, 500 );
	mouse_color = "#00ff00"; //green
	sim_click(pointer_x, pointer_y);
    }

  } else {
  }
})


  function rect(x,y,w,h) {
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    ctx.closePath();
    ctx.fill();
  }


function circle(x,y,r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2, true);
    ctx.fill();
}

function clear() {
  ctx.clearRect(0, 0, window_width, window_height);
}

function init() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  return setInterval(draw, 100);
}


function draw() {
  var x = pointer_x;
  var y = pointer_y;
  clear();
  $('#canvas').css({
    top : y,
    left : x
  });
  ctx.fillStyle = mouse_color;
  ctx.fillStyle = mouse_color;
  circle(30, 30, 300);

}



function sim_click(x, y){
   
    var play = 50;
    var elem = document.elementFromPoint(x-2, y-2);
   
    if (elem != null) {
	elem.click();
    }
}  

//$(document.elementFromPoint(x, y)).trigger('click'); 
//console.log("clicked");




// $(document).mousemove(function( event ) {
//   pointer_x = event.pageX;
//   pointer_y = event.pageY;
// });

// $(document).keyup(onKeyDown);

// function onKeyDown(evt) {
//   console.log("keydown");
//   sim_click(pointer_x, pointer_y);
// }

$(document).ready( function(){



 var newCanvas = 
     $('<canvas/>',{'id':'canvas', 'class':'helloworld'})
     .width(pointer_diameter)
     .height(pointer_diameter)
     .css({
        position:'fixed',
        top : pointer_y,
        left : pointer_x,
        'z-index' : 99999
     });
$(document.body).prepend(newCanvas);
console.log("hello");




//console.log($('#canvas').width());

var intervalID = init();

});
