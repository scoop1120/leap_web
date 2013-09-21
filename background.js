//background.js -- 
//
console.log( "From Background" );

function listenToAddress() {

    chrome.tabs.getAllInWindow( null, function( tabs ) {
	for (var i = 0; i < tabs.length; i++) {
	    if( tabs[i].active ) {
		chrome.tabs.sendMessage( tabs[i].id, {msg: "voice_search"} );
	    }
	}
    });
}




