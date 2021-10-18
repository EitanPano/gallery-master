"use strict";

// NOTE: This is a global used only in the controller
let gLastRes = null;

$(document).ready(init);
$(".btn-start").click(onStartGuessing);
$(".btn-yes").click({ ans: "yes" }, onUserResponse);
$(".btn-no").click({ ans: "no" }, onUserResponse);
$(".btn-add-guess").click(onAddGuess);

function init() {
    console.log("Started...");
    gQuestsTree = loadFromStorage(QUESTS_DB);
    if (!gQuestsTree) createQuestsTree();
    setStartPoint();
}

function onStartGuessing() {
    // hide the game-start section
    $(".game-start").hide();
    renderQuest();
    // show the quest section
    $(".quest").show();
}

function renderQuest() {
    // select the <h2> inside quest and update
    // its text by the currQuest text
    $(".quest h2").text(getCurrQuest().txt);
}

function onUserResponse(ev) {
    const res = ev.data.ans;
    // If this node has no children
    if (isChildless(getCurrQuest())) {
        if (res === "yes") {
            alert("Yes, I knew it!");
            // TODO: improve UX
            init();
            onRestartGame();
        } else {
            $(".quest").hide();
            $(".new-quest").show();
        }
    } else {
        gLastRes = res;
        moveToNextQuest(res);
        renderQuest();
    }
}

function onAddGuess(ev) {
    ev.preventDefault();
    const newGuess = $("#newGuess").val();
    const newQuest = $("#newQuest").val();

    addGuess(newQuest, newGuess, gLastRes);
    saveToStorage(QUESTS_DB, gQuestsTree);
    onRestartGame();
}

function onRestartGame() {
    $(".new-quest").hide();
    $(".game-start").show();
    $('.quest').hide();
    gLastRes = null;
}
