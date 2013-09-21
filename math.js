//number of smoothing frames
var smooth_frames = 15;
//ratio parameter
ratio = 5.0;
//mouse parameters for min and max
var y_min = 75;
var y_max = 240;
var Left_x_min = -180;
var Left_x_max = -30;
var Right_x_min = 30;
var Right_x_max = 180;
//initialize data
var data = new array();



chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  	//get the initial position and fill the data array 
    if (request.type == "init_pos"){
    	for (var i = 0; i < smooth_frames; i++) {
    		data[i] = new array();
    		data[i][0] = request.x;
    		data[i][1] = request.y;
    	};
    	//scales hand data and pushes into data array
    } else if (request.type == "hand_pos"){
    	//calculate relative hand positions
    	left_contrib = vectorCoordScale(request.left_pos,Left_x_min,Left_x_max,y_min,y_max);
    	right_contrib = vectorCoordScale(request.right_pos,Right_x_min,Right_x_max,y_min,y_max);
    	//calculate total contribution with ratio 5:1
    	total_contrib = [ratio/(1+ratio)*left_contrib[0] + 1/(1+ratio)*right_contrib[0], ratio/(1+ratio)*left_contrib[1] + 1/(1+r)*right_contrib[1]];
    	console.log("contrib point = (" + total_contrib[0] + ", " + total_contrib[1] + ")");
    	//shift array
    	for (var i = 0; i < smooth_frames - 1; i++) {
    		data[i] = data[i+1];
    	};
    	//put total_contrib in array
    	data[smooth_frames-1] = total_contrib;
    	var x_sum = 0.0;
    	var y_sum = 0.0;
    	for (var i = 0; i < smooth_frames; i++) {
    		x_sum += data[i][0];
    		y_sum += data[i][1];
    	};
    	var x_val = chop(x_sum/smooth_frames);
    	var y_val = chop(y_sum/smooth_frames);
    	console.log("smooth point = (" + x_val + ", " + y_val + ")");
    	sendResponse({"x": x_val, "y": y_val});
    }
  }
);

function chop(number){
	if (number < 0){
		return 0;
	} else if (number > 1){
		return 1;
	} else {
		return number;
	}
}

function vectorCoordScale(vector, x_min, x_max, y_min, y_max){
  return [vectorScale(vector,x_min,x_max,0),vectorScale(vector,y_min,y_max,1)];
}
function vectorScale(vector, min, max, i){
    return (vector[i]-min)/(max-min);
}