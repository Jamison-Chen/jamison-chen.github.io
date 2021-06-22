const backToHome = document.getElementById("back-to-home");
const allCategoryTags = document.getElementsByClassName("category-tag");
const searchBtn = document.getElementById("search-btn");
const searchBar = document.getElementById("search-bar");
const main = document.getElementById("main");
const endPoint = "https://article-backend.herokuapp.com/";
// const endPoint = "http://127.0.0.1:5000/";

function categoryFilter(e) {
    let category = e.currentTarget;
    return fetch(`${endPoint}getArticleList?category=${category.innerHTML.toLowerCase()}`, {
            method: 'get'
        })
        .then(function (response) {
            return response.json();
        });
}

function renderArticleBlock(articleList) {
    main.innerHTML = "";
    for (let each of articleList) {
        let block = document.createElement("div");
        block.classList.add("preview");
        block.classList.add(each.category);
        block.setAttribute("data-url", `./articles/${each.title}.html`);

        let imageContainer = document.createElement("div");
        imageContainer.classList.add("img-container");
        let img = document.createElement("img");
        img.src = `./images/${each.title}.jpg`;
        img.alt = "";
        img.srcset = "";
        imageContainer.appendChild(img);

        let articleTitle = document.createElement("h1");
        articleTitle.classList.add("article-title");
        articleTitle.innerHTML = each.title;

        let articleInfo = document.createElement("div");
        articleInfo.classList.add("article-info");
        let author = document.createElement("div");
        author.classList.add("article-info-label");
        author.innerHTML = each.author;
        articleInfo.appendChild(author);
        let date = document.createElement("div");
        date.classList.add("article-info-label");
        date.innerHTML = each.createDate;
        articleInfo.appendChild(date);
        let category = document.createElement("div");
        category.classList.add("article-info-label");
        category.innerHTML = each.category.toUpperCase();
        articleInfo.appendChild(category);

        let preview = document.createElement("div");
        preview.classList.add("article-content-preview");
        preview.textContent = each.preview;

        block.appendChild(imageContainer);
        block.appendChild(articleTitle);
        block.appendChild(articleInfo);
        block.appendChild(preview);

        main.appendChild(block);
    }
    setArticleLink();
}

async function showArticle(e) {
    for (let each of allCategoryTags) {
        each.classList.remove("active");
    }
    e.currentTarget.classList.add("active");
    let dataIn = await categoryFilter(e);
    const articleList = dataIn["data"];
    renderArticleBlock(articleList);
}

function controlSearchBar() {
    if (searchBar.classList.contains("expanded")) {
        searchBar.classList.replace("expanded", "folded");
        searchBar.value = "";
    } else searchBar.classList.replace("folded", "expanded");
}

function search(e) {
    if (e.keyCode === 13) {
        console.log(e.target.value);
        return;
    }
}

function setArticleLink() {
    let allPreviews = document.getElementsByClassName("preview");
    for (let each of allPreviews) {
        each.addEventListener("click", goToArticle);
    }
}

function goToArticle(e) {
    window.location.assign(e.target.getAttribute('data-url'));
}

function run() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        backToHome.style.display = "none";
    } else backToHome.style.display = "flex";

    searchBtn.addEventListener("click", controlSearchBar);
    searchBar.addEventListener("keyup", search);
    for (let each of allCategoryTags) {
        each.addEventListener("click", showArticle)
    }
    allCategoryTags[0].click();
}

run();