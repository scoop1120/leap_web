//basic leap scripting
var controllerOptions = {enableGestures: true};

Leap.loop(controllerOptions, function(frame) {

	//if there is a gesture
	if (frame.gestures.length > 0){

	    var gesture = frame.gestures[0];

	    switch (gesture.type){
	      	case "swipe":
		        var x = gesture.direction[0];
		        var y = gesture.direction[1];

		        var horiz = (Math.abs(x) > Math.abs(y));
		        if ((horiz) && (x < 0)) {
		          	//LEFT SWIPE
		      		//TAB NAV
			    console.log("left swipe");
			  
			    chrome.tabs.getAllInWindow(null, function(tabs) {
				for (var i = 0; i < tabs.length; i++) {
				    if (tabs[i].active) {
					if (i > 0) {
					    chrome.tabs.update(tabs[i-1].id, {active: true});
					}
				    }
				}
			    });

		        } else if (horiz) {
		        	//RIGHT SWIPE
		        	//TAB NAV
			    console.log("right swipe");
			    chrome.tabs.getAllInWindow(null, function(tabs) {
				for (var i = 0; i < tabs.length; i++) {
				    if (tabs[i].active) {
					if (i < tabs.length-1) {
					    chrome.tabs.update(tabs[i+1].id, {active: true});
					}
				    }
				}
			    });
		        } else if (!horiz && (y > 0)) {
		        	//UP SWIPE
		        	//WHO KNOWS WAT TO MAP THIS TO
		            console.log("up swipe");
			    chrome.tabs.getAllInWindow(null, function(tabs) {
				for (var i = 0; i < tabs.length; i++) {
				    if (tabs[i].active) {
					
					chrome.windows.create( {url: tabs[i].url} );
					
				    }
				}
			    });
			    
		        } else if (!horiz) {
		        	//DOWN SWIPE
			    console.log("down swipe");
			    chrome.tabs.getAllInWindow(null, function(tabs) {
				for (var i = 0; i < tabs.length; i++) {
				    if (tabs[i].active) {
					chrome.tabs.remove( tabs[i].id );
					break;
				    }
				}
			    });
			}
		        break;

		    case "circle":
		    	var clockwise;
 // 				if (gesture.pointable.direction.angleTo(gesture.normal) <= PI/4) {
 //      				clockwise = true;
 //  				}
 // 				else {
 //      				clockwise = false;
 //  				}
//		    	if (clockwise){
//		    		//CLOCKWISE CIRCLE
//		    		chrome.tabs.reload();
//		    	}
//		    	else {
//		    		//CC CIRCLE
//		    	} 
		        chrome.tabs.reload();
		
	    	    
	    }
	}
})  
