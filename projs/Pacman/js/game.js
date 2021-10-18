'use strict';
const WALL = '#';
const FOOD = '.';
const EMPTY = ' ';
const POWER = '⭐';
const CHERRY = '🍒';

const GSIZE = 11;

var elGameOver = document.querySelector('.game-over');
var gIntervalCherry;

var gFoodAmount = 0;
var gBoard;
var gGame = {
    score: 0,
    isOn: false
}

function init() {
    resetGame();
    console.log('hello');
    gBoard = buildBoard();
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container');
    gIntervalCherry = setInterval(genItem, 15000);
    makePrettyDOM()
}

function buildBoard() {
    var SIZE = GSIZE;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 1 && j === 1 || i === 1 && j === SIZE - 2 ||
                i === SIZE - 2 && j === 1 || i === SIZE - 2 && j === SIZE - 2) {
                board[i][j] = POWER;
            }
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === Math.floor(SIZE / 2 - 1) && i === Math.floor(SIZE / 2 - 1)) ||
                (j === Math.floor(SIZE / 2 + 1) && i === Math.floor(SIZE / 2 - 1)) ||
                (j === Math.floor(SIZE / 2 - 1) && i === Math.floor(SIZE / 2 + 1)) ||
                (j === Math.floor(SIZE / 2 + 1) && i === Math.floor(SIZE / 2 + 1))) {
                board[i][j] = WALL;
            }
            else gFoodAmount++;
        }
    }
    gFoodAmount -= 5;
    return board;
}

function updateScore(diff) {
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score;
}

function gameOver(stateSTR) {
    console.log('Game Over');
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    clearInterval(gIntervalCherry);
    elGameOver.querySelector('p').innerText = stateSTR;
    elGameOver.style.visibility = 'visible';
}

function resetGame() {
    elGameOver.style.visibility = 'hidden';
    gGame.score = 0;
    gGame.isOn = true;
    updateScore(0);
    gFoodAmount = -1;
}


function genItem(itemName = CHERRY) {
    var validCells = [];
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var currCell = gBoard[i][j];
            if (currCell === EMPTY) {
                validCells.push({ i, j });
            }
        }
    }
    if (!validCells.length) return;
        var randomCell = validCells[getRandomInt(0, validCells.length - 1)];
        gBoard[randomCell.i][randomCell.j] = CHERRY;
        renderCell(randomCell, itemName);
}

var elTd = document.getElementsByTagName('td');
function makePrettyDOM() {
    for (var i = 0; i < GSIZE ** 2; i++) {
        if (elTd[i].innerText === WALL) {
            elTd[i].style.backgroundColor = 'lightskyblue';
            elTd[i].style.color = '#ffffff00';
        }
        else if (elTd[i].innerText === FOOD) {
            elTd[i].style.color = 'rgb(237, 237, 177)';
        }
    }
    console.log(elTd);
}

