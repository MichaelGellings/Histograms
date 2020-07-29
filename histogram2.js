// TODO continer (graues main-Element) dynamisch anpassen.
// TODO Skalen / Achsen anzeigen.

// TODO Datenpunkte eingeben und anzeigen.
// TODO Balkenbreite eingeben (zunächst Input-Feld?) über Schieber.

// TODO Als Git-Projekt anlegen.
// TODO Code aufräumen (alles in Funktionen, eventuell mehrerr JS-Dateien).

let datapoints = [12, 7, 16, 23 , 16, 28, 60];
let maxDatapoint = Math.max(...datapoints);
let main = document.getElementById("container");
let classWidth = 3;
let numberOfBars = getNumberOfBars(classWidth, maxDatapoint);

function getHistogram(datapoints) {
    // let numberOfBars = 3;
    let barsHeight = [];
    for (let i = 1; i <= numberOfBars; i++) {
        barsHeight.push(0);
    }
    datapoints.forEach(datapoint => {

        for (let i = 1; i <= numberOfBars; i++) {
            if (((i-1)*classWidth < datapoint) && (datapoint <= i*classWidth)) { 
                barsHeight[i-1]++;
            }
        }
    })
    console.log(barsHeight);
    return barsHeight;
}

let barsHeight = getHistogram(datapoints);

function getNumberOfBars(barWidth, maxDatapoint) {
    return Math.ceil(maxDatapoint / barWidth); 
}

// let bars_height = [1, 3, 2]


// Display Bars -> also into function ?
barsHeight.forEach(barHeight => {
    let bar = document.createElement("div");
    bar.style.height = ((barHeight || 0.02) * 100) + "px";
    bar.style.width = ((380 / numberOfBars) -2 ) + "px";
    bar.style.background = "salmon";

    main.appendChild(bar);
});
