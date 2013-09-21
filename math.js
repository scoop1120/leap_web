//mouse parameters
var y_min = 75;
var y_max = 240;
var Left_x_min = -180;
var Left_x_max = -30;
var Right_x_min = 30;
var Right_x_max = 180;



chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
    console.log(response.farewell);
  });
});




//calculate relative hand positions
    left_contrib = vectorCoordScale(left_hand.palmPosition,Left_x_min,Left_x_max,y_min,y_max);
    right_contrib = vectorCoordScale(right_hand.palmPosition,Right_x_min,Right_x_max,y_min,y_max);
    //calculate total contribution with ratio 5:1
    total_contrib = [10.0/12.0*left_contrib[0]+2.0/12.0*right_contrib[0],10.0/12.0*left_contrib[1]+2.0/12.0*right_contrib[1]];
    //use total_contrib to change mouse position
    mouse = total_contrib;



function vectorCoordScale(vector, x_min, x_max, y_min, y_max){
  return [vectorScale(vector,x_min,x_max,0),vectorScale(vector,y_min,y_max,1)];
}
function vectorScale(vector, min, max, i){
  //Requires: min < max, i < vector.length
  //Effects: scales ith value of vector to range
  //of 0 to 1.
  /*
  if (vector[i] < min){
    return 0;
  } else if (vector[i] > max){
    return 1;
  } else {
    */
    return (vector[i]-min)/(max-min);
  //}
}