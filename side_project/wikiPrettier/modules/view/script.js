"use strict";
const body = document.getElementById("body");
const fetchedContentContainer = document.getElementById("fetched-content-container");
const webPageTitle = document.getElementById("web-page-title");
let pageTop;
let content;
let firstHeading;
let bodyContent;
let contentText;
let sideBarsAndInfoBoxes;
let contentsList;
let contentsListToggle;
let allHeadlines;
let lastCorrenpondingAnchor;
let allComponents;
let allMathExpressionss;
const wikiUrl = window.location.href.split("/view/?url=")[1];
function main() {
    if (body != null) {
        body.className = "waiting";
    }
    fetch(`https://wiki-scraper.herokuapp.com/fetchContent?url=${wikiUrl}`)
        .then(function (response) {
        return response.json();
    })
        .then(function (myJson) {
        if (body != null && fetchedContentContainer != null) {
            body.className = "normal";
            fetchedContentContainer.innerHTML = myJson["body"];
            modifyDOMStructure();
            // placeAllComponents after modifyDOMStructure because modifyDOMStructure do remove all style tag
            // but some components might have their own style setting written in style tag.
            // placeAllComponents();
            // applyRWD();
            // window.addEventListener("resize", applyRWD);
            window.addEventListener("scroll", makeCorrespoingAnchorBold);
            window.addEventListener("click", clickContentsListToggle);
        }
    });
}
function modifyDOMStructure() {
    var _a, _b, _c, _d, _e, _f;
    pageTop = document.getElementById("top");
    content = document.getElementById("content");
    firstHeading = document.getElementById("firstHeading");
    bodyContent = document.getElementById("bodyContent");
    contentText = document.getElementById("mw-content-text");
    sideBarsAndInfoBoxes = document.querySelectorAll(".navbox, .sidebar, .infobox, .box-More_footnotes, .box-Multiple_issues");
    contentsList = document.getElementById("toc");
    allHeadlines = document.getElementsByClassName("mw-headline");
    // remove all unnecessary parts
    const allWeiredNavbars = document.getElementsByClassName("navbar");
    while (allWeiredNavbars.length != 0) {
        for (let each of allWeiredNavbars) {
            (_a = each.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(each);
        }
    }
    const printfooter = document.getElementsByClassName("printfooter");
    while (printfooter.length != 0) {
        for (let each of printfooter) {
            (_b = each.parentElement) === null || _b === void 0 ? void 0 : _b.removeChild(each);
        }
    }
    let catlinks = document.getElementById("catlinks");
    (_c = catlinks === null || catlinks === void 0 ? void 0 : catlinks.parentElement) === null || _c === void 0 ? void 0 : _c.removeChild(catlinks);
    // remove all parts after external link
    let externalLink = document.querySelector("#External_links, #外部連結");
    let externalLinkID = externalLink === null || externalLink === void 0 ? void 0 : externalLink.id;
    if (externalLink instanceof HTMLElement && externalLink.parentElement != null) {
        while (externalLink != null && externalLink.tagName != "H2") {
            externalLink = externalLink.parentElement;
        }
    }
    while (externalLink != null) {
        let next = externalLink.nextElementSibling;
        (_d = externalLink.parentElement) === null || _d === void 0 ? void 0 : _d.removeChild(externalLink);
        externalLink = next;
    }
    let externalLinkAnchor = document.querySelector(`#toc a[href='#${externalLinkID}']`);
    if (externalLinkAnchor instanceof HTMLElement && externalLinkAnchor.parentElement != null) {
        while (externalLinkAnchor != null && externalLinkAnchor.tagName != "LI") {
            externalLinkAnchor = externalLinkAnchor.parentElement;
        }
    }
    while (externalLinkAnchor != null) {
        let next = externalLinkAnchor.nextElementSibling;
        (_e = externalLinkAnchor.parentElement) === null || _e === void 0 ? void 0 : _e.removeChild(externalLinkAnchor);
        externalLinkAnchor = next;
    }
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
        let oldToggle = document.getElementById("toctogglecheckbox");
        if (oldToggle != null) {
            contentsList.removeChild(oldToggle);
        }
        contentsListToggle = document.createElement("div");
        contentsListToggle.id = "contents-list-toggle";
        contentsListToggle.className = "to-expand";
        contentsListToggle.addEventListener("click", expandContentsList);
        const outerDiv = document.createElement("div");
        outerDiv.innerHTML = contentsList.innerHTML;
        outerDiv.appendChild(contentsListToggle);
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
            (_f = each.parentElement) === null || _f === void 0 ? void 0 : _f.removeChild(each);
        }
    }
    // make all math expression clean
    allMathExpressionss = document.querySelectorAll(".mwe-math-element>img");
    for (let each of allMathExpressionss) {
        if (each.parentElement != null) {
            const tempParent = each.parentElement;
            tempParent.innerHTML = "";
            tempParent.appendChild(each);
        }
    }
    // remove data after content
    // const dataAfterContent = document.getElementById("mw-data-after-content");
    // dataAfterContent?.parentElement?.removeChild(dataAfterContent);
    // other changes
    if (webPageTitle != null && (firstHeading === null || firstHeading === void 0 ? void 0 : firstHeading.innerText) != null) {
        webPageTitle.innerHTML = firstHeading.innerText;
    }
    if (fetchedContentContainer != null && content != null) {
        fetchedContentContainer.innerHTML = "";
        fetchedContentContainer.appendChild(content);
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
        const infoTable = e.target.querySelector(".navbox, .sidebar, .infobox, .box-More_footnotes, .box-Multiple_issues");
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
        const info = e.target.querySelector(".navbox, .sidebar, .infobox, .box-More_footnotes, .box-Multiple_issues");
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
        // }
    }
}
// function placeAllComponents(): void {
//     allComponents = document.getElementsByClassName("component");
//     for (let each of allComponents) {
//         if (each instanceof HTMLElement) {
//             include(each);
//         }
//     }
// }
// function include(el: HTMLElement) {
//     let url = el.getAttribute("data-include");
//     let localTest = /^(?:file):/;
//     let XMLHttp = new XMLHttpRequest();
//     let status = 0;
//     XMLHttp.onreadystatechange = function () {
//         if (XMLHttp.readyState == 4) {
//             status = XMLHttp.status;
//         }
//         if (localTest.test(location.href) && XMLHttp.responseText) {
//             status = 200;
//         }
//         if (XMLHttp.readyState == 4 && status == 200) {
//             el.outerHTML = XMLHttp.responseText;
//         }
//     }
//     try {
//         if (url != null) {
//             XMLHttp.open("GET", url, true);
//         }
//         XMLHttp.send();
//     } catch (err) {
//         console.log("Failed to load components.");
//     }
// }
function makeCorrespoingAnchorBold(e) {
    if (allHeadlines != null) {
        let minDistanceToPageTop = Infinity;
        let closestHeadline = null;
        for (let each of allHeadlines) {
            let distanceToPageTop = Math.abs(each.getBoundingClientRect().top);
            if (distanceToPageTop < minDistanceToPageTop) {
                minDistanceToPageTop = distanceToPageTop;
                closestHeadline = each;
            }
        }
        let correnpondingAnchor = document.querySelector(`#toc a[href='#${closestHeadline === null || closestHeadline === void 0 ? void 0 : closestHeadline.id}']`);
        if (lastCorrenpondingAnchor != null) {
            lastCorrenpondingAnchor.classList.remove("on");
        }
        if (correnpondingAnchor instanceof HTMLElement) {
            correnpondingAnchor.classList.add("on");
            lastCorrenpondingAnchor = correnpondingAnchor;
        }
    }
}
function clickContentsListToggle(e) {
    if (e.target instanceof HTMLElement) {
        if (e.target.className == "toctext" && contentsListToggle != null) {
            contentsListToggle.click();
        }
    }
}
// function applyRWD(): void {
// let windowWidth = window.innerWidth;
// if (content != null) {
//     if (1024 <= windowWidth) {
//     } else if (512 <= windowWidth && windowWidth < 1024) {
//     } else if (windowWidth < 512) {
//     }
// }
// }
// function changeFontSize() {
// }
main();
