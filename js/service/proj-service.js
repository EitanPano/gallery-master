"use strict";

let gProjs;
_createProjs();

function getProjs() {
    return gProjs;
}

function _createProj(name, title, desc, url, imgUrl, labels) {
    const proj = {
        id: name.toLowerCase(),
        name,
        title,
        desc,
        url,
        imgUrl,
        publishedAt: new Date().toJSON().slice(0,10).split('-').reverse().join('-'),
        labels,
    };
    return proj;
}

function _createProjs() {
    const projs = [
        _createProj(
            "Minesweeper",
            "Don't Blow Up",
            "The rule of the game is simple, the number on a block shows the number of mines adjacent to it and you have to flag all the mines. Some terms: Flag: Put a flag in a zone when you have confirmed that there is a mine. Question Mark: Put a question mark when you suspect that there is a mine",
            "https://eitanpano.github.io/Minesweeper/",
            "img/portfolio/minesweeper.png",
            ["Matrixes", "Deadlines"],
        ),
        _createProj(
            "GuessMe",
            "Guess who? Guess me!",
            "For each answer, Jini computes the best question to ask the player and finally gives a guess as to who this player is thinking of. If the first guess is not correct, Jini continues to ask questions, and so on up to three guesses; the first one being generally after 15–20 questions.",
            "projs/GuessMe",
            "img/portfolio/guessme.jpg",
            ["Objects", "Complications"],
        ),
        _createProj(
            "MemoryGame",
            "Flip the card pairs",
            "Train your brain!<br>How good is YOUR memory? Race to find all the pairs by turning over two cards at a time. If you don’t find a pair, you'll have to remember what you saw as the cards turn face down again.",
            "projs/MemoryGame",
            "img/portfolio/memorygame.png",
            ["Beginner", "CA-Bonus"],
        ),
        _createProj(
            "Pacman",
            "Eat everything, RUN!",
            "Playing Pacman is easy to learn and hard to master (like all classic games). Simply score as many points as you can eating the small dots all around the maze. 10 points per dot (240 of them). Big points come when you eat 1 of the 4 Big flashing dots called Energizers worth 50 points located in each corner of the maze.",
            "projs/Pacman",
            "img/portfolio/pacman.png",
            ["Matrixes", "OOP"],
        ),
        _createProj(
            "ShoesManager",
            "Manage your shoes store",
            "You may use this crud based app to manage your shoes, basically it's not even done.",
            "projs/ShoeManagement",
            "img/portfolio/shoesmanager.jpg",
            ["CRUD", "MVC"],
        ),
    ];
    gProjs = projs;
}
