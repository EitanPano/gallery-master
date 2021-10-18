'use strict';

let gProjs;

function _createProj(name, title, desc, url, imgUrl, labels) {
    const proj = {
        id: makeId(),
        name,
        title,
        desc,
        url,
        imgUrl,
        publishedAt: new Date(),
        labels
    };
    return proj;
}