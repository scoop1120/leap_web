//setting up the object
var recognition = new webkitSpeechRecognition();

//boolean keeping track of whether it is listening
var listening = false;

recognition.continuous= true;
recognition.lang = ["English",["en-US", "United States"]];
//recognition.interimResults = true;

recognition.onresult = function(e){
	var interim = "";
	if (e.results.length){
		for (var i = event.resultIndex; i < event.results.length; i++) {
			interim = event.results[i][0].transcript;
		};
	}
	
	//put interim in the address bar
}

function start (g){
	recognition.start();
	listening = true;
}

function end (g){
	recognition.stop;
	listening = false;
}