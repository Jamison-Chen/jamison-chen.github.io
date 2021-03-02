let windowWidth;
// let cardGrid = document.getElementById("card-grid");
let allMainCards = document.getElementsByClassName("main-card");
// let allMasks = document.getElementsByClassName("mask");
let fundInfo = document.getElementById("fundamental-info");
// let myImg = document.getElementById("my-img");
// let allCardWords = document.getElementsByClassName("card-word");
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.getElementById("back-bar").style.display = "none";
} else {
    document.getElementById("back-bar").style.display = "flex";
}

// applyRWD();

// function applyRWD() {
//     windowWidth = window.innerWidth;
//     if (950 <= windowWidth) {} else if (680 <= windowWidth && windowWidth < 950) {} else if (windowWidth < 680) {}
// }

// window.addEventListener("resize", applyRWD);


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