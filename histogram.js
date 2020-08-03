// Input
let datapoints = [12, 7, 16, 23 , 16, 28, 60];
let maxDatapoint = Math.max(...datapoints);
let binWidth = 15;

// Output
let binsContainer = document.getElementById("binsContainer");
let labelsContainer = document.getElementById("labelsContainer");
let numberOfBars = getNumberOfBins(binWidth, maxDatapoint);
let binsRange = [];
let binsHeight = getHistogram(datapoints);


function getHistogram(datapoints) {
    
    let binsHeight = [];
    
    for (let i = 1; i <= numberOfBars; i++) {
        binsHeight.push(0);
    }
    datapoints.forEach(datapoint => {
        for (let i = 0; i < numberOfBars; i++) {
            // determine range values for current label
            let range = new Map();
            range.set("from", (i) * binWidth + 1);
            range.set("to", (i+1) * binWidth);
            binsRange[i] = range;
            // determine height for current bin
            if ((range.get("from") < datapoint) && (datapoint <= range.get("to"))) { 
                binsHeight[i]++;
            }
        }
    })
    console.log(binsHeight);
    return binsHeight;
}

function getNumberOfBins(binWidth, maxDatapoint) {
    return Math.ceil(maxDatapoint / binWidth); 
}

// Display Bins -> also into function ?
binsHeight.forEach(barHeight => {
    let bar = document.createElement("div");
    bar.style.height = ((barHeight || 0.02) * 100) + "px";
    // bar.style.minWidth = "20px";
    bar.style.width = ((380 / numberOfBars) -2 ) + "px";
    bar.style.background = "salmon";

    binsContainer.appendChild(bar);
});

// Display Labels 
binsRange.forEach(binRange => {
    let label = document.createElement("div");
    let labelContainer = document.createElement("div");

    labelContainer.style.width = ((380 / numberOfBars) -2 ) + "px";     // same as in Bins -> function ?
    labelContainer.style.display = "flex";
    labelContainer.style.justifyContent = "center";

    label.innerHTML = binRange.get("from") + " - " + binRange.get("to");
    label.margin ="auto";
    // label.style.background = "yellow";
    label.style.fontFamily = "Verdana, Arial, sans-serif";

    labelContainer.appendChild(label);
    labelsContainer.appendChild(labelContainer);
});
