let windowWidth;
let articleTitle = document.getElementById("article-title");
let articleInfo = document.getElementById("article-info");
let articleContent = document.getElementById("article-content");
rwd();

function rwd() {
    windowWidth = window.innerWidth;
    if (1024 <= windowWidth) {
        articleTitle.style.fontSize = "3rem";
        articleTitle.style.padding = "0 20vw"
        articleInfo.style.width = "60%";
        articleContent.style.width = "60%";
    } else if (512 <= windowWidth && windowWidth < 1024) {
        articleTitle.style.fontSize = "2.4rem";
        articleTitle.style.padding = "0 10vw"
        articleInfo.style.width = "80%";
        articleContent.style.width = "80%";
    } else if (windowWidth < 512) {
        articleTitle.style.fontSize = "2rem";
        articleTitle.style.padding = "0 5vw"
        articleInfo.style.width = "90%";
        articleContent.style.width = "80%";
    }
}

window.addEventListener("resize", rwd);