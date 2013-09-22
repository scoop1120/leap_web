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
    
    //if there is a gesture 
    //Other events:
    var hx = frame.hands[0].sphereCenter[0];
    var yx = frame.hands[0].sphereCenter[1];
//    send_command( "log", "hx: " + hx + " hy: " + hy );
    if ((hx > 150) && (hy > 300)) {
//	console.log( "Calling forward" );
	send_command( "forward", 4 );
    }
    if ((hx < -150) && (hy > 300)) {
//	console.log( "Calling backward" );
	send_command( "back", 4 );
    }
    
    if ((frame.gestures.length > 0)){
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
				    if (frame.pointers.length>3){
					console.log("magic button");
					listenToAddress();			
				    } else if (frame.pointers.length>1){
					createNewTab();
				    } 
				    
				    
				    
				} else if (!horiz) {
				    //DOWN SWIPE
				    
				    removeActiveTab();
				    
				}
			break;
			case: "keyTap":
//				console.log("keyTap");
				listenToAddress();			


			break;
		
	    case "circle":
		
		var clockwise;
		//		if (gesture.pointable.direction.angleTo(gesture.normal) <= PI/4) {
		//      		clockwise = true;
//  		}
		// 		else {
//      	        clockwise = false;
		//  		}
		//		if (clockwise){
//		//CLOCKWISE CIRCLE
		//			chrome.tabs.reload();
		//		}
//		else {
		//		//CC CIRCLE
		//		} 
//		if (gesture.progress > 0.8) {
//		    chrome.tabs.reload();
	    //}

	    case "keyTap":
		listenToAddress();
		
	    }
	}
    }
});  
