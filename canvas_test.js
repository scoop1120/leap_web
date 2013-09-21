
//GLOBAL VARIABLES 
var window_width = $(window).width();
var window_height = $(window).height();
var pointer_diameter = 15;
var pointer_x = 5;
var pointer_y = 50;

$(window).resize(function(){
  window_width = $(window).width();
  window_height = $(window).height();
});


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
  var x = pointer_x-5;
  var y = pointer_y+5;
  clear();
  $('#canvas').css({
    top : y,
    left : x
  });
  ctx.fillStyle = "#0769AD";
  ctx.fillStyle = "#0769AD";
  circle(30, 30, 300);

}

function sim_click(x, y){
  console.log("SIM CLICK CALLED");
  var play = 50;
  var elem = document.elementFromPoint(x, y);
  $filtered = $(elem).find($('a')).filter( function (index){
   var offset = $(this).offset();
   console.log(offset.top);
   console.log(this);
   if((offset.top < x+play  && offset.top >= x-play) && (offset.left < y+play && offset.left > x-play)){
     console.log("index passed");
     return index;
   }
   else {
    console.log('index not passed');
    return;
   }
  });
  $filtered.eq(1);
  console.log($filtered);
  var url;
  if(url = $filtered.context.href);
  else {
    console.log("not found");
    $filtered = $filtered.find($('a'));
    if($filtered.context.href){
      $filtered = $filtered.closest($('a'));
    }
    url = $filtered.context.href;
  }

  console.log($filtered.context.href);
  if(url){
    window.location.href = ($filtered.context.href);
  }
//$(document.elementFromPoint(x, y)).trigger('click'); 
//console.log("clicked");

}


$(document).mousemove(function( event ) {
  pointer_x = event.pageX;
  pointer_y = event.pageY;
});

$(document).keyup(onKeyDown);

function onKeyDown(evt) {
  console.log("keydown");
  sim_click(pointer_x, pointer_y);
}

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