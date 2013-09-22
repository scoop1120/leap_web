//webSpeech.js -- maybe???

function processToURL( text ) {

    var prepend = "";
    if (text.substring(0,3)=="www.") {
      prepend = "http://";
    } else {
      prepend = "htt://www."
    }
    return prepend + text;
}

function google( query_string){
  return "http://www.google.com/search?q=" + text;
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
  if (interim.substring(0,8) = "close tab"){
    console.log("close tab");
  }
  console.log( "Interpreted " + interim + " to " + processToURL( interim ) );
  
  
    }
}

//function webSpeechEnd (g){
//    recognition.stop();
//    listening = false;
//}