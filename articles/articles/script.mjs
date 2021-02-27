let windowWidth;
let articleTitle = document.getElementById("article-title");
let articleInfo = document.getElementById("article-info");
let articleContent = document.getElementById("article-content");
let recommendedArticle = document.getElementById("recommended-article");

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.getElementById("back-bar").style.display = "none";
} else {
    document.getElementById("back-bar").style.display = "flex";
}

applyRWD();

function applyRWD() {
    windowWidth = window.innerWidth;
    if (1024 <= windowWidth) {
        articleTitle.className = "article-title wide";
        articleInfo.style.width = "60%";
        articleContent.className = "article-content wide";
        recommendedArticle.style.width = "60%";
    } else if (512 <= windowWidth && windowWidth < 1024) {
        articleTitle.className = "article-title narrow";
        articleInfo.style.width = "80%";
        articleContent.className = "article-content narrow";
        recommendedArticle.style.width = "80%";
    } else if (windowWidth < 512) {
        articleTitle.className = "article-title super-narrow";
        articleInfo.style.width = "90%";
        articleContent.className = "article-content super-narrow";
        recommendedArticle.style.width = "80%";
    }
}

window.addEventListener("resize", applyRWD);