//voice_rec.js -- basic voice recognition
//

function getSpeech( callback ) {

    var recognition = new webkitSpeechRecognition();
    recognition.start();
    recognition.onresult = function( event ) {
	callback( event.results );
    }

}
