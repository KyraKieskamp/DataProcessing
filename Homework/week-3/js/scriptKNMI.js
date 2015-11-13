// Javascript: line-graph exercise
// Name: Kyra Kieskamp
// stnr: 10099727
// Language: javascript
// scriptname: scriptKNMI.js
// Content: KNMI data script conversion to a graph on website

// global values
var CHeight = 600
var CWidth = 1600
var Dxmin = 0
var Dxmax = 365
var Rxmin = 30
var Rxmax = 1500
var Dymin = -50
var Dymax = 400
var Rymin = 40
var Rymax = 500


// Creating a seperate string for date and temp
raw_data = document.getElementById("rawdata").innerHTML;
res = raw_data.split ("\n");
datetemp = [];
date = [];
temp = [];
millisec = [];
for (var i = 0; i < res.length; i++) {
    datetemp[i] = res[i].split(",");
    var d = new Date(datetemp[i][0]);
    date.push(d);
    var n = d.getTime();
    millisec.push(n);
    temp.push(datetemp[i][1]);
}

// Converting the the milliseconds in time, to actual days
Day_number = ToDays(millisec);

// Transforming the domain values to the canvas(range) values.
Canvas_xpos = [];
Canvas_ypos = [];
var transform_x = createTransform([Dxmin, Dxmax], [Rxmin, Rxmax]);
var transform_y = createTransform([Dymin, Dymax], [Rymin, Rymax]);
for (var i=0; i < Day_number.length; i++){
    xpos = transform_x(Day_number[i]);
    Canvas_xpos.push(xpos);
    ypos = transform_y(temp[i]);
    Canvas_ypos.push(ypos);
}

// Canvas input.
var canvas = document.getElementById('mycanvas');
var ctx = canvas.getContext('2d');

// The x-axis and y-axis lines
ctx.beginPath();
ctx.lineWidth = 1;
ctx.lineCap = "round";
ctx.moveTo(Rxmin,(CHeight - 0));
ctx.lineTo(Rxmin, (CHeight -Rymax));
ctx.stroke();
ctx.moveTo(0, (CHeight - Rymin));
ctx.lineTo(Rxmax, (CHeight - Rymin));
ctx.stroke();

// Title and axis titles.
ctx.font="35px Georgia";
ctx.fillText("Location: The Bilt", 600, CHeight - 560, 150);
ctx.font="20px Georgia";
ctx.fillText("max temp data in 1995", 780, CHeight - 560, 100);
ctx.font="10px Georgia";
ctx.fillText("Temperature", 0, CHeight - 560, 600);
ctx.fillText("(in 0.1 degree Celcius)", 0, CHeight - 550,100);
ctx.font="15px Georgia";
ctx.fillText("Day count", 740, CHeight - 5, 100);
ctx.font="15px Georgia";

// The temperature line
ctx.moveTo(Canvas_xpos[0], CHeight - Canvas_ypos[0]);
for (var i=0; i < Day_number.length; i++){
    ctx.lineTo(Canvas_xpos[i], (CHeight - Canvas_ypos[i]));
    ctx.stroke();
}

// The x-axis legend.
for (var i=0; i < Day_number.length; i += 30){
    ctx.fillText(Day_number[i], Canvas_xpos[i], CHeight - 20, 50);
}

// Creating the y-axis legend list and its positions.
temperatures = []
Ttemperatures = []
for (var i=-50; i <= 400 ; i += 50){
    temperatures.push(i);
    Ttemperatures.push(transform_y(i));
}

// The y-axis legend.
for (var i=0; i < temperatures.length; i++){
    ctx.fillText(temperatures[i], 5, CHeight - Ttemperatures[i],10);
}

// Creating the 0-axis line
ctx.moveTo(Rxmin, CHeight - Ttemperatures[1]);
ctx.setLineDash([4, 8]);
ctx.lineDashOffset = 0;
ctx.lineTo(Rxmax, (CHeight - Ttemperatures[1]));
ctx.stroke();

// Function to convert the milliseconds to the days.
function ToDays(milliseconds){
    var secinday = 86400000;
    day_counter = [];
    for (var i=0; i < milliseconds.length; i++){
        day = ((milliseconds[i] - milliseconds[0])/secinday);
        day = Math.round(day);
        day_counter.push(day);
    }
    return day_counter
}

// Function for transformation field.
function createTransform(domain, range){
	// domain is a two-element array of the domain's bounds
	// range is a two-element array of the range's bounds
	var alpha = (range[1] - range[0]) / (domain[1] - domain[0]);
    var beta = range[0] - alpha * domain[0];

	return function(x){
		return alpha * x + beta;
	};
}
