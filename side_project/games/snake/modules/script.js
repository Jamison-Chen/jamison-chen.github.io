import {
    Cell
} from './cell.js';
import {
    Graph
} from './graph.js';
const dijkstraBtn = document.getElementById("dijkstra-btn");
const playBtn = document.getElementById("play-btn");
const main = document.getElementById("main");
const currentLength = document.getElementById("current-length");
const size = 20;
const bodyColor = "#000";

let grid;
let allNodes;
let allEdgesAndCosts;
let map;
let headPos;
let body;
let storedTail;
let foodPos;
let stillAlive;
let directions;
let inertia;
let deepPath;

// function test() {
//     let a = [1]
//     console.log(a[a.length - 1]);
// }

// test();

setup();

function dijkstra() {
    let currentDistance = {};
    let currentPath = {};
    currentPath[String(headPos)] = [headPos];
    currentDistance[String(headPos)] = 0;
    let unsolved = JSON.parse(JSON.stringify(allNodes));
    unsolved = unsolved.filter(item => item[0] != headPos[0] || item[1] != headPos[1]);
    unsolved.forEach(
        function(each) {
            currentDistance[String(each)] = map.getCosts(each, headPos);
            if (map.getCosts(each, headPos) != Infinity) {
                currentPath[String(each)] = [headPos, each];
            }
        }
    );
    while (unsolved.length != 0) {
        let minD = Infinity;
        let w = null;
        unsolved.forEach(function(each) {
            if (currentDistance[String(each)] < minD) {
                w = each;
                minD = currentDistance[String(w)];
            }
        });
        if (w != null) {
            unsolved = unsolved.filter(item => item[0] != w[0] || item[1] != w[1]);
        } else {
            break;
        }
        for (let v in map.graph[String(w)]) {
            let intV0 = parseInt(v.split(",")[0]);
            let intV1 = parseInt(v.split(",")[1]);
            if (map.graph[String(w)][v] != 0 && unsolved.some(x => x[0] == intV0 && x[1] == intV1)) {
                let prev = currentDistance[v];
                currentDistance[v] = Math.min(prev, minD + map.getCosts(w, [intV0, intV1]));
                if (currentDistance[v] != prev) {
                    let newPath = JSON.parse(JSON.stringify(currentPath[String(w)]));
                    newPath.push([intV0, intV1]);
                    currentPath[v] = newPath;
                }
            }
        }
    }
    return {
        shortestD: currentDistance,
        shortestPath: currentPath
    };
}

function arrary2graphInfo(aGrid) {
    let n = [];
    let e = [];
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (!aGrid[i][j].isBody) {
                n.push([i, j]);
                if (j + 1 < size && !aGrid[i][j + 1].isBody) {
                    e.push({
                        n1: [i, j],
                        n2: [i, j + 1],
                        costs: 1
                    });
                }
                if (i + 1 < size && !aGrid[i + 1][j].isBody) {
                    e.push({
                        n1: [i, j],
                        n2: [i + 1, j],
                        costs: 1
                    });
                }
            }
        }
    }
    return {
        nodes: n,
        edgesAndCosts: e
    };
}

function setup() {
    initVarVal();
    initGridDOM();
    clearBoard();
    correctBodyStyle();
    addAllEventListener();
}

function initGridDOM() {
    // let divSideLen = 100 / size;
    for (let i = 0; i < size; i++) {
        let rowDiv = document.createElement("div");
        rowDiv.setAttribute("class", "each-row");
        for (let j = 0; j < size; j++) {
            let cellDiv = document.createElement("div");
            cellDiv.setAttribute("id", `${i},${j}`);
            cellDiv.setAttribute("class", "cell");
            // cellDiv.style.width = `${divSideLen}%`;
            // cellDiv.style.paddingTop = `${divSideLen}%`;
            rowDiv.appendChild(cellDiv);
        }
        main.appendChild(rowDiv);
    }
}

function initVarVal() {
    headPos = [9, 4];
    body = [
        [9, 2],
        [9, 3]
    ];
    storedTail = [];
    foodPos = [9, 15];
    stillAlive = true;
    deepPath = [];
    directions = [
        [0, 1]
    ];
    inertia = [];
    currentLength.innerHTML = body.length + 1;
}

function clearBoard() {
    grid = new Array(size)
    for (let i = 0; i < size; i++) {
        grid[i] = new Array(size);
        for (let j = 0; j < size; j++) {
            grid[i][j] = new Cell(document.getElementById(`${i},${j}`));
        }
    }
    initSnakeAndFood();
}

function addAllEventListener() {
    playBtn.onclick = humanPlaying;
    playBtn.disabled = false;
    dijkstraBtn.onclick = dijkstraPlaying;
    dijkstraBtn.disabled = false;
}

function humanPlaying() {
    removeAllEventListener("human");
    document.addEventListener("keydown", turnAroundSnake);
    initVarVal();
    clearBoard();
    correctBodyStyle();
    humanLoop();
}

function turnAroundSnake(e) {
    if (e.keyCode == '38') { //up
        if (directions.length == 0) {
            if (inertia[0] != 1) {
                directions.push([-1, 0]);
            }
        } else if (directions[directions.length - 1][0] != 1) {
            directions.push([-1, 0]);
        }
    } else if (e.keyCode == '40') { //down
        if (directions.length == 0) {
            if (inertia[0] != -1) {
                directions.push([1, 0]);
            }
        } else if (directions[directions.length - 1][0] != -1) {
            directions.push([1, 0]);
        }
    } else if (e.keyCode == '37') { //left
        if (directions.length == 0) {
            if (inertia[1] != 1) {
                directions.push([0, -1]);
            }
        } else if (directions[directions.length - 1][1] != 1) {
            directions.push([0, -1]);
        }
    } else if (e.keyCode == '39') { //right
        if (directions.length == 0) {
            if (inertia[1] != -1) {
                directions.push([0, 1]);
            }
        } else if (directions[directions.length - 1][1] != -1) {
            directions.push([0, 1]);
        }
    }
}

function humanLoop() {
    if (stillAlive) {
        let nextHeadPos;
        if (directions.length != 0) {
            nextHeadPos = [headPos[0] + directions[0][0], headPos[1] + directions[0][1]];
            inertia = [directions[0][0], directions[0][1]];
            directions.shift();
        } else {
            nextHeadPos = [headPos[0] + inertia[0], headPos[1] + inertia[1]];
        }
        if (Math.abs(foodPos[0] - nextHeadPos[0]) == 1 && Math.abs(foodPos[1] - nextHeadPos[1]) == 1) {
            storedTail = [body[0][0], body[0][1]];
        }
        moveForward(nextHeadPos, "human");
        setTimeout(humanLoop, 100);
    } else {
        stopPlaying();
    }
}

function dijkstraPlaying() {
    removeAllEventListener("computer");
    initVarVal();
    clearBoard();
    dijkstraLoop();
}

function createGraphStructure(aGrid) {
    let graphInfo = arrary2graphInfo(aGrid);
    allNodes = graphInfo.nodes;
    allEdgesAndCosts = graphInfo.edgesAndCosts;
    map = new Graph(allNodes, allEdgesAndCosts);
}

function dijkstraLoop() {
    if (stillAlive) {
        createGraphStructure(grid);
        let dijResult = dijkstra(); //Iterative Approach
        let shortestPath = dijResult.shortestPath[String(foodPos)];
        if (shortestPath != undefined) {
            deepPath = [];
            if (shortestPath.length > 1) {
                if (shortestPath.length == 2) {
                    storedTail = [body[0][0], body[0][1]];
                }
                moveForward(dijResult.shortestPath[String(foodPos)], "computer");
            } else if (shortestPath.length == 1) {
                growthUp();
                placeNewFood();
            }
        } else {
            // Go-Deep Strategy
            if (deepPath.length == 0) {
                let shortestD = dijResult.shortestD;
                let maxD = 0;
                let maxTarget = null;
                for (let each in shortestD) {
                    if (shortestD[each] >= maxD && shortestD[each] != Infinity) {
                        maxD = shortestD[each];
                        maxTarget = each;
                    }
                }
                deepPath = JSON.parse(JSON.stringify(dijResult.shortestPath[maxTarget]));
            }
            if (deepPath.length > 1) {
                moveForward(deepPath, "computer");
                deepPath.splice(1, 1);
                if (deepPath.length == 1) {
                    deepPath = [];
                }
            } else {
                stillAlive = false
            }

            // Machine-Learning Strategy
        }
        setTimeout(dijkstraLoop, 0);
    } else {
        stopPlaying();
    }
}

function moveForward(aPath, mode) {
    if (mode == "human") {
        let nextHead;
        try {
            nextHead = grid[aPath[0]][aPath[1]];
        } catch {
            stillAlive = false;
            return;
        }
        if (nextHead == undefined || nextHead.isBody) {
            stillAlive = false;
        } else {
            grid[headPos[0]][headPos[1]].setBody(document.getElementById(`${headPos[0]},${headPos[1]}`));
            body.push([headPos[0], headPos[1]]);
            headPos = [aPath[0], aPath[1]];
            grid[headPos[0]][headPos[1]].setHead(document.getElementById(`${headPos[0]},${headPos[1]}`));
            if (headPos[0] == foodPos[0] && headPos[1] == foodPos[1]) {
                placeNewFood();
            } else {
                let removedBody = body.shift();
                grid[removedBody[0]][removedBody[1]].setBlank(document.getElementById(`${removedBody[0]},${removedBody[1]}`));
            }
        }
    } else {
        grid[headPos[0]][headPos[1]].setBody(document.getElementById(`${headPos[0]},${headPos[1]}`));
        body.push([headPos[0], headPos[1]]);
        headPos = [aPath[1][0], aPath[1][1]];
        grid[headPos[0]][headPos[1]].setHead(document.getElementById(`${headPos[0]},${headPos[1]}`));
        let removedBody = body.shift();
        grid[removedBody[0]][removedBody[1]].setBlank(document.getElementById(`${removedBody[0]},${removedBody[1]}`));
    }
    correctBodyStyle();
}

function growthUp() {
    grid[storedTail[0]][storedTail[1]].setBody(document.getElementById(`${storedTail[0]},${storedTail[1]}`));
    body.splice(0, 0, [storedTail[0], storedTail[1]]);
}

function placeNewFood() {
    currentLength.innerHTML = body.length + 1;
    let blankCells = [];
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (grid[i][j].isBlank) {
                blankCells.push([i, j]);
            }
        }
    }
    if (blankCells.length != 0) {
        let foodTarget = blankCells[Math.floor(Math.random() * blankCells.length)];
        grid[foodTarget[0]][foodTarget[1]].setFood(document.getElementById(`${foodTarget[0]},${foodTarget[1]}`));
        foodPos = [foodTarget[0], foodTarget[1]];
    } else {
        stillAlive = false;
    }

}

function stopPlaying() {
    addAllEventListener();
}

function removeAllEventListener(mode) {
    if (mode != "human") {
        document.removeEventListener("keydown", turnAroundSnake);
    }
    playBtn.onclick = undefined;
    playBtn.disabled = true;
    dijkstraBtn.onclick = undefined;
    dijkstraBtn.disabled = true;
}

function initSnakeAndFood() {
    grid[headPos[0]][headPos[1]].setHead(document.getElementById(`${headPos[0]},${headPos[1]}`));
    body.forEach(each => {
        grid[each[0]][each[1]].setBody(document.getElementById(`${each[0]},${each[1]}`))
    });
    grid[foodPos[0]][foodPos[1]].setFood(document.getElementById(`${foodPos[0]},${foodPos[1]}`));
}

function correctBodyStyle() {
    for (let i = 0; i < body.length; i++) {
        const cellDiv = document.getElementById(`${body[i][0]},${body[i][1]}`);
        if (body[i - 1] != undefined) {
            if (body[i - 1][0] == body[i][0] && body[i - 1][1] < body[i][1]) {
                cellDiv.style.borderLeftColor = bodyColor;
            } else if (body[i - 1][0] == body[i][0] && body[i - 1][1] > body[i][1]) {
                cellDiv.style.borderRightColor = bodyColor;
            } else if (body[i - 1][1] == body[i][1] && body[i - 1][0] < body[i][0]) {
                cellDiv.style.borderTopColor = bodyColor;
            } else if (body[i - 1][1] == body[i][1] && body[i - 1][0] > body[i][0]) {
                cellDiv.style.borderBottomColor = bodyColor;
            }
        }
        if (body[i + 1] != undefined) {
            if (body[i + 1][0] == body[i][0] && body[i + 1][1] < body[i][1]) {
                cellDiv.style.borderLeftColor = bodyColor;
            } else if (body[i + 1][0] == body[i][0] && body[i + 1][1] > body[i][1]) {
                cellDiv.style.borderRightColor = bodyColor;
            } else if (body[i + 1][1] == body[i][1] && body[i + 1][0] < body[i][0]) {
                cellDiv.style.borderTopColor = bodyColor;
            } else if (body[i + 1][1] == body[i][1] && body[i + 1][0] > body[i][0]) {
                cellDiv.style.borderBottomColor = bodyColor;
            }
        }
    }
}