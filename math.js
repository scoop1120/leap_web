var init_pos;
var pos_array;
onmessage = function (oEvent) {
  if (oEvent.type == "init"){
  	init_pos = [oEvent.x,oEvent.y];
  	postMessage({"x": init_pos[0], "y": init_pos[1]});
  	
  } 
};
 