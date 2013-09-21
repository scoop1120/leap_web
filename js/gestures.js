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
		        if ((horiz) && (x < 0))
		          	//LEFT SWIPE
		      		//TAB NAV

		        else if (horiz)
		        	//RIGHT SWIPE
		        	//TAB NAV

		        else if (!horiz && (y > 0))
		        	//UP SWIPE
		        	//WHO KNOWS WAT TO MAP THIS TO
		        
		        else if (!horiz)
		        	//DOWN SWIPE
		        break;

		    case "circle":
		    	var clockwise;
   				if (circle.pointable.direction.angleTo(circle.normal) <= PI/4) {
       				clockwiseness = true;
   				}
   				else {
       				clockwiseness = false;
   				}
		    	if (clockwiseness){
		    		//CLOCKWISE CIRCLE
		    		//RELOAD
		    	}
		    	else {
		    		//CC CIRCLE
		    	}    
	    	    
    }
  }
})  
