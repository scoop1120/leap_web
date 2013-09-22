//WEB WORKERS 
var mathWorker = new Worker("math.js");

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
mathWorker.postMessage({"type": "init", "x": mouse[0], "y": mouse[1]});
var mouse_color = "#0000ff";

//mouse parameters
var y_min = 75;
var y_max = 240;
var Left_x_min = -180;
var Left_x_max = -30;
var Right_x_min = 30;
var Right_x_max = 180;


$(window).resize(function(){
  window_width = $(window).width();
  window_height = $(window).height();
});


function vectorCoordScale(vector, x_min, x_max, y_min, y_max){
  return [vectorScale(vector,x_min,x_max,0),vectorScale(vector,y_min,y_max,1)];
}
function vectorScale(vector, min, max, i){
  //Requires: min < max, i < vector.length
  //Effects: scales ith value of vector to range
  //of 0 to 1.
  /*
  if (vector[i] < min){
    return 0;
  } else if (vector[i] > max){
    return 1;
  } else {
    */
    return (vector[i]-min)/(max-min);
  //}
}

mathWorker.onmessage = function (oEvent) {
  console.log(oEvent.x + ", " + oEvent.y);
};



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
    //calculate relative hand positions
    left_contrib = vectorCoordScale(left_hand.palmPosition,Left_x_min,Left_x_max,y_min,y_max);
    right_contrib = vectorCoordScale(right_hand.palmPosition,Right_x_min,Right_x_max,y_min,y_max);
    //calculate total contribution with ratio 5:1
    total_contrib = [10.0/12.0*left_contrib[0]+2.0/12.0*right_contrib[0],10.0/12.0*left_contrib[1]+2.0/12.0*right_contrib[1]];
    //use total_contrib to change mouse position
    mouse = total_contrib;
    //figure out if mouse is clicking
    pointer_y = (1-mouse[1])*window_height;
    pointer_x = mouse[0]*window_width;
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
