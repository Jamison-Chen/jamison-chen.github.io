import { Dot } from './modules/dot.mjs';
// let mouseIsDown;
let allDotObjs;
let peopleSize;
let stopSimulation;
let day;
let newRecord;
let ctx;
let chart;


let population = 400;
let energy = 50;
let vpMultiplier = 2;
let recoverMultiplier = 3;
let initInfectedNum = 2;
let waitTime = 100;
let infectedPossibility = 80;
controlPanelSetUp();


let virusPower;
let socialDistance;
let recoverDay;
let infectedNum;
let hasGotInfected;

function setSlider(elementId, minVal, maxVal, targetVar) {
    document.getElementById(elementId).min = minVal;
    document.getElementById(elementId).max = maxVal;
    document.getElementById(elementId).value = eval(targetVar);
    document.getElementById(elementId).previousElementSibling.children.item(1).value = eval(targetVar);
    document.getElementById(elementId).addEventListener("input", function() {
        eval(targetVar + "=" + document.getElementById(elementId).value);
        document.getElementById(elementId).previousElementSibling.children.item(1).value =
            document.getElementById(elementId).value;
    });
}

function controlPanelSetUp() {
    setSlider("population-scrl-bar", 1, 800, "population");
    document.getElementById("population-scrl-bar").addEventListener("input", function() {
        document.getElementById("initial-infected-num-scrl-bar").max = population;
    });

    setSlider("energy-scrl-bar", 0, 500, "energy");

    setSlider("virus-power-scrl-bar", 1, 5, "vpMultiplier");

    setSlider("infected-possibility-scrl-bar", 0, 100, "infectedPossibility");

    setSlider("recover-day-scrl-bar", 1, 10, "recoverMultiplier");

    setSlider("initial-infected-num-scrl-bar", 0, population, "initInfectedNum");

    setSlider("wait-time-scrl-bar", 50, 1000, "waitTime");

    document.getElementById("simulate-btn").addEventListener("click", toSetUp);
}



function toSetUp() {
    let myNode = document.getElementById("main");
    while (myNode.lastElementChild) {
        myNode.removeChild(myNode.lastElementChild);
    }
    for (let i = 0; i < document.getElementsByClassName("scrl-bar").length; i++) {
        document.getElementsByClassName("scrl-bar")[i].disabled = true;
    }
    initVarValue()
    main(population);
}

function initVarValue() {
    // non-derived variables
    allDotObjs = [];
    peopleSize = 10;
    stopSimulation = false;
    day = 0;
    ctx = document.getElementById('myChart').getContext('2d');
    Chart.defaults.global.defaultFontColor = '#fff';
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                    label: 'New Record',
                    // backgroundColor: 'rgba(255, 99, 132, 1)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    data: []
                },
                {
                    label: 'Current Infection',
                    // backgroundColor: 'rgba(99, 255, 132, 1)',
                    borderColor: 'rgba(99, 255, 132, 1)',
                    data: []
                },
                {
                    label: 'Infection History',
                    // backgroundColor: 'rgba(99, 132, 255, 1)',
                    borderColor: 'rgba(99, 132, 255, 1)',
                    data: []
                }
            ]
        },
        options: {
            events: ['click'],
            legend: {
                labels: {
                    fontSize: 10,
                    boxWidth: 10,
                }
            },
        }
    });
    // mouseIsDown = false;

    // derived variables
    virusPower = peopleSize * vpMultiplier;
    socialDistance = virusPower * 2;
    recoverDay = recoverMultiplier * (waitTime / 10);
    newRecord = initInfectedNum;
    infectedNum = initInfectedNum;
    hasGotInfected = initInfectedNum;
}

function main(num) {
    initDotObj(num);
    updateChart(parseInt(day), newRecord, infectedNum, hasGotInfected);
    for (let i = 0; i < document.getElementsByClassName("dot").length; i++) {
        addEachEL(document.getElementsByClassName("dot")[i]);
    }
    elAddOnce();
    moveAllDots();
}

function initDotObj(num) {
    for (let i = 0; i < num; i++) {
        let dotObj = new Dot({
            socialDistance: socialDistance,
            energy: energy,
            infected: false,
            recoverDay: recoverDay
        });
        allDotObjs.push(dotObj);
        initDotDOM(dotObj, i);
        if (i < initInfectedNum) {
            getInfected(dotObj, i);
            dotObj.isRecorded = true;
        }
    }
}

function initDotDOM(aDotObj, i) {
    let dotDiv = document.createElement("div");
    dotDiv.className = "dot";
    dotDiv.id = `Dot${i}`;
    dotDiv.draggable = true;
    dotDiv.style.width = `${aDotObj.width}px`;
    dotDiv.style.height = `${aDotObj.height}px`;
    dotDiv.style.left = `${aDotObj.pos[0]}px`
    dotDiv.style.top = `${aDotObj.pos[1]}px`
    dotDiv.style.transitionDuration = `${waitTime}ms`;
    let inside = document.createElement("div");
    inside.className = "item";
    inside.id = `Item${i}`;
    inside.style.width = `${peopleSize}px`;
    inside.style.height = `${peopleSize}px`;
    inside.style.left = `${(socialDistance-peopleSize)/2}px`;
    inside.style.top = `${(socialDistance-peopleSize)/2}px`;
    dotDiv.appendChild(inside);
    document.getElementById("main").appendChild(dotDiv);
}

function getInfected(aDotObj, i) {
    aDotObj.getInfected();
    document.getElementById(`Item${i}`).style.backgroundColor = "#F00";
    document.getElementById(`Dot${i}`).style.backgroundColor = "rgba(255, 0, 0, 0.1)";
}

function updateChart(day, newRecord, infectedNum, hasGotInfected) {
    chart.data.labels.push(day);
    chart.data.datasets[0].data.push(newRecord / population);
    chart.data.datasets[1].data.push(infectedNum / population);
    chart.data.datasets[2].data.push(hasGotInfected / population);
    chart.update();
}

function addEachEL(aDotDiv) {
    aDotDiv.addEventListener("mouseenter", chaseAway);
    // aDotDiv.addEventListener("dragstart", function(anEvent) {
    //     mouseIsDown = true;
    //     let draggedDiv = anEvent.target;
    //     let draggedPos = [anEvent.offsetX, anEvent.offsetY];
    //     draggedDiv.addEventListener("dragend", function(anotherEvent) {
    //         mouseIsDown = false;
    //         allDotObjs[parseInt(draggedDiv.id.split("Dot")[1], 10)].pos = [
    //             anotherEvent.clientX - draggedPos[0],
    //             anotherEvent.clientY - draggedPos[1]
    //         ];
    //     });
    // });
}

function elAddOnce() {
    document.getElementById("simulate-btn").removeEventListener("click", toSetUp);
    document.getElementById("simulate-btn").className = "pause-simulate-btn";
    document.getElementById("simulate-btn").addEventListener("click", toPause);
    document.getElementById("stop-btn").addEventListener("click", function() {
        location.reload();
    });
    // document.addEventListener("dragover", function(anEvent) {
    //     anEvent.preventDefault();
    // });
    // document.addEventListener("mousedown", function() {
    //     mouseIsDown = true;
    // });
    // document.addEventListener("mouseup", function() {
    //     mouseIsDown = false;
    // });
}

function toPause() {
    stopSimulation = !stopSimulation;
    if (!stopSimulation) {
        document.getElementById("simulate-btn").className = "pause-simulate-btn";
        moveAllDots();
    } else {
        document.getElementById("simulate-btn").className = "start-simulate-btn";
    }
}

function moveAllDots() {
    infectionRecord();
    for (let i = 0; i < allDotObjs.length; i++) {
        moveDot(i);
        if (allDotObjs[i].immune && !allDotObjs[i].hasImmuneColor) {
            document.getElementById(`Item${i}`).style.backgroundColor = "#444";
            document.getElementById(`Dot${i}`).style.backgroundColor = "rgba(100, 100, 100, 0.1)";
            allDotObjs[i].hasImmuneColor = true;
        }
    }
    if (!stopSimulation) {
        setTimeout(moveAllDots, waitTime);
    }
}

function moveDot(i) {
    allDotObjs[i].move();
    document.getElementById(`Dot${i}`).style.left = `${allDotObjs[i].pos[0]}px`;
    document.getElementById(`Dot${i}`).style.top = `${allDotObjs[i].pos[1]}px`;
    let selfCenterPos = [
        allDotObjs[i].pos[0] + (allDotObjs[i].width / 2),
        allDotObjs[i].pos[1] + (allDotObjs[i].height / 2)
    ];

    // check if it is infected or not
    for (let j = 0; j < allDotObjs.length; j++) {
        let otherCenterPos = [
            allDotObjs[j].pos[0] + (allDotObjs[j].width / 2),
            allDotObjs[j].pos[1] + (allDotObjs[j].height / 2)
        ];
        if (j != i && allDotObjs[j].infected && !allDotObjs[i].immune) {
            let vector = [
                selfCenterPos[0] - otherCenterPos[0],
                selfCenterPos[1] - otherCenterPos[1]
            ];
            let dist = Math.sqrt(Math.pow(vector[0], 2) + Math.pow(vector[1], 2));
            // infection rate: (virusPower / Math.pow(dist, 2))
            // if (Math.random() <= (virusPower / Math.pow(dist, 2))) {
            //     allDotObjs[i].getInfected();
            // }
            if (dist <= virusPower) {
                if ((Math.random() * 100) <= infectedPossibility) {
                    getInfected(allDotObjs[i], i);
                }
            }
            // else if (dist <= (socialDistance * 2)) {
            //     // allDotObjs[i].energy = energy / 2;
            //     allDotObjs[i].move(Math.atan(vector[1] / vector[0]));
            // }
        }
    }
}

function infectionRecord() {
    if (parseInt(day + 0.1) > parseInt(day)) {
        let currentInfectedNum = 0;
        newRecord = 0;
        for (let i = 0; i < allDotObjs.length; i++) {
            if (allDotObjs[i].infected) {
                currentInfectedNum++;
                if (!allDotObjs[i].isRecorded) {
                    newRecord++;
                    allDotObjs[i].isRecorded = true;
                }
            }
        }
        // console.log(typeof(hasGotInfected));
        // console.log(typeof(newRecord));
        hasGotInfected += newRecord;
        infectedNum = currentInfectedNum;
        // console.log(typeof(hasGotInfected));
        updateChart(parseInt(day + 0.1), newRecord, infectedNum, hasGotInfected);
    }
    if (infectedNum == 0) prepareToRestart();
    day += 0.1;
}

function prepareToRestart() {
    stopSimulation = true;
    for (let i = 0; i < document.getElementsByClassName("scrl-bar").length; i++) {
        document.getElementsByClassName("scrl-bar")[i].disabled = false;
    }
    document.getElementById("simulate-btn").className = "start-simulate-btn";
    document.getElementById("simulate-btn").addEventListener("click", toSetUp);
}

function chaseAway(anEvent) {
    // if (mouseIsDown) {
    let pos = [
        parseFloat(anEvent.target.style.left.split("px")[0], 10) + (parseFloat(anEvent.target.style.width.split("px")[0], 10) / 2),
        parseFloat(anEvent.target.style.top.split("px")[0], 10) + (parseFloat(anEvent.target.style.height.split("px")[0], 10) / 2)
    ];
    let delta = [(pos[0] - anEvent.clientX) * 3, (pos[1] - anEvent.clientY) * 3];
    allDotObjs[parseInt(anEvent.target.id.split("Dot")[1], 10)].pos = [
        parseFloat(anEvent.target.style.left.split("px")[0], 10) + delta[0],
        parseFloat(anEvent.target.style.top.split("px")[0], 10) + delta[1]
    ];
    // }
}