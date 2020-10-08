// Input
// let datapoints = [12, 7, 16, 23 , 16, 28, 60];
// let datapointsAsStrings = [];

const main = document.getElementById("main");

const test = document.getElementById("datapoints");

const control = document.getElementById("control");
const inputRange = document.getElementById("inputRange");
inputRange.addEventListener("mousemove", drawHistorgram);
inputRange.addEventListener("click", drawHistorgram);

const submitButton = document.getElementById("submitButton");
submitButton.addEventListener("click", drawHistorgram);

drawHistorgram();

// Output

function drawHistorgram() {

    const datapointsAsStrings = test.value.split(" ");
    console.log(datapointsAsStrings);
    const datapoints = datapointsAsStrings.map(item => parseInt(item));
    console.log(datapoints);
    // TODO catch error when an item is NaN because of additional space

    const linesContainer = document.getElementById("linesContainer");
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
    const barWidth = ((400 / numberOfBars) - 5 ) + "px";

    // console.log(bars);
    const maxBarHeight = Math.max(...bars);

    // Display lines
    for (let i = maxBarHeight; i > 0; i--) {
        const line = document.createElement("div");
        line.style.position = "relative";
        line.style.right ="30px";
        line.style.height = ((350 / maxBarHeight) - 1) + "px";
        line.style.width = "430px";
        line.style.borderTop = "1px solid black";
        line.innerHTML = i;

        linesContainer.appendChild(line);
    }
    // TODO Line for 0

    // Display Bars
    bars.forEach(barHeight => {    
        const bar = document.createElement("div");
        bar.style.height = ((barHeight / maxBarHeight) * 350 || 2) + "px";      // Factor 350 corresponds to container height
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


