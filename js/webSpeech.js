//webSpeech.js -- maybe???

function processToURL( text ) {

    var regex = new RegExp("[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?");
    if (!regex.test(text)) {
	return "http://www.google.com/search?q=" + text;
    }
    var result = "";
    if (!((text.substring(0,7)=="http://") or (text.substring(0,8)=="https://"))) {
	result = "http://"
    }
    return result + text;
    

}

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
	window.location = processToURL( interim );
	console.log( "Interpreted " + interim + " to " + processToURL( interim ) );
	
	
    }
}

//function webSpeechEnd (g){
//    recognition.stop();
//    listening = false;
//}
