"use strict";

const PAGE_SIZE = 8;

let gShoes;
let gPageIdx = 0;
let gSortBy = {
    name: true,
    price: true,
    rating: true,
};

_createShoes();

function getShoes() {
    let shoes = gShoes;
    const fromIdx = gPageIdx * PAGE_SIZE;
    shoes = shoes.slice(fromIdx, fromIdx + PAGE_SIZE);
    return shoes;
}

function addShoe(vendor, model, price, description, imgUrl) {
    gShoes.push(_createShoe(vendor, model, price, description, imgUrl));
    _saveShoesToStorage();
}

function updateShoe(shoeId, newPrice) {
    const shoe = gShoes.find((shoe) => shoe.id === shoeId);
    shoe.price = newPrice;
    _saveShoesToStorage();
}

function removeShoe(shoeId) {
    const idx = gShoes.findIndex((shoe) => shoe.id === shoeId);
    gShoes.splice(idx, 1);
    _saveShoesToStorage();
}

function RateShoeHigher(shoeId) {
    const shoe = gShoes.find((shoe) => shoe.id === shoeId);
    if (shoe.rating >= 10) return;
    shoe.rating++;
    _saveShoesToStorage();
}

function RateShoeLower(shoeId) {
    const shoe = gShoes.find((shoe) => shoe.id === shoeId);
    if (shoe.rating <= 0) return;
    shoe.rating--;
    _saveShoesToStorage();
}

// prettier-ignore
function setSort(sortBy) {
    switch (sortBy) {
    case "NAME":
        if (gSortBy.name) {
            _resetSortBy();
            gSortBy.name = false;
            gShoes.sort((a, b) => a.vendor.toLowerCase() < b.vendor.toLowerCase() ? -1 : 1);
        } else {
            gSortBy.name = true;
            gShoes.sort((a, b) =>b.vendor.toLowerCase() < a.vendor.toLowerCase() ? -1 : 1);
        }
        break;
    case "PRICE":
        if (gSortBy.price) {
            _resetSortBy();
            gSortBy.price = false;
            gShoes.sort((a, b) => a.price - b.price);
        } else {
            gSortBy.price = true;
            gShoes.sort((a, b) => b.price - a.price);
        }
        break;
    case "RATING":
        if (gSortBy.rating) {
            _resetSortBy();
            gSortBy.rating = false;
            gShoes.sort((a, b) => b.rating - a.rating);
        } else {
            gSortBy.rating = true;
            gShoes.sort((a, b) => a.rating - b.rating);
        }
        break;
    }
}
// prettier-ignore-end

function _resetSortBy() {
    gSortBy.name = true;
    gSortBy.price = true;
    gSortBy.rating = true;
}

function _createShoe(
    vendor,
    model,
    imgUrl,
    price = 199,
    description = makeLorem(60)
) {
    const shoe = {
        id: makeId(),
        vendor,
        model,
        imgUrl,
        description,
        price,
        rating: 0,
    };
    return shoe;
}

function _createShoes() {
    let shoes = loadFromStorage("ShoesDB");
    if (!shoes || !shoes.length) {
        shoes = [
            _createShoe("Nike", "Zoom", "img/nike_zoom.jpg"),
            _createShoe("Crocs", "Sharkey", "img/crocs_shark.jpg"),
            _createShoe("Adidas", "Ultraboost", "img/adidas_ultraboost.jpg"),
        ];
    }
    gShoes = shoes;
    _saveShoesToStorage();
}

function _saveShoesToStorage() {
    saveToStorage("ShoesDB", gShoes);
}

function nextPage() {
    if (gShoes.length <= (gPageIdx + 1) * PAGE_SIZE) return;
    gPageIdx++;
}

function prevPage() {
    if (gPageIdx * PAGE_SIZE <= 0) return;
    gPageIdx--;
}
