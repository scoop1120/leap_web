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
//set number of smoothing frames
var smooth_frames = 20;
chrome.runtime.sendMessage({"type": "frame_num", "n": smooth_frames});

//initial mouse
var mouse = [0.5,0.5];
chrome.runtime.sendMessage({"type": "init", "x": mouse[0], "y": mouse[1]});
var mouse_color = "#0000ff";



$(window).resize(function(){
  window_width = $(window).width();
  window_height = $(window).height();
});

Leap.loop(controllerOptions, function(frame) {


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
    chrome.runtime.sendMessage({"type" : "hand pos", "left pos" : left_hand.palmPosition, "right pos" : right_hand.palmPosition}, 
      function(response) {
        mouse = [response.x, response.y];
      }
    );

    //figure out if mouse is clicking
    pointer_y = (1-mouse[1])*window_height;
    pointer_x = mouse[0]*window_width;
    //console.log(pointer_x+", "+pointer_y);

    if (right_hand.pointables.length == 1){
      mouse_color = "#00ff00"; //green
      sim_click(pointer_x, pointer_y);
    }

  } else {
  }
})




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
  return setInterval(draw, 10);
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
  console.log("SIM CLICK CALLED");
  var play = 50;
  var elem = document.elementFromPoint(x, y);
  $filtered = $(elem).find($('a')).filter( function (index){
   var offset = $(this).offset();
   //console.log(offset.top);
   //console.log(this);
   if((offset.top < x+play  && offset.top >= x-play) && (offset.left < y+play && offset.left > x-play)){
     //console.log("index passed");
     return index;
   }
   else {
    //console.log('index not passed');
    return;
   }
  });
  $filtered.eq(1);
  //console.log($filtered);
  var url;
  if(url = $filtered.context.href);
  else {
    //console.log("not found");
    $filtered = $filtered.find($('a'));
    if($filtered.context.href){
      $filtered = $filtered.closest($('a'));
    }
    url = $filtered.context.href;
  }

  //console.log($filtered.context.href);
  if(url){
    window.location.href = ($filtered.context.href);
  }
//$(document.elementFromPoint(x, y)).trigger('click'); 
//console.log("clicked");

}


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