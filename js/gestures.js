//basic leap scripting
var controllerOptions = {enableGestures: true};
var time_last_gesture = 0;

chrome.runtime.sendMessage({"cmd": "voice"});

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

function listenToAddress() {

    chrome.tabs.getAllInWindow( null, function( tabs ) {
	for (var i = 0; i < tabs.length; i++) {
	    if( tabs[i].active ) {
		chrome.tabs.sendMessage( tabs[i].id, {msg: "voice_search"} );
	    }
	}
    });
}

Leap.loop(controllerOptions, function(frame) {
    
    //if there is a gesture 
    if ((frame.gestures.length > 0)){
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
		    
		} else if (!horiz) {
		    //DOWN SWIPE
		    removeActiveTab();
		    		    
		}
		break;
		
	    case "circle":
		console.log("Circle gesture");
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
		chrome.tabs.reload();
		
	    }
	}
    }
})  
