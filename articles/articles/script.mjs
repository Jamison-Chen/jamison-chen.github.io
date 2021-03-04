// let windowWidth;
// let articleTitle = document.getElementById("article-title");
const backBar = document.getElementById("back-bar");
// const mainImgContainer = document.getElementById("main-img-container");
// const articleInfo = document.getElementById("article-info");
// const articleContent = document.getElementById("article-content");
// const recommendedArticle = document.getElementById("recommended-article");

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    backBar.style.display = "none";
} else {
    backBar.style.display = "flex";
}

// function applyRWD() {
//     windowWidth = window.innerWidth;
//     if (1024 <= windowWidth) {} else if (512 <= windowWidth && windowWidth < 1024) {} else if (windowWidth < 512) {}
// }

// applyRWD();
// window.addEventListener("resize", applyRWD);