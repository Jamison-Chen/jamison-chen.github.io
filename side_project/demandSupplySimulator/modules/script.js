import { Consumer, Supplier } from './individual.js';
import { PriceMachine } from './priceMachine.js';
const animationField = document.getElementById("animation-field");
const marketEqChart = document.getElementById("market-eq-chart");
const surplusChart = document.getElementById("surplus-chart");
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");
const initialEqInput = document.getElementById("initial-eq");
const numOfConsumerInput = document.getElementById("number-of-consumer");
const numOfSupplierInput = document.getElementById("number-of-supplier");
const dayToSimulateInput = document.getElementById("day-to-simulate");
const pauseTimeInput = document.getElementById("pause-time");
let marketEqData;
let consumerList;
let supplierList;
let consumerSurplus;
let producerSurplus;
let currentDay;
let pm;
let nodeDivSize;
function suffleArray(anArray) {
    for (let i = anArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = anArray[i];
        anArray[i] = anArray[j];
        anArray[j] = temp;
    }
    return anArray;
}
function avg(arr) {
    return arr.reduce((prev, curr) => prev + curr, 0) / arr.length;
}
function createNodeDiv(pauseTime) {
    let nodeDiv = document.createElement("div");
    nodeDiv.className = "node";
    nodeDiv.style.width = `${nodeDivSize}px`;
    nodeDiv.style.height = `${nodeDivSize}px`;
    nodeDiv.style.transitionDuration = `${pauseTime / 2}ms`;
    if (animationField != null) {
        animationField.appendChild(nodeDiv);
    }
    return nodeDiv;
}
function preset(initialEq, numOfConsumer, numOfSupplier, pauseTime) {
    pm = new PriceMachine(initialEq, 20);
    nodeDivSize = 0;
    // decide the size of each node
    if (animationField instanceof HTMLElement) {
        nodeDivSize = Math.min(animationField.offsetHeight, animationField.offsetWidth) / Math.pow((numOfConsumer + numOfSupplier), 0.7);
    }
    // initialize all consumers and supplier
    for (let i = 0; i < Math.max(numOfConsumer, numOfSupplier); i++) {
        let [a, b] = pm.genPayableSellable(false);
        if (i < numOfConsumer) {
            const nodeDiv = createNodeDiv(pauseTime);
            let c = new Consumer(nodeDiv, a);
            consumerList.push(c);
        }
        if (i < numOfSupplier) {
            const nodeDiv = createNodeDiv(pauseTime);
            let s = new Supplier(nodeDiv, b);
            supplierList.push(s);
        }
    }
}
function simulate(initialEq, maxDay, pauseTime) {
    if (animationField != null) {
        // suffle consumer list and supplier list before matching them together
        consumerList = suffleArray(consumerList);
        supplierList = suffleArray(supplierList);
        // matching each consumer to each supplier
        for (let i = 0; i < consumerList.length; i++) {
            supplierList[i % supplierList.length].descendingQueueAConsumer(consumerList[i]);
            setTimeout(() => {
                consumerList[i].findSupplier(supplierList[i % supplierList.length]);
            }, pauseTime / 3);
        }
        let dealPriceToday = [];
        // check if deal
        for (let eachSupplier of supplierList) {
            eachSupplier.newInMkt = false;
            let paired = false;
            for (let eachConsumer of eachSupplier.consumerQueue) {
                eachConsumer.newInMkt = false;
                if (!paired) {
                    if (eachConsumer.bidPrice > eachSupplier.askPrice) {
                        let dealPrice = (eachConsumer.bidPrice + eachSupplier.askPrice) / 2;
                        dealPriceToday.push(dealPrice);
                        consumerSurplus += (eachConsumer.maxPayable - dealPrice);
                        producerSurplus += (dealPrice - eachSupplier.minSellable);
                        // generate a new pair of prices
                        let [a, b] = pm.genPayableSellable(true);
                        eachConsumer.maxPayable = a;
                        eachConsumer.bidPrice = eachConsumer.initBidPrice(false);
                        eachSupplier.minSellable = b;
                        eachSupplier.askPrice = eachSupplier.initAskPrice(false);
                        paired = true;
                    }
                }
            }
        }
        // record equilibrium and given-costs/utility if any deal happened today 
        if (dealPriceToday.length > 0) {
            marketEqData.push([marketEqData.length, pm.equilibrium, avg(dealPriceToday)]);
        }
        else {
            if (marketEqData.length == 1) {
                marketEqData.push([marketEqData.length, pm.equilibrium, initialEq]);
            }
            else {
                marketEqData.push([marketEqData.length, pm.equilibrium, marketEqData[marketEqData.length - 1][2]]);
            }
        }
        // clear the consumer queue of all supplier
        for (let eachSupplier of supplierList) {
            eachSupplier.consumerQueue = [];
        }
        // go back to rest and rebid/reask 
        for (let eachConsumer of consumerList) {
            eachConsumer.goBack(animationField);
            if (!eachConsumer.newInMkt) {
                eachConsumer.rebid();
                if (eachConsumer.dayToLive == 0) {
                    // die and reborn
                    let [a, b] = pm.genPayableSellable(false);
                    eachConsumer.maxPayable = a;
                    eachConsumer.bidPrice = eachConsumer.initBidPrice(true);
                }
            }
        }
        for (let eachSupplier of supplierList) {
            eachSupplier.goBack(animationField);
            if (!eachSupplier.newInMkt) {
                eachSupplier.reask();
                if (eachSupplier.dayToLive == 0) {
                    // die and reborn
                    let [a, b] = pm.genPayableSellable(false);
                    eachSupplier.minSellable = b;
                    eachSupplier.askPrice = eachSupplier.initAskPrice(true);
                }
            }
        }
        if (currentDay <= maxDay) {
            currentDay++;
            applyMarketEqChart(marketEqData);
            applySuplusChart(consumerSurplus, producerSurplus);
            setTimeout(() => { simulate(initialEq, maxDay, pauseTime); }, pauseTime);
        }
        else {
            enableControl();
        }
    }
}
function applyMarketEqChart(dataIn) {
    if (marketEqChart != null) {
        google.charts.load('current', { 'packages': ["corechart"] });
        let options = {
            title: 'Given Price vs. Market Equilibrium',
            titleTextStyle: {
                fontSize: 16,
                bold: false,
                color: "#777"
            },
            curveType: 'none',
            width: marketEqChart.offsetWidth,
            height: marketEqChart.offsetHeight,
        };
        google.charts.setOnLoadCallback(() => drawSimulatedChart(dataIn, options, "LineChart", marketEqChart));
    }
}
function applySuplusChart(consumerSurplus, producerSurplus) {
    if (surplusChart != null) {
        google.charts.load('current', { 'packages': ['corechart', 'bar'] });
        let dataIn = [
            ["Surplus", "Value", { role: "style" }],
            ["Consumer Surplus", consumerSurplus, "#4C8BF5"],
            ["Producer Surplus", producerSurplus, "#DE5246"],
        ];
        let options = {
            title: 'Surplus',
            titleTextStyle: {
                fontSize: 14,
                bold: true,
                color: "#000"
            },
            vAxis: {
                minValue: 0,
                maxValue: 30
            },
            bar: { groupWidth: "40%" },
            width: surplusChart.offsetWidth,
            height: surplusChart.offsetHeight,
            legend: { position: "none" }
        };
        google.charts.setOnLoadCallback(() => drawSimulatedChart(dataIn, options, "ColumnChart", surplusChart));
    }
}
function drawSimulatedChart(dataIn, options, chartType, targetDiv) {
    let data = google.visualization.arrayToDataTable(dataIn);
    let chart = new google.visualization[chartType](targetDiv);
    chart.draw(data, options);
}
function enableControl() {
    if (startBtn instanceof HTMLButtonElement && initialEqInput instanceof HTMLInputElement && numOfConsumerInput instanceof HTMLInputElement && numOfSupplierInput instanceof HTMLInputElement && dayToSimulateInput instanceof HTMLInputElement && pauseTimeInput instanceof HTMLInputElement) {
        startBtn.disabled = false;
        initialEqInput.disabled = false;
        numOfConsumerInput.disabled = false;
        numOfSupplierInput.disabled = false;
        dayToSimulateInput.disabled = false;
        pauseTimeInput.disabled = false;
    }
}
if (initialEqInput instanceof HTMLInputElement && numOfConsumerInput instanceof HTMLInputElement && numOfSupplierInput instanceof HTMLInputElement && dayToSimulateInput instanceof HTMLInputElement && pauseTimeInput instanceof HTMLInputElement) {
    initialEqInput.value = "100";
    numOfConsumerInput.value = "30";
    numOfSupplierInput.value = "30";
    dayToSimulateInput.value = "100";
    pauseTimeInput.value = "1000";
}
if (startBtn instanceof HTMLButtonElement && animationField != null) {
    startBtn.addEventListener("click", () => {
        animationField.innerHTML = "";
        marketEqData = [["Day", "Given Price", "Mkt. Eq."]];
        consumerList = [];
        supplierList = [];
        consumerSurplus = 0;
        producerSurplus = 0;
        currentDay = 1;
        startBtn.disabled = true;
        if (initialEqInput instanceof HTMLInputElement && numOfConsumerInput instanceof HTMLInputElement && numOfSupplierInput instanceof HTMLInputElement && dayToSimulateInput instanceof HTMLInputElement && pauseTimeInput instanceof HTMLInputElement) {
            let initialEq = parseInt(initialEqInput.value);
            let numOfConsumer = parseInt(numOfConsumerInput.value);
            let numOfSupplier = parseInt(numOfSupplierInput.value);
            let dayToSimulate = parseInt(dayToSimulateInput.value);
            let pauseTime = parseInt(pauseTimeInput.value);
            initialEqInput.disabled = true;
            numOfConsumerInput.disabled = true;
            numOfSupplierInput.disabled = true;
            dayToSimulateInput.disabled = true;
            pauseTimeInput.disabled = true;
            preset(initialEq, numOfConsumer, numOfSupplier, pauseTime);
            simulate(initialEq, dayToSimulate, pauseTime);
        }
    });
}
if (resetBtn != null) {
    resetBtn.addEventListener("click", () => { location.reload(); });
}
