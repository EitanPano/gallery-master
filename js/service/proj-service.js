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
            "in progress",
            "https://eitanpano.github.io/Minesweeper/",
            "img/portfolio/minesweeper.png",
            ["Matrixes", "Css"],
        ),
    ];
    gProjs = projs;
}
