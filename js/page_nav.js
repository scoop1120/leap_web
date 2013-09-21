//page_nav.js -- a basic api for browser actions

//Scrolls the page down amount or 50 px
function scrollDown(amount=50) {

    window.scrollBy(0,amount);

}

//Scrolls the page up amount or 50 px
function scrollUp(amount=50) {

    window.scrollBy(0,-amount);

}

//Scrolls the page left amount or 50 px
function scrollLeft(amount=50) {

    window.scrollBy(amount,0);

}

//Scrolls the page right amount or 50 px
function scrollRight(amount=50) {

    window.scrollBy(-amount,0);

}
