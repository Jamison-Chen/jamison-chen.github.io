"use strict";
const body = document.getElementById("body");
const webPageTitle = document.getElementById("web-page-title");
let pageTop;
let content;
let firstHeading;
let bodyContent;
let contentText;
let sideBarsAndInfoBoxes;
let contentsList;
const wikiUrl = window.location.href.split("/view/?url=")[1];

function main() {
    fetch(`https://wiki-scraper.herokuapp.com/fetchContent?url=${wikiUrl}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            if (body != null) {
                body.innerHTML = myJson["body"];
                changeDOMStructure();
                applyRWD();
                window.addEventListener("resize", applyRWD);
            }
        });
}

function changeDOMStructure() {
    var _a;
    pageTop = document.getElementById("top");
    content = document.getElementById("content");
    firstHeading = document.getElementById("firstHeading");
    bodyContent = document.getElementById("bodyContent");
    contentText = document.getElementById("mw-content-text");
    sideBarsAndInfoBoxes = document.querySelectorAll(".sidebar, .infobox");
    contentsList = document.getElementById("toc");
    // remove all style tag
    let allStyleTags = document.getElementsByTagName("style");
    while (allStyleTags.length != 0) {
        for (let each of allStyleTags) {
            each.outerHTML = "";
        }
    }
    // remove all original inline styling
    let allDOMElements = document.getElementsByTagName("*");
    for (let each of allDOMElements) {
        each.removeAttribute("style");
    }
    // modify all anchors href
    const allAnchors = document.getElementsByTagName("a");
    for (let each of allAnchors) {
        if (each.href.split("?url=")[0] != window.location.href.split("?url=")[0]) {
            if (each.href.indexOf("/wiki/") != -1) {
                each.href = `${window.location.href.split("/wiki/")[0]}/wiki/${each.href.split("/wiki/")[1]}`;
            }
        }
    }
    // change sidebars and infoboxes into info cards
    if (content != null) {
        const infoCardBar = document.createElement("div");
        infoCardBar.id = "info-card-bar";
        content.insertBefore(infoCardBar, content.children[1]);
        for (let each of sideBarsAndInfoBoxes) {
            if (each instanceof HTMLElement) {
                each.style.display = "none";
                const aCard = document.createElement("div");
                aCard.className = "info-card fold";
                const containerShowed = document.createElement("div");
                containerShowed.className = "container-showed fold";
                containerShowed.appendChild(each);
                aCard.innerHTML = "info";
                aCard.appendChild(containerShowed);
                infoCardBar.appendChild(aCard);
                aCard.addEventListener("click", expandInfoCard);
            }
        }
    }
    // change content list into side bar
    if (content != null && contentsList != null && contentsList.parentElement != null) {
        let toggle = document.getElementById("toctogglecheckbox");
        if (toggle != null) {
            contentsList.removeChild(toggle);
        }
        toggle = document.createElement("div");
        toggle.id = "contents-list-toggle";
        toggle.className = "to-expand";
        toggle.addEventListener("click", expandContentsList);
        const outerDiv = document.createElement("div");
        outerDiv.innerHTML = contentsList.innerHTML;
        outerDiv.appendChild(toggle);
        contentsList.innerHTML = "";
        contentsList.appendChild(outerDiv);
        contentsList.classList.add("fold");
        contentsList.parentElement.removeChild(contentsList);
        content.insertBefore(contentsList, content.children[2]);
    }
    // remove all edit section
    let allEditSections = document.getElementsByClassName("mw-editsection");
    while (allEditSections.length != 0) {
        for (let each of allEditSections) {
            (_a = each.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(each);
        }
    }
    // other changes
    if (webPageTitle != null && (firstHeading === null || firstHeading === void 0 ? void 0 : firstHeading.innerText) != null) {
        webPageTitle.innerHTML = firstHeading.innerText;
    }
    if (body != null && content != null) {
        body.innerHTML = "";
        body.appendChild(content);
    }
    if (pageTop != null && firstHeading != null) {
        pageTop.innerHTML = "";
        pageTop.appendChild(firstHeading);
    }
    if (bodyContent != null && contentText != null) {
        bodyContent.innerHTML = "";
        bodyContent.appendChild(contentText);
    }
}

function expandInfoCard(e) {
    if (e.target instanceof HTMLElement) {
        e.target.removeEventListener("click", expandInfoCard);
        e.target.addEventListener("click", foldInfoCard);
        e.target.className = "info-card expand";
        const containerShowed = e.target.querySelector(".container-showed");
        const infoTable = containerShowed === null || containerShowed === void 0 ? void 0 : containerShowed.querySelector(".sidebar, .infobox");
        if (containerShowed != null && infoTable instanceof HTMLElement) {
            containerShowed.className = "container-showed expand";
            infoTable.style.display = "table";
            e.target.innerHTML = "";
            e.target.appendChild(containerShowed);
        }
    }
}

function foldInfoCard(e) {
    if (e.target instanceof HTMLElement && e.target.classList.contains("info-card")) {
        e.target.removeEventListener("click", foldInfoCard);
        e.target.addEventListener("click", expandInfoCard);
        e.target.className = "info-card fold";
        const containerShowed = e.target.querySelector(".container-showed");
        const info = containerShowed === null || containerShowed === void 0 ? void 0 : containerShowed.querySelector(".sidebar, .infobox");
        if (containerShowed != null && info instanceof HTMLElement) {
            containerShowed.className = "container-showed fold";
            info.style.display = "none";
            e.target.innerHTML = "info";
            e.target.appendChild(containerShowed);
        }
    }
}

function expandContentsList(e) {
    if (e.target instanceof HTMLElement && contentsList != null) {
        e.target.className = "to-fold";
        e.target.removeEventListener("click", expandContentsList);
        e.target.addEventListener("click", foldContentsLst);
        // if (contentsList.classList.contains("wide") || contentsList.classList.contains("narrow")) {
        contentsList.classList.remove("fold");
        contentsList.classList.add("expand");
        // }
    }
}

function foldContentsLst(e) {
    if (e.target instanceof HTMLElement && contentsList != null) {
        e.target.className = "to-expand";
        e.target.removeEventListener("click", foldContentsLst);
        e.target.addEventListener("click", expandContentsList);
        // if (contentsList.classList.contains("wide") || contentsList.classList.contains("narrow")) {
        contentsList.classList.remove("expand");
        contentsList.classList.add("fold");
        // }
    }
}

function applyRWD() {
    let windowWidth = window.innerWidth;
    if (body != null) {
        body.style.width = `${window.innerWidth - 20}`;
    }
    if (content != null) {
        if (1024 <= windowWidth) {
            content.className = "wide";
            contentsList === null || contentsList === void 0 ? void 0 : contentsList.classList.remove("narrow");
            contentsList === null || contentsList === void 0 ? void 0 : contentsList.classList.remove("super-narrow");
            contentsList === null || contentsList === void 0 ? void 0 : contentsList.classList.add("wide");
        } else if (512 <= windowWidth && windowWidth < 1024) {
            content.className = "narrow";
            contentsList === null || contentsList === void 0 ? void 0 : contentsList.classList.remove("wide");
            contentsList === null || contentsList === void 0 ? void 0 : contentsList.classList.remove("super-narrow");
            contentsList === null || contentsList === void 0 ? void 0 : contentsList.classList.add("narrow");
        } else if (windowWidth < 512) {
            content.className = "super-narrow";
            contentsList === null || contentsList === void 0 ? void 0 : contentsList.classList.remove("wide");
            contentsList === null || contentsList === void 0 ? void 0 : contentsList.classList.remove("narrow");
            contentsList === null || contentsList === void 0 ? void 0 : contentsList.classList.add("super-narrow");
        }
    }
}
main();