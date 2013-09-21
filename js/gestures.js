//basic leap scripting
var controllerOptions = {enableGestures: true};
var time_last_gesture = 0;

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
			      		//TAB NAV
				    console.log("left swipe");
				  
				    chrome.tabs.getAllInWindow(null, function(tabs) {
					for (var i = 0; i < tabs.length; i++) {
					    if (tabs[i].active) {
							if (i > 0) {
							    chrome.tabs.update(tabs[i-1].id, {active: true});
							} else {
								chrome.tabs.update(tabs[tabs.length-1].id, {active: true});
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
							} else{
								chrome.tabs.update(tabs[0].id,{active: true});
							}
					    }
					}

				    });
			        } else if (!horiz && (y > 0)) {
			        	//UP SWIPE
			        	//WHO KNOWS WAT TO MAP THIS TO
			            console.log("up swipe");
			            if (gesture.handIds.length>1){
			            	console.log("magic button");
			            	//put webspeech stuff here
			            	chrome.tabs.reload();
			            }else {
				    		chrome.tabs.create({active: true});
				    	}
				    
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
			    	console.log("Circle gesture");
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
					//if (gesture.progress >1)
			        	chrome.tabs.reload();
			
		    	    
		    }
		}
	}
})  
