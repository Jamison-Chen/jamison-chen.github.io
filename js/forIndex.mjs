let windowWidth;
let btnGrid = document.getElementById("btn-grid");

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.getElementById("profile-tab").style.right = "110%";
}

applyRWD();

function applyRWD() {
    windowWidth = window.innerWidth;
    if (1024 <= windowWidth) {
        btnGrid.style.width = "50%";
    } else if (512 <= windowWidth && windowWidth < 1024) {
        btnGrid.style.width = "50%";
    } else if (windowWidth < 512) {
        btnGrid.style.width = "90%";
    }
}

window.addEventListener("resize", applyRWD);