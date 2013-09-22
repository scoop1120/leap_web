/*  ***** GESTURES ******/
  var controllerOptions = {enableGestures: true};
  var time_last_gesture = 0;
  var window_width = 1920;
  var window_height = 1080;

  function moveTabLeft() {
      
      chrome.tabs.getAllInWindow(null, function(tabs) {
    for (var i = 0; i < tabs.length; i++) {
        if (tabs[i].active) {
      if (i > 0) {
          chrome.tabs.update(tabs[i-1].id, {active: true});
      }
        }
    }
      });
  }

  function moveTabRight() {
      
      chrome.tabs.getAllInWindow(null, function(tabs) {
    for (var i = 0; i < tabs.length; i++) {
        if (tabs[i].active) {
      if (i < tabs.length-1) {
          chrome.tabs.update(tabs[i+1].id, {active: true});
      }
        }
    }
    
      });
  }

  function createNewTab() {
      
      chrome.tabs.create({active: true});
      
  }

  function removeActiveTab() {
      
      chrome.tabs.getAllInWindow(null, function(tabs) {
    for (var i = 0; i < tabs.length; i++) {
        if (tabs[i].active) {
      chrome.tabs.remove( tabs[i].id );
      break;
        }
    }
      });
  }

  function scrollCommand( direction, amount ) {
      
      send_command( "scroll_"+direction, amount );
      
  }

  function listenToAddress() {
      
      //send_command( "voice_search", 0 );
      
  }

  function send_command( cmd, numarg ) {
      
    chrome.tabs.getAllInWindow( null, function( tabs ) {
      for (var i = 0; i < tabs.length; i++) {
        if( tabs[i].active ) {
          chrome.tabs.sendMessage( tabs[i].id, {msg: cmd, numarg: numarg} );
        }
    }
      });
  }
/* ***** END GESTURES *********/
/* ***** Canvas test ******/
  var previousFrame = null;
  var paused = false;
  var pauseOnGesture = false;

  //initial mouse
  var mouse = [0.5,0.5];
  //chrome.runtime.sendMessage({"type": "init_pos", "x": mouse[0], "y": mouse[1]});
  console.log(mouse[0]+mouse[1]);
  var mouse_color = "#0000ff";

/****** END CANVAS ********/ 
/*** WEB WORKER ****/
  var mathWorker = new Worker("math.js");
  mathWorker.postMessage("");
  console.log("made initial pos message");
  mathWorker.postMessage({"type": "init_pos", "x": mouse[0], "y": mouse[1]}); 

/**** END WEB WORKER ****/

Leap.loop(controllerOptions, function(frame) {
  /*** MOUSE MOVEMENT ****/
    //console.log("in leap loop"+ frame.hands.length);
    var clickable = true;
    var only_hand;
    var left_hand;
    var right_hand;
    //Output number of hands and assign hand vars
    if (frame.hands.length == 0){
      mouse_color = "#000000"; //black
    } 
    else if (frame.hands.length == 1) {
      only_hand = frame.hands[0];
      mouse_color = "#0000ff"; //blue
    } 
    else if (frame.hands.length == 2) {
      mouse_color = "#0000ff"; //red
      if (frame.hands[0].palmPosition[0] < frame.hands[1].palmPosition[0]) {
        var left_num = 0;
      } 
      else {
        var left_num = 1;
      }
      left_hand = frame.hands[left_num];
      right_hand = frame.hands[1-left_num];
      //send position data to math.js for processing
      //chrome.runtime.sendMessage({"type" : "hand_pos", "left_pos" : left_hand.palmPosition, "right_pos" : right_hand.palmPosition});
      console.log("updated");
      mathWorker.postMessage({"type" : "hand_pos", "left_pos" : left_hand.palmPosition, "right_pos" : right_hand.palmPosition}); 

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
        //sim_click(pointer_x, pointer_y);
      }
    } 
    else {
    }
})