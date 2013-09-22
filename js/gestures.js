//basic leap scripting
var controllerOptions = {enableGestures: true};
var time_last_gesture = 0;

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
    
    send_command( "voice_search", 0 );
    
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


Leap.loop(controllerOptions, function(frame) {
    
/*    //if there is a gesture 
    //Other events:
    var hx = frame.hands[0].sphereCenter[0];
    var yx = frame.hands[0].sphereCenter[1];

    send_command( "log",  hx );

    if ((hx > 150) && (hy > 300)) {
//	console.log( "Calling forward" );
	send_command( "forward", 4 );
    }
    if ((hx < -150) && (hy > 300)) {
//	console.log( "Calling backward" );
	send_command( "back", 4 );
    }
    */
    if ((frame.hands.length == 1) && (frame.gestures.length > 0)){
//	console.log( "Gesture!" );
	if ((frame.timestamp - time_last_gesture) > 500000){
	    time_last_gesture = frame.timestamp;
	    
	    var gesture = frame.gestures[0];
	    console.log(gesture.type);
	    switch (gesture.type){
	    case "swipe":
			var x = gesture.direction[0];
			var y = gesture.direction[1];
			
			var horiz = (Math.abs(x) > Math.abs(y));
			if ((horiz) && (x < 0)) {
			    //LEFT SWIPE
			    moveTabLeft();
			    
			} else if (horiz) {
			    //RIGHT SWIPE
			    moveTabRight();
			    
			} else if (!horiz && (y > 0)) {
			    //UP SWIPE
										    
					createNewTab();
					listenToAddress();    
			    
			    
			} else if (!horiz) {
			    //DOWN SWIPE
			    
			    removeActiveTab();
			    
			}
		break;
		case "screenTap":
			var x = gesture.position[0];
			if (x < -30){
				console.log("back");
				pageBack();
			} else if (x > 30) {
				pageForward();
			}

		break;
	    }
	}
    }
});  
