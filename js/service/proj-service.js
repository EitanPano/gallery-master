"use strict";

let gProjs;
_createProjs();

console.log(gProjs);

function _createProj(name, title, desc, url, imgUrl, labels) {
    const proj = {
        id: name.toLowerCase(),
        name,
        title,
        desc,
        url,
        imgUrl,
        publishedAt: new Date(),
        labels,
    };
    return proj;
}

function _createProjs() {
    const projs = [
        _createProj(
            "Minersweeper",
            "Don't Blow Up",
            "in progress",
            "https://eitanpano.github.io/Minesweeper/",
            "../../img/minesweeper.png",
            ["Matrixes", "Css"],
        ),
    ];
    gProjs = projs;
}
