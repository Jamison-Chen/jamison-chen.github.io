let windowWidth;
let cardGrid = document.getElementById("card-grid");
let allMainCards = document.getElementsByClassName("main-card");
let fundInfo = document.getElementById("fundamental-info");
// let specialization = document.getElementById("specialization");
// let workExp = document.getElementById("work-experience");
// let contact = document.getElementById("contact");
let myImg = document.getElementById("my-img");
let allCardWords = document.getElementsByClassName("card-word");
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.getElementById("back-bar").style.display = "none";
} else {
    document.getElementById("back-bar").style.display = "flex";
}

applyRWD();

function applyRWD() {
    windowWidth = window.innerWidth;
    if (950 <= windowWidth) {
        cardGrid.style.width = "50%";
        cardGrid.classList.add("wide");
        cardGrid.classList.remove("narrow");
        cardGrid.classList.remove("super-narrow");
        for (let i = 0; i < allMainCards.length; i++) {
            allMainCards[i].classList.add("wide");
            allMainCards[i].classList.remove("narrow");
            allMainCards[i].classList.remove("super-narrow");
        }
        for (let i = 0; i < allCardWords.length; i++) {
            allCardWords[i].classList.add("wide");
            allCardWords[i].classList.remove("narrow");
            allCardWords[i].classList.remove("super-narrow");
        }
    } else if (680 <= windowWidth && windowWidth < 950) {
        cardGrid.style.width = "60%";
        cardGrid.classList.add("narrow");
        cardGrid.classList.remove("super-narrow");
        cardGrid.classList.remove("wide");
        for (let i = 0; i < allMainCards.length; i++) {
            allMainCards[i].classList.add("narrow");
            allMainCards[i].classList.remove("wide");
            allMainCards[i].classList.remove("super-narrow");
        }
        for (let i = 0; i < allCardWords.length; i++) {
            allCardWords[i].classList.add("narrow");
            allCardWords[i].classList.remove("wide");
            allCardWords[i].classList.remove("super-narrow");
        }
    } else if (windowWidth < 680) {
        cardGrid.style.width = "80%";
        cardGrid.classList.add("super-narrow");
        cardGrid.classList.remove("narrow");
        cardGrid.classList.remove("wide");
        for (let i = 0; i < allMainCards.length; i++) {
            allMainCards[i].classList.add("super-narrow");
            allMainCards[i].classList.remove("wide");
            allMainCards[i].classList.remove("narrow");
        }
        for (let i = 0; i < allCardWords.length; i++) {
            allCardWords[i].classList.add("super-narrow");
            allCardWords[i].classList.remove("wide");
            allCardWords[i].classList.remove("narrow");
        }
    }
}

window.addEventListener("resize", applyRWD);

fundInfo.addEventListener("mouseenter", e => {
    myImg.style.left = "-100%";
    myImg.style.opacity = "0%";
});
fundInfo.addEventListener("mouseleave", e => {
    myImg.style.left = "0";
    myImg.style.opacity = "100%";
});

for (let i = 0; i < allMainCards.length; i++) {
    allMainCards[i].addEventListener("mouseenter", e => {
        try {
            document.querySelector(`#${allMainCards[i].id}>.mask`).style.left = "100%";
        } catch (e) {}
    });
    allMainCards[i].addEventListener("mouseleave", e => {
        try {
            document.querySelector(`#${allMainCards[i].id}>.mask`).style.left = "0";
        } catch (e) {}
    });
}