//contentscript.js -- content scripts!!!
//These are injected into the webpage.
//use Chrome extensions

chrome.extension.onRequest.addListener(function(msg, sender, sendResponse) {
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
    }

    alert( msg );

    sendResponse();
});

