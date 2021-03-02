let windowWidth;
// let articlePreview = document.getElementsByClassName("preview");
// let classBar = document.getElementById("class-bar");
const headerRightSide = document.getElementById("header-right-side");
const searchBtn = document.getElementById("search-btn");
const searchBar = document.getElementById("search-bar");
const main = document.getElementById("main");
// const articleTitle = document.getElementsByClassName("article-title");
const allPreviews = document.getElementsByClassName("preview");
// let lastScrollTop = 0;

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.getElementById("back-to-home").style.display = "none";
} else {
    document.getElementById("back-to-home").style.display = "flex";
}

// applyRWD();

// function applyRWD() {
//     windowWidth = window.innerWidth;
//     if (1024 <= windowWidth) {} else if (512 <= windowWidth && windowWidth < 1024) {} else if (windowWidth < 512) {}
// }

// window.addEventListener("resize", applyRWD);

// window.addEventListener("scroll", function() {
//     let st = window.pageYOffset || document.documentElement.scrollTop;
//     if (st > lastScrollTop) {
//         console.log("hi");
//     } else {
//         // upscroll code
//     }
//     lastScrollTop = st <= 0 ? 0 : st;
// }, false);

searchBtn.addEventListener("click", controlSearchBar);
searchBar.addEventListener("keyup", search);

function controlSearchBar() {
    if (searchBar.style.width != 0 && searchBar.style.width != "0px") {
        searchBar.style.width = "0px";
        searchBar.style.border = "0px solid transparent";
        searchBar.value = "";
    } else {
        searchBar.style.width = `${main.offsetWidth*0.8}px`;
        searchBar.style.border = "2px solid #888";
    }
}

function search(e) {
    if (e.keyCode === 13) {
        console.log(e.target.value);
        return;
    }
}

for (let each of allPreviews) {
    each.addEventListener("click", goToArticle);
}

function goToArticle(e) {
    // let y = e.target.offsetTop;
    // let x = e.target.offsetLeft;
    // let h = e.target.offsetHeight;
    // let w = e.target.offsetWidth;
    // e.target.style.position = "fixed";
    // e.target.style.top = `${y}px`;
    // e.target.style.left = `${x}px`;
    // e.target.style.height = `${h}px`;
    // e.target.style.width = `${w}px`;
    // window.requestAnimationFrame(_ => {
    //     zoomIn(x, y, h, w, 16, e.target);
    // });
    window.location.assign(e.target.getAttribute('data-url'));
}

// function zoomIn(x, y, h, w, v, e) {
//     let hasChange = false;
//     let t = x / v;
//     if (x > 0) {
//         x -= v;
//         hasChange = true;
//     }
//     let right = window.innerWidth - x - w;
//     if (y > 0) {
//         y -= (y / t);
//         hasChange = true;
//     }
//     let bottom = window.innerHeight - y - h;
//     if (h < window.innerHeight) {
//         h += (bottom / t);
//         hasChange = true;
//     }
//     if (w < innerWidth) {
//         w += (right / t);
//         hasChange = true;
//     }
//     e.style.top = `${y}px`;
//     e.style.left = `${x}px`;
//     e.style.height = `${h}px`;
//     e.style.width = `${w}px`;
//     if (hasChange) {
//         window.requestAnimationFrame(_ => {
//             zoomIn(x, y, h, w, v, e);
//         });
//     } else {
//         window.setTimeout(_ => {
//             window.location.assign(e.getAttribute('data-url'));
//         })
//     }
// }