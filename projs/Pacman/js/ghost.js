'use strict';
const GHOST = '👻';

var gGhostColor;
var gGhosts;
var gIntervalGhosts;
var gDeadGhosts = [];

function createGhost(board) {
    var ghost = {
        location: {
            i: Math.floor(GSIZE/2),
            j: Math.floor(GSIZE/2)
        },
        currCellContent: EMPTY,
        color: getRandomColor(),
    }
    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = GHOST;

}

function createGhosts(board) {
    gGhosts = [];
    createGhost(board);
    createGhost(board);
    createGhost(board);
    gIntervalGhosts = setInterval(moveGhosts, 1000);
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        moveGhost(ghost);
    }
}
function moveGhost(ghost) {
    var moveDiff = getMoveDiff();
    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    var nextCell = gBoard[nextLocation.i][nextLocation.j];
    if (nextCell === WALL) return;
    if (nextCell === GHOST) return;
    if (nextCell === PACMAN && gPacman.IsSuper) return;
    if (nextCell === PACMAN) {
        gameOver('YOU LOSE!');
        return;
    }

    // model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;
    // dom
    renderCell(ghost.location, ghost.currCellContent);

    // model
    ghost.location = nextLocation;
    ghost.currCellContent = gBoard[ghost.location.i][ghost.location.j];
    gBoard[ghost.location.i][ghost.location.j] = GHOST;
    // dom
    gGhostColor = (gPacman.isSuper) ? 'blue' : ghost.color;
    renderCell(ghost.location, getGhostHTML(ghost));
}

function getMoveDiff() {
    var randNum = getRandomInt(0, 100);
    if (randNum < 25) {
        return { i: 0, j: 1 };
    } else if (randNum < 50) {
        return { i: -1, j: 0 };
    } else if (randNum < 75) {
        return { i: 0, j: -1 };
    } else {
        return { i: 1, j: 0 };
    }
}

var strGhostHTML = `<div class="ghost" style="background-color:${gGhostColor}">
<div class="eyes">
  <div class="eye leftEye"><div class="iris"></div></div>
  <div class="eye rightEye"><div class="iris"></div></div>
</div>
<div class="ghostTail"></div>
</div>`
function getGhostHTML(ghost) {
    return `<div class="ghost" style="background-color:${gGhostColor}">
    <div class="eyes">
      <div class="eye leftEye"><div class="iris"></div></div>
      <div class="eye rightEye"><div class="iris"></div></div>
    </div>
    <div class="ghostTail"></div>
    </div>`;
}