// Input
let datapoints = [12, 7, 16, 23 , 16, 28, 60];
let maxDatapoint = Math.max(...datapoints);
let binWidth = 10;

// Output
let main = document.getElementById("container");
let numberOfBars = getNumberOfBars(binWidth, maxDatapoint);
let binsHeight = getHistogram(datapoints);


function getHistogram(datapoints) {
    // let numberOfBars = 3;
    let binsHeight = [];
    for (let i = 1; i <= numberOfBars; i++) {
        binsHeight.push(0);
    }
    datapoints.forEach(datapoint => {

        for (let i = 0; i < numberOfBars; i++) {
            if (((i)*binWidth < datapoint) && (datapoint <= (i+1)*binWidth)) { 
                binsHeight[i]++;
            }
        }
    })
    console.log(binsHeight);
    return binsHeight;
}

function getNumberOfBars(binWidth, maxDatapoint) {
    return Math.ceil(maxDatapoint / binWidth); 
}

// let bars_height = [1, 3, 2]


// Display Bars -> also into function ?
binsHeight.forEach(barHeight => {
    let bar = document.createElement("div");
    bar.style.height = ((barHeight || 0.02) * 100) + "px";
    bar.style.width = ((380 / numberOfBars) -2 ) + "px";
    bar.style.background = "salmon";

    main.appendChild(bar);
});
