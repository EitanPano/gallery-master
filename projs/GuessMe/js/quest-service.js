const QUESTS_DB = 'questsTree';

let gQuestsTree;
let gCurrQuest;
let gPrevQuest = null;

function createQuestsTree() {
    gQuestsTree = createQuest('Is it a girl?');
    gQuestsTree.yes = createQuest('Rita');
    gQuestsTree.no = createQuest('Ghandi');
}

function setStartPoint() {
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    gPrevQuest = gCurrQuest;
    gCurrQuest = gCurrQuest[res];
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
    const newQuest = createQuest(newQuestTxt);
    newQuest.yes = createQuest(newGuessTxt);
    newQuest.no = gCurrQuest;
    console.log(newQuestTxt);
    gPrevQuest[lastRes] = newQuest;
    gCurrQuest = gQuestsTree;
}

function getCurrQuest(){
    return gCurrQuest
}