//webSpeech.js -- maybe???

function webSpeechStart (g){
    console.log( "Web speech started" );
    //setting up the object
    var recognition = new webkitSpeechRecognition();
    
    //boolean keeping track of whether it is listening
    var listening = false;
    
    recognition.continuous= false;
    recognition.lang = ["English",["en-US", "United States"]];
    //recognition.interimResults = true;
    
    recognition.start();
    listening = true;

    recognition.onresult = function(e){
	var interim = "";
	if (e.results.length){
	    for (var i = event.resultIndex; i < event.results.length; i++) {
		interim = event.results[i][0].transcript;
	    };
	}
	window.location = "http://www.google.com/search?q=" + interim;
	console.log( "Interpreted " + interim );
	
	
    }
}

//function webSpeechEnd (g){
//    recognition.stop();
//    listening = false;
//}
