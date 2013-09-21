//contentscript.js -- content scripts!!!
//These are injected into the webpage.
//use Chrome extensions

chrome.runtime.onMessage.addListener(function(msge, sender, sendResponse) {
   
    var msg = msge.msg
    console.log( "Msg: " + msg );

    if (msg == "back") {
	pageBack();
    } else if (msg == "forward") {
	pageForward();
    } else if (msg == "refresh") {
	pageRefresh();
    } else if (msg == "scroll_up") {
	scrollUp();
    } else if (msg == "scroll_down") {
	scrollDown();
    } else if (msg == "scroll_left") {
	scrollLeft();
    } else if (msg == "scroll_right") {
	scrollRight();
    } else if (msg == "voice_search") {
	webSpeechStart();
    }
    

    sendResponse();
});

console.log( "BLAHBLAH" );

