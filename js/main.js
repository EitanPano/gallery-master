"use strict";

$(onInit);

function onInit() {
    console.log("Starting up");
    renderProjs();
}

function contactUs() {
    const inputEmail = $('inputEmail').val()
    const inputSubject = $('#inputSubject').val()
    const inputFlaotingText = $('#inputFloatingText').val()

    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=me@example.com&su=${inputSubject}&body=${inputFlaotingText}`);
}

