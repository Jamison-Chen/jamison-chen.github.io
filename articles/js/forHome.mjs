let windowWidth;
// let articlePreview = document.getElementsByClassName("preview");
let classBar = document.getElementById("class-bar");
let headerRightSide = document.getElementById("header-right-side");
let searchBtn = document.getElementById("search-btn");
let searchBar = document.getElementById("search-bar");
let main = document.getElementById("main");
let articleTitle = document.getElementsByClassName("article-title");
// let lastScrollTop = 0;

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.getElementById("back-to-home").style.display = "none";
} else {
    document.getElementById("back-to-home").style.display = "flex";
}

applyRWD();

function applyRWD() {
    windowWidth = window.innerWidth;
    if (1024 <= windowWidth) {
        main.style.width = "50%";
        classBar.style.width = "50%";
        for (let i = 0; i < articleTitle.length; i++) {
            articleTitle[i].style.fontSize = "2rem";
        }
    } else if (512 <= windowWidth && windowWidth < 1024) {
        main.style.width = "85%";
        classBar.style.width = "85%";
        for (let i = 0; i < articleTitle.length; i++) {
            articleTitle[i].style.fontSize = "2rem";
        }
    } else if (windowWidth < 512) {
        main.style.width = "95%";
        classBar.style.width = "95%";
        for (let i = 0; i < articleTitle.length; i++) {
            articleTitle[i].style.fontSize = "1.6rem";
        }
    }
}

window.addEventListener("resize", applyRWD);

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