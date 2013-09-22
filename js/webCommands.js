//webSpeech.js -- maybe???

/*function createNewBookmark() {

    chrome.tabs.getCurrent( function (curtab) {
	
	var partabid = curtab.openerTabId
	chrome.bookmarks.create( {title:"title",
				  url: 

    );
*/
function processToURL( text ) {

    var prepend = "";
    if (text.substring(0,3)=="www.") {
      prepend = "http://";
    } else {
      prepend = "http://www."
    }
    return prepend + text;
}

function google( query_string){
  return "http://www.google.com/search?q=" + text;
}

function inputSpeechStart( callback ) {

    var recognition = new webkitSpeechRecognition();
    var processed = "";
    
    recognition.continuous = false;
    recognition.lang = ["English",["en-US", "United States"]];

    recognition.start();
    
    recognition.onresult = function (e) {

	var interim = "";
	if (e.results.length) {
	    for (var i = event.resultIndex; i < event.results.length; i++) {
		interim = event.results[i][0].transcript;
	    };
	}
	callback( interim );
    };
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
	if (interim.substring(0,10) == "navigate me to" || interim.substring(0,10) == "Navigate me to" ){
	    processed = processToURL(interim.substring(11, interim.length) );
	    console.log("navigate to "+ processed);
	    window.location = processed;
	}
	if (interim.substring(0,5) = "google" ){
	    processed = google( interim.substring(6,interim.length));
	    console.log("google " + processed);
	    window.location = processed;
	}
	console.log( "Interpreted " + interim + " to " + processToURL( interim ) );
	
	
    }
}

//function webSpeechEnd (g){
//    recognition.stop();
//    listening = false;
//}
