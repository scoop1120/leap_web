//background.js -- 
//

chrome.runtime.onMessage.addListener( 
    function (msg, sender, sendresp) {
	console.log(sender.tab ?
		    "from a content script:" + sender.tab.url :
		    "from the extension");
	sendresp( {url: "goodbye" } );
	chrome.tabs.getAllInWindow(null, function(tabs) {
	    for (var i = 0; i < tabs.length; i++) {
		if (tabs[i].active) {
		    chrome.tabs.update( tabs[i].id, { url: url } );
		}
	    }
	});
	
    });


