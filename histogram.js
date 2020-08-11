// Input
const datapoints = [12, 7, 16, 23 , 16, 28, 60];

// const inputRange = document.getElementById("inputRange");
// const submitButton = document.getElementById("submitButton");
// submitButton.addEventListener("click", drawHistorgram);

const inputRange = document.getElementById("inputRange");
const control = document.getElementById("control");
drawHistorgram();
inputRange.addEventListener("change", drawHistorgram);

function testOutput() {
    console.log(inputRange.value);
}
// Output

function drawHistorgram() {

    const binsContainer = document.getElementById("binsContainer");
    binsContainer.innerHTML = "";
    const labelsContainer = document.getElementById("labelsContainer");
    labelsContainer.innerHTML = "";

    const binRange = inputRange.value;
    control.innerHTML = binRange;

    const numberOfBars = getNumberOfBins(datapoints, binRange);
    const histogram = getHistogram(datapoints, binRange);       // returns Array [items per bin, bin labels]
    const bars = histogram[0];
    const labels = histogram[1];
    const barWidth = ((380 / numberOfBars) - 2 ) + "px";

    // console.log(bars);

    // Display Bars
    bars.forEach(barHeight => {    
        const bar = document.createElement("div");
        bar.style.height = ((barHeight || 0.02) * 100) + "px";
        // bar.style.minWidth = "20px";
        bar.style.width = barWidth;
        bar.style.background = "salmon";

        binsContainer.appendChild(bar);
    });

    // Display Labels
    labels.forEach(binInterval => {
        const labelContainer = document.createElement("div");
        const label = document.createElement("div");

        labelContainer.style.width = barWidth;
        labelContainer.style.display = "flex";
        labelContainer.style.justifyContent = "center";

        label.innerHTML = binInterval.get("from") + " - " + binInterval.get("to");
        label.margin ="auto";
        // label.style.background = "yellow";
        label.style.fontFamily = "Verdana, Arial, sans-serif";

        labelContainer.appendChild(label);
        labelsContainer.appendChild(labelContainer);
    });
}

function getHistogram(datapoints, binRange) {

    const numberOfBars = getNumberOfBins(datapoints, binRange);   
    let numberOfItemsPerBin = [];
    let binsLabels = [];
    
    
    for (let i = 0; i < numberOfBars; i++) {
        
        // initialize numberOfItemsPerBin with 0 for each bin
        numberOfItemsPerBin.push(0);
        
        // determine range values for current label
        let label = new Map();
        label.set("from", (i) * binRange + 1);
        label.set("to", (i+1) * binRange);
        binsLabels[i] = label;
    }

    datapoints.forEach(datapoint => {
        for (let i = 0; i < numberOfBars; i++) {
            const currentBin = binsLabels[i];
            if ((currentBin.get("from") < datapoint) && (datapoint <= currentBin.get("to"))) { 
                numberOfItemsPerBin[i]++;
            }
        }
    })
    
    return [numberOfItemsPerBin, binsLabels];  // rename binsRange -> labels, or similar?
}

function getNumberOfBins(datapoints, binRange) {
    if(binRange != 0) {
        const maxDatapoint = Math.max(...datapoints);
        return Math.ceil(maxDatapoint / binRange);  
    }
    
}


