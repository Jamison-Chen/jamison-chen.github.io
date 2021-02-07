let windowWidth;
let cardGrid = document.getElementById("card-grid");
let allMainCards = document.getElementsByClassName("main-card");
let fundInfo = document.getElementById("fundamental-info");
let specialization = document.getElementById("specialization");
let workExp = document.getElementById("work-experience");
let contact = document.getElementById("contact");
let myImg = document.getElementById("my-img");
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
        }
    } else if (680 <= windowWidth && windowWidth < 950) {
        cardGrid.style.width = "60%";
        cardGrid.classList.add("narrow");
        cardGrid.classList.remove("super-narrow");
        cardGrid.classList.remove("wide");
        for (let i = 0; i < allMainCards.length; i++) {
            allMainCards[i].classList.remove("wide");
        }
    } else if (windowWidth < 680) {
        cardGrid.style.width = "80%";
        cardGrid.classList.add("super-narrow");
        cardGrid.classList.remove("narrow");
        cardGrid.classList.remove("wide");
        for (let i = 0; i < allMainCards.length; i++) {
            allMainCards[i].classList.remove("wide");
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
            // document.querySelector(`#${allMainCards[i].id}>.mask`).style.opacity = "0%";
        } catch (e) {}
    });
    allMainCards[i].addEventListener("mouseleave", e => {
        try {
            document.querySelector(`#${allMainCards[i].id}>.mask`).style.left = "0";
            // document.querySelector(`#${allMainCards[i].id}>.mask`).style.opacity = "80%";
        } catch (e) {}
    });
}