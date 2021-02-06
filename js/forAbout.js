let windowWidth;
let cardGrid = document.getElementById("card-grid");
let fundInfo = document.getElementById("fundamental-info");
let specialization = document.getElementById("specialization");
let workExp = document.getElementById("work-experience");
let contact = document.getElementById("contact");
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.getElementById("back-bar").style.display = "none";
} else {
    document.getElementById("back-bar").style.display = "flex";
}

applyRWD();

function applyRWD() {
    windowWidth = window.innerWidth;
    if (420 <= windowWidth) {
        cardGrid.style.width = "50%";
        cardGrid.classList.add("wide");
        cardGrid.classList.remove("narrow");
        fundInfo.classList.add("wide");
        fundInfo.classList.remove("narrow");
        specialization.classList.add("wide");
        specialization.classList.remove("narrow");
        workExp.classList.add("wide");
        workExp.classList.remove("narrow");
        contact.classList.add("wide");
        contact.classList.remove("narrow");
    } else if (windowWidth < 420) {
        cardGrid.style.width = "90%";
        cardGrid.classList.add("narrow");
        cardGrid.classList.remove("wide");
        fundInfo.classList.add("narrow");
        fundInfo.classList.remove("wide");
        specialization.classList.add("narrow");
        specialization.classList.remove("wide");
        workExp.classList.add("narrow");
        workExp.classList.remove("wide");
        contact.classList.add("narrow");
        contact.classList.remove("wide");
    }
}

window.addEventListener("resize", applyRWD);