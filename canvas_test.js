//GLOBAL VARIABLES 
var window_width = $(window).width();
var window_height = $(window).height();
var pointer_diameter = 15;
var pointer_x = 5;
var pointer_y = 50;

var previousFrame = null;
var paused = false;
var pauseOnGesture = false;

var click_counter = 0;

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
	
    var scrollConstant = 40;
    var diff = 1/(.15);
	//scroll functionality
	//scales with closeness to edge
	if ((1-mouse[1]) > .85)
	    scrollDown(scrollConstant*(1-diff*mouse[1]));
	
	if ((1-mouse[1]) < .15)
	    scrollUp(scrollConstant*(diff*mouse[1]) + 1 - diff);
	
	if (mouse[0] < .15)
	    scrollLeft(scrollConstant*(1-diff*mouse[0]));
	
	if (mouse[0] > .85)
	    scrollRight(scrollConstant*(diff*mouse[0]) + 1 - diff);  
	//console.log(pointer_x+", "+pointer_y);
	
	if ((right_hand.pointables.length == 1) 
	    && clickable){
      if(click_counter > 5){
  	    clickable = false;
  	    setTimeout( function () { clickable = true; }, 500 );
  	    mouse_color = "#00ff00"; //green
  	    sim_click(pointer_x, pointer_y);
        click_counter = -30;
	    }
      else {
        click_counter++;
      }
   }
   else {
    mouse_color = "#0000ff"; //red

    click_counter = 0;
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


function circle(x,y,r,a) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*a, true);
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
    circle(5, 0, 100, 1);
    rect(5,0, 100, 150);

}



function sim_click(x, y){
   
/*    //new code

    var play = 50;
    var elem = document.elementFromPoint(x-2, y-2);
   
    if (elem != null) {
	elem.click();
    }
}  
/*/
//old code

console.log("SIM CLICK CALLED");

  var click_at = document.elementFromPoint(x+7,y-3);
  $(click_at).click();

  /*
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
*/

}/**/


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

  $('input').focus(function(target){
    inputSpeechStart(function(e) {
      $(target.currentTarget).val(e);
    });  
    console.log("focused on input"+e);
  });


});
