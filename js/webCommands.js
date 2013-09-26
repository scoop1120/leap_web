//webSpeech.js -- maybe???


function processToURL( text ) {

    console.log( text );
    var prepend = "";
    if (text.substring(0,4)=="www.") {
      prepend = "http://";
    } else {
      prepend = "http://www."
    }
    return prepend + text;
}

function google( query_string){
  return "http://www.google.com/search?q=" + query_string;
}

function webSpeechStart (g){
    console.log( "Web commands started" );
    //setting up the object
    var recognition = new webkitSpeechRecognition();
    var processed = "";
    //boolean keeping track of whether it is listening
    var listening = false;
    
    recognition.continuous= false;
    recognition.lang = ["English",["en-US", "United States"]];
    //recognition.interimResults = true;
    
    recognition.start();
    console.log( "Started listening" );
    listening = true;
    
    recognition.onresult = function(e){
	var interim = "";
	if (e.results.length){
	    for (var i = event.resultIndex; i < event.results.length; i++) {
		interim = event.results[i][0].transcript;
	    };
	}
	
	if ((interim.substring(0,14) == "navigate me to") || (interim.substring(0,14) == "Navigate me to" )){
	    var subs = interim.substring(15);
	    console.log( subs );
	    processed = processToURL(subs);
	    console.log("navigate to "+ processed);
	    window.location = processed;
	    return;
	} else if ((interim.substring(0,11) == "navigate to") || (interim.substring(0,11) == "Navigate to" )) {
	    var subs = interim.substring(12);
	    processed = processToURL(subs);
	    window.location.href = processed;
	    return;
	} else if (interim.substring(0,6) == "Google" ){
	    processed = google( interim.substring(6,interim.length));
	    console.log("google " + processed);
	    window.location = processed;
	    return;
	} else if ((interim == "create new bookmark") || (interim == "Create new bookmark")) {
	    create_new_bookmark();
	    return;
	} else if (interim.toLowerCase() == "sing me a song") {
	    window.location = "http://www.youtube.com/watch?v=41U78QP8nBk";
	    return;
	} else if (interim.toLowerCase() == "play me a song") {
	    window.location = "http://www.youtube.com/watch?v=ehpYg0NsGqA";
	    return;
	} else if (interim.toLowerCase() == "say something dirty") {
	    speechSynthesis.speak(SpeechSynthesisUtterance('I want to see you naked and in the shower.'));
	    return;
	}
	proc = processToURL( interim );
	console.log( "Interpreted " + interim + " to " + proc );
//	window.location = proc;
	
	
    }
}

//function webSpeechEnd (g){
//    recognition.stop();
//    listening = false;
//}
