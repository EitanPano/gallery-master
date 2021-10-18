"use strict";

function makeId(length = 5) {
    const possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let txt = "";
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function makeLorem(num) {
    let lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam non porta nibh. Aenean ut velit id est rhoncus sodales vitae sed augue. Quisque a quam non ligula lobortis faucibus in non turpis. Donec et ipsum ante. Mauris convallis lorem eu augue posuere scelerisque. Cras commodo, justo non sagittis euismod, ipsum velit cursus eros, id fermentum ante erat a libero. Nulla et augue enim. Sed tincidunt viverra sem, ac interdum libero eleifend eget. Nullam nisl libero, varius ut vestibulum cursus, dignissim non metus. Fusce aliquet scelerisque tortor, id finibus mi vehicula et. Aliquam ac sodales enim. Aenean dolor erat, auctor ut ornare dignissim, consectetur ac eros. Nunc quis odio sodales, ullamcorper dolor id, ullamcorper lorem. Duis blandit cursus ligula, id ultrices erat semper at.`;
    lorem = lorem.split(" ");
    if (num <= lorem.length && num > 0) return lorem.slice(0, num).join(' ');
    console.log(`makeLorem() supports a maximum number of ${lorem.length}`);
    return lorem.slice(0, lorem.length).join(" ");
}
