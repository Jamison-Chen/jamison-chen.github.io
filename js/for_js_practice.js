// document.writeln("Last Modified: " + document.lastModified);
let playing = true;
let rand = 0;
let guess = 0;
let timeSpent = 0;
let totalPlayTime = 0;
let totalGuessTime = 0;
while (playing) {
    totalPlayTime++;
    rand = Math.floor((Math.random() * 10) + 1);
    guess = parseInt(window.prompt("Guess a Number form 1 to 10!"));
    timeSpent = 1;
    while (guess != rand) {
        guess = parseInt(window.prompt("Wrong! Try Again."));
        timeSpent++;
    }
    totalGuessTime += timeSpent;
    playing = window.confirm("You've Spent " + timeSpent + " Times Guessing.\nPlay Again?")
}

function update() {
    document.getElementById("play_time").innerHTML = totalPlayTime;
    document.getElementById("guess_time").innerHTML = totalGuessTime;
}