'use strict'
const PACMAN = '😴';
var gPacmanSide;


var gPacman;
function createPacman(board) {
    gPacman = {
        location: {
            i: Math.floor(GSIZE / 2),
            j: Math.floor(GSIZE - 2)
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}
function movePacman(ev) {

    if (!gGame.isOn) return;
    // console.log('ev', ev);
    var nextLocation = getNextLocation(ev)

    if (!nextLocation) return;
    // console.log('nextLocation', nextLocation);

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('NEXT CELL', nextCell);

    if (nextCell === WALL) return;
    if (nextCell === FOOD) eatFood();
    if (nextCell === CHERRY) updateScore(10);
    else if (nextCell === POWER) {
        if (gPacman.isSuper) return;
        gPacman.isSuper = true;
        setTimeout(() => {
            gPacman.isSuper = false;

            gGhosts.push(...gDeadGhosts);
            // for (var i = 0; i < gDeadGhosts.length; i++) {
            // createGhost(gBoard);
            // console.log('Revive Here');

            // FAIL HERE

            // gDeadGhosts[i].location = {
            //     i: Math.floor(GSIZE / 2),
            //     j: Math.floor(GSIZE / 2)
            // }
            // gGhosts.push(gDeadGhosts.splice(i, 1,)[0]);
            // }
            gDeadGhosts = [];
        }, 5000);

    }
    else if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            for (var i = 0; i < gGhosts.length; i++) {
                if (gGhosts[i].location.i === nextLocation.i &&
                    gGhosts[i].location.j === nextLocation.j) {
                    if (gGhosts[i].currCellContent === FOOD) {
                        eatFood();
                        gGhosts[i].currCellContent = EMPTY;
                    };
                    var deadGhost = gGhosts.splice(i, 1)[0];
                    deadGhost.location = {
                        i: Math.floor(GSIZE/2),
                        j: Math.floor(GSIZE/2)
                    };
                    gDeadGhosts.push(deadGhost);
                    console.log('KILL');
                }
            }
        }
        else {
            gameOver('YOU LOSE!');
            renderCell(gPacman.location, EMPTY);
            return;
        }
    }

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

    // update the dom
    renderCell(gPacman.location, EMPTY);

    gPacman.location = nextLocation;

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // update the dom
    renderCell(gPacman.location, `<div class="pacman ${gPacmanSide}"></div>`);
}

function eatFood() {
    updateScore(1);
    gFoodAmount--;
    if (gFoodAmount === 0) {
        gameOver('YOU WIN!');
    }
}

function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            gPacmanSide = 'pacman-up';
            nextLocation.i--;
            break;
        case 'ArrowDown':
            gPacmanSide = 'pacman-down';
            nextLocation.i++;
            break;
        case 'ArrowLeft':
            gPacmanSide = 'pacman-left';
            nextLocation.j--;
            break;
        case 'ArrowRight':
            gPacmanSide = 'pacman-right';
            nextLocation.j++;
            break;
        default:
            return null;
    }
    return nextLocation;
}