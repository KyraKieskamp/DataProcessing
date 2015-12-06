// D3:
// week 6
// Name: Kyra Kieskamp
// stnr: 10099727
// Language: javascript and d3
// scriptname: d3line.js
// Content: KNMI data script conversion to a graph on website
// Information on how to make the graph in d3 obtained from: https://leanpub.com/D3-Tips-and-Tricks/read#leanpub-auto-adding-data-to-the-line-function
//https://github.com/mbostock/d3/wiki/Requests

// I eventually got stuck by transforming the data, and being able to have both the date and the temparatures apart. 



var margin = {top: 30, right: 30, bottom: 30, left: 50},
    width = 1000 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

// // Parse the date / time
// var parseDate = d3.time.format("%d-%b-%y").parse;

// Set the ranges, here the actual days and temperature would have to be ingegrated (instead of linear). 
var x = d3.scale.linear().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

// Define the axes
var xAx = d3.svg.axis().scale(x)
    .orient("bottom").ticks(10);

var yAx = d3.svg.axis().scale(y)
    .orient("left").ticks(10);

var svg = d3.select("body")
.append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
.append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

var data;
var date;
var date_list;
var temp;
var temp_list;
d3.json("KNMImaxtemp_W6.json", function(error, json) {
	if (error) return console.warn(error);
  	data = json;
  	data.forEach(function(element, index, array){
	    date = d3.time.format(element[0])
	    d3.time.format
	    date_list = date
	    temp = element[1]
	    temp_list = +temp
	  	console.log(temp)
	    console.log(date)
  	});

});

// Add the X Axis
svg.append("g")
    .attr("class", "x_axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAx);

// Add the Y Axis
svg.append("g")
    .attr("class", "y_axis")
    .call(yAx);

 //Draw the line
 // The idea would be to keep on drawing the line to the new point given in data
svg.append("line")
	.attr("x1", 5)
	.attr("y1", (height - 5))
	.attr("x2", 50)
	.attr("y2", 50)
	.attr("stroke", "black");

// An idea to create the data into lines
var line = d3.svg.line()
.interpolate("basis")
.x(function(d, i) { return x(date[i]); })
.y(function(d, i) { return y(d.temp[i]); });

