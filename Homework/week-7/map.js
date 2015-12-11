// Dashboard
// Name: Kyra Kieskamp
// stnr: 10099727
// Language: javascript
// scriptname: maps.js

// Information about and pieces of the bar chart from: http://www.sitepoint.com/creating-simple-line-bar-charts-using-d3-js/
// I was still working on the tooltip for the bar chart, but I could not finish it anymore. Additionally, the legend needed work too. 
// The values still needed to change. 

var country;
var Y2013;
var	GlobalData = {}

// obtaining the jason data
d3.json("data.json", function(error, json) {
	if (error) return console.warn(error);
  	data = json;
  	MapData = {}

  	// reading each line
  	data.forEach(function(element, index, array){
  		type = element[1]
  		type2 = element[0]

  		// obtaining data for the bar graph
  		if (type2 == 'Labor force with primary education (% of total)'){
  			country = element[3]
  			PLabor = element[9]
  			GlobalData[country] = {prim: PLabor}
  			if (country == "NDL"){
  				console.log(PLabor)
  			}
  		}
  		if (type2 == 'Labor force with secondary education (% of total)'){
  			country = element[3]
  			SLabor = element[9]
  			if (country in GlobalData){ 
  				GlobalData[country].sec = SLabor
  			}

  		}
  		if (type2 == 'Labor force with tertiary education (% of total)'){
    		country = element[3]
  			TLabor = element[9]
  			if (country in GlobalData){ 
  				GlobalData[country].ter = TLabor
  			}

  		}

  		// obtaining data for map
		if (type == " total") {
			country = element[4]
			Labor_force = element[10]
			if (Labor_force < 1000000) { 
				MapData[country] = {fillKey: 'LOW', LabFor_2013_value: Labor_force}
			}
			if (Labor_force > 1000000 && Labor_force < 2000000) { 
				MapData[country] = {fillKey: 'LOWMED', LabFor_2013_value: Labor_force}
			}
			if (Labor_force > 2000000 && Labor_force < 4000000) { 
				MapData[country] = {fillKey: 'MEDIUM', LabFor_2013_value: Labor_force}
			}
			if (Labor_force > 4000000 && Labor_force < 8000000) { 
				MapData[country] = {fillKey: 'HIGHMED', LabFor_2013_value: Labor_force}
			}
			if (Labor_force > 8000000) { 
				MapData[country] = {fillKey: 'HIGH', LabFor_2013_value: Labor_force}
			}
			if (Labor_force == ".." ) { 
				MapData[country] = {fillKey: 'UNKNOWN', LabFor_2013_value: Labor_force}
			}	
		}
	});

	var maps = new Datamap({
		element: document.getElementById('container'),

		// colors
		fills: {
			HIGH: '#590059',
			LOW: '#f600f6',
			LOWMED: '#ce00ce',
			MEDIUM: '#a700a7',
			HIGHMED: '#800080',
			UNKNOWN: 'rgb(0,0,0)',
			defaultFill: 'grey'
		},
		data: MapData,
        geographyConfig: {
    		popupTemplate: function(geo, data) {
        	return ['<div class="hoverinfo"><strong>',
        		'Name: ' + geo.properties.name + '\n',
			   	'Total Labor Force: ' + data.LabFor_2013_value,
                '</strong></div>'].join('');
  			}
  	// popupTemplate:function(a){
  	// 	return'<div class="hoverinfo"><strong>'+a.properties.name+"</strong></div>"},popupOnHover:!0,highlightOnHover:!0,highlightFillColor:"#FC8D59",highlightBorderColor:"rgba(250, 15, 160, 0.2)",highlightBorderWidth:2},projectionConfig:{rotation:[97,0]},bubblesConfig:{borderWidth:2,borderColor:"#FFFFFF",popupOnHover:!0,radius:null

 		},
 		done: function(datamap) {
            datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
                InitChart(GlobalData, geography.id);
                console.log(geography.id)

            });
        },
     //    geographyConfig: {
		   //  popupTemplate: function(geo, data) {
		   //      return ['<div class="hoverinfo"><strong>',
		   //              'Population Density:' + data.Density,
		   //              '</strong></div>'].join('');
		  	// }
		  	// popupTemplate:function(a){
		  	// 	return'<div class="hoverinfo"><strong>'+a.properties.name+"</strong></div>"},popupOnHover:!0,highlightOnHover:!0,highlightFillColor:"#FC8D59",highlightBorderColor:"rgba(250, 15, 160, 0.2)",highlightBorderWidth:2},projectionConfig:{rotation:[97,0]},bubblesConfig:{borderWidth:2,borderColor:"#FFFFFF",popupOnHover:!0,radius:null
		
		  // },
	});
	maps.legend();

//draw a legend for this map

	function InitChart(data, id) {
		// data
		var barData =

		[{
		'x': 10,
		'y': data[id].prim
		}, {
		'x': 20,
		'y': data[id].sec
		}, {
		'x': 30,
		'y': data[id].ter
		}];

		// width, height and margins
	   	var vis = d3.select('#visualisation'),
	    WIDTH = 600,
	    HEIGHT = 280,
	    MARGINS = {
	      top: 20,
	      right: 20,
	      bottom: 20,
	      left: 50
	    },

	    // ranges
		xRange = d3.scale.ordinal().rangeRoundBands([MARGINS.left, WIDTH - MARGINS.right], 0.1).domain(barData.map(function(d) {
		  return d.x;
		}));

		yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0,100])

		// creating the axes
	    xAxis = d3.svg.axis()
	      .scale(xRange)
	      .tickSize(5)
	      .tickSubdivide(true)


	    yAxis = d3.svg.axis()
	      .scale(yRange)
	      .tickSize(5)
	      .orient("left")
	      .tickSubdivide(true);

	  	vis.append('svg:g')
	    .attr('class', 'x axis')
	    .attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
	    .call(xAxis);

	  	vis.append('svg:g')
	    .attr('class', 'y axis')
	    .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
	    .call(yAxis);

	    // text on the axes
	    vis.append("text")
	    .attr("class", "x label")
	    .attr("text-anchor", "end")
	    .attr("x", WIDTH - 50)
	    .attr("y", HEIGHT + 18)
	    .text("type of education in percentage of total labor force");

	    // text primary
	   	vis.append("text")
	    .attr("class", "x label")
	    .attr("text-anchor", "end")
	    .attr("x", 175)
	    .attr("y", HEIGHT + 5)
	    .text("primary");

	    // text secondary
	   	vis.append("text")
	    .attr("class", "x label")
	    .attr("text-anchor", "end")
	    .attr("x", 350)
	    .attr("y", HEIGHT + 5)
	    .text("secondary");

	    // text tertiary
	    vis.append("text")
	    .attr("class", "x label")
	    .attr("text-anchor", "end")
	    .attr("x", 500)
	    .attr("y", HEIGHT + 5)
	    .text("tertiary");

	    // y-axis text
	    vis.append("text")
	    .attr("class", "y label")
	    .attr("text-anchor", "end")
	    .attr("x", 15)
	    .attr("y", 20)
	    .text("%");

	    // creates the rectangles
		vis.selectAll('rect')
		.remove()

		vis.selectAll('rect')
		.data(barData)
		.enter()
		.append('rect')
		.attr('x', function(d) { // sets the x position of the bar
			return xRange(d.x);
		})
		.attr('y', function(d) { // sets the y position of the bar
			return yRange(d.y);
		})
		.attr('width', xRange.rangeBand()) // sets the width of bar
		.attr('height', function(d) {      // sets the height of bar
			return ((HEIGHT - MARGINS.bottom) - yRange(d.y));
		})
		.attr('fill', '#ff884d');   // fills the bar with same colour as in graph

		var dis = vis.append('g');

		var txt = dis.append('text')
		    .attr({ transform: 'translate(5,20)', fill:'red'})
		    .text("hello");

		vis.selectAll('rect')
    	.on("mouseover", function(d) { 
        var mousePos = d3.mouse(this);
        txt.attr({transform: 'translate(' + function(d) { 
			return yRange(d.y)} + ')'});
    	})
    	.on("mousemove", function(d) { 
        var mousePos = d3.mouse(this);
        txt.attr({transform: 'translate(' + function(d) { 
			return yRange(d.y)} + ')'}); 
    	});



	}

});
