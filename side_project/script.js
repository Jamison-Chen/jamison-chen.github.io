if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.getElementById("home-footer").style.display = "none";
} else {
    document.getElementById("home-footer").style.display = "flex";
}