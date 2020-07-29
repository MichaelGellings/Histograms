let datapoints = [100, 300, 225];
let main = document.getElementById("container");

datapoints.forEach(datapoint => {
    let bar = document.createElement("div");
    bar.style.height = datapoint + "px";
    bar.style.width = "80px";
    bar.style.background = "salmon";

    main.appendChild(bar);
});
