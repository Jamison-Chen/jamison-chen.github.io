let windowWidth;
let articlePreview = document.getElementsByClassName("preview");
let classBar = document.getElementById("class-bar");
let headerRightSide = document.getElementById("header-right-side");
let searchBtn = document.getElementById("search-btn");
let searchBar = document.getElementById("search-bar");
let main = document.getElementById("main");
// let lastScrollTop = 0;
rwd();

function rwd() {
    windowWidth = window.innerWidth;
    if (1024 <= windowWidth) {
        main.style.width = "50%";
        classBar.style.width = "50%";
    } else if (512 <= windowWidth && windowWidth < 1024) {
        main.style.width = "85%";
        classBar.style.width = "85%";
    } else if (windowWidth < 512) {
        main.style.width = "95%";
        classBar.style.width = "95%";
    }
}

window.addEventListener("resize", rwd);

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