//contentscript.js -- content scripts!!!
//These are injected into the webpage.
//use Chrome extensions

chrome.runtime.onMessage.addListener(function(msge, sender, sendResponse) {
   
    var msg = msge.msg
    var num = msge.numarg
    console.log( "Msg: " + msg );

    if (msg == "back") {
	pageBack();
    } else if (msg == "forward") {
	pageForward();
    } else if (msg == "refresh") {
	pageRefresh();
    } else if (msg == "scroll_up") {
	scrollUp(numarg);
    } else if (msg == "scroll_down") {
	scrollDown(numarg);
    } else if (msg == "scroll_left") {
	scrollLeft(numarg);
    } else if (msg == "scroll_right") {
	scrollRight(numarg);
    } else if (msg == "voice_search") {
	webSpeechStart();
    }
    

    sendResponse();
});

console.log( "BLAHBLAH" );

