//GLOBAL VARIABLES 
var window_width = $(window).width();
var window_height = $(window).height();
var pointer_diameter = 15;
var pointer_x = 5;
var pointer_y = 50;
var mouse_color = '#FF0000';



$(window).resize(function(){
  window_width = $(window).width();
  window_height = $(window).height();
});


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

}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log("recieved message");
    pointer_x = request.x;
    pointer_y = request.y;
  }
);


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

var intervalID = init();

});
