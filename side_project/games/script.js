// let windowWidth;
// let btnGrid = document.getElementById("btn-grid");

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.getElementById("home-footer").style.display = "none";
} else {
    document.getElementById("home-footer").style.display = "flex";
}

// applyRWD();

// function applyRWD() {
//     windowWidth = window.innerWidth;
//     if (1024 <= windowWidth) {
//     } else if (512 <= windowWidth && windowWidth < 1024) {
//     } else if (windowWidth < 512) {
//     }
// }

// window.addEventListener("resize", applyRWD);