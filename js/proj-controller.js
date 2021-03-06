"use strict";

function renderProjs() {
    const projs = getProjs();
    const strHTML = projs.map((proj) => {
        return `<div class="col-md-4 col-sm-6 portfolio-item" onclick="renderProjModal('${proj.id}')">
        <a class="proj-card portfolio-link" data-toggle="modal" href="#${proj.id}">
        <div class="portfolio-hover">
        <div class="portfolio-hover-content">
        <i class="fa fa-plus fa-2x"></i>
        </div>
        </div>
        <img class="img-fluid" src="${proj.imgUrl}" alt="${proj.name}">
        </a>
        <div class="portfolio-caption">
        <h4>${proj.name}</h4>
        <p class="text-muted">${proj.title}</p>
        </div>
        </div>`;
    });
    $(".proj-render").html(strHTML);
}

function renderProjModal(projId) {
    const proj = gProjs.find((proj) => proj.id === projId);
    const strHTML = `
    <div class="portfolio-modal modal fade" id="${proj.id}" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="close-modal" data-dismiss="modal">
                    <div class="lr">
                        <div class="rl"></div>
                    </div>
                </div>
                <div class="container">
                    <div class="row">
                        <div class="col-lg-8 mx-auto">
                            <div class="modal-body">
                                <h2>${proj.name}</h2>
                                <p class="item-intro text-muted">${proj.title}.</p>
                                <img class="img-fluid d-block mx-auto" src="${proj.imgUrl}" alt="">
                                <p>${proj.desc}</p>
                                <ul class="list-inline">
                                    <li>Date: ${proj.publishedAt}</li>
                                    <li>Client: Finish</li>
                                    <li>Category: ${proj.labels.join(', ')}</li>
                                    <br>
                                    <a href="${proj.url}" class="btn btn-success">Visit Project ????</a>
                                </ul>
                                <button class="btn btn-danger" data-dismiss="modal" type="button">
                                    <i class="fa fa-times"></i>
                                Close Project</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    $('.modal-container').html(strHTML);
}