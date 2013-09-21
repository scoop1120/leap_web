//page_nav.js -- a basic api for browser actions

//Scrolls the page down amount or 50 px
function scrollDown(amount) {

    window.scrollBy(0,amount);

}

//Scrolls the page up amount or 50 px
function scrollUp(amount) {

    window.scrollBy(0,-amount);

}

//Scrolls the page left amount or 50 px
function scrollLeft(amount) {

    window.scrollBy(amount,0);

}

//Scrolls the page right amount or 50 px
function scrollRight(amount) {

    window.scrollBy(-amount,0);

}

function pageBack() {

    history.go(-1);

}

function pageForward() {

    history.go(1);

}

function pageRefresh() {

    location.reload();

}
