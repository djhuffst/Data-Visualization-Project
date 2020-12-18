//these are the variables for the arizona map 
var mapSvg;
var width;
var height;
var InnerHeight;
var InnerWidth;
var margin = { top: 40, right: 375, bottom: 40, left: 30 };
barHeight = 20;

//these are the variables for the bar chart
var barSvg;
var barWidth;
var barHeight;
var barInnerHeight;
var barInnerWidth;
var barMargin = { top: 50, right: 60, bottom: 60, left: 15 };
var countyName = "Apache County";

//variables for the circle diagram
var circleSvg;
var circleWidth;
var circleHeight;
var circleInnerHeight;
var circleInnerWidth;
var circleMargin = { top: 10, right: 50, bottom: 50, left: 50 }
var YearInputNodes;

var mapData;
var CountyData;

//color scale stuff
var colorScale1 = d3.scaleOrdinal(d3.schemeBrBG[8]);

// This runs when the page is loaded
document.addEventListener('DOMContentLoaded', function () {
  //these initializes the variables for the arizona map
  mapSvg = d3.select('#map');
  width = +mapSvg.style('width').replace('px', '');
  height = +mapSvg.style('height').replace('px', '');;
  InnerWidth = width - margin.left - margin.right;
  InnerHeight = height - margin.top - margin.bottom;

  //these initializes the variables for the bar chart
  barSvg = d3.select('#barchart')
  barWidth = +barSvg.style('width').replace('px', '');
  barHeight = +barSvg.style('height').replace('px', '');
  barInnerWidth = barWidth - barMargin.left - barMargin.right;
  barInnerHeight = barHeight - barMargin.top - barMargin.bottom;

  //intilization of circle variables
  circleSvg = d3.select('#circlemap')
  circleWidth = +circleSvg.style('width').replace('px', '');
  circleHeight = +circleSvg.style('height').replace('px', '');
  circleInnerWidth = circleWidth - circleMargin.left - circleMargin.right;
  circleInnerHeight = circleHeight - circleMargin.top - circleMargin.bottom;

  // Load both files before doing anything else
  Promise.all([d3.json('data/AZCounty.geojson'),
  d3.csv('data/demoAgeSex.csv'), d3.csv('data/circle.csv')])
    .then(function (values) {

      mapData = values[0];
      countyData = values[1];
      circleData = values[2];

      drawMap();
      drawBarChart();
      drawNodes();
    })

});

//this function determines the color of the map and graph
function changeColor(choice) {
  switch (choice.value) {
    case "BrBG":
      colorScale1 = d3.scaleOrdinal(d3.schemeBrBG[8]);
      drawMap();
      drawBarChart();
      break;
    case "RdBu":
      colorScale1 = d3.scaleOrdinal(d3.schemeRdBu[8]);
      drawMap();
      drawBarChart();
      break;
    case "RdYlGn":
      colorScale1 = d3.scaleOrdinal(d3.schemeRdYlGn[8]);
      drawMap();
      drawBarChart();
      break;
    case "Spectral":
      colorScale1 = d3.scaleOrdinal(d3.schemeSpectral[10]);
      drawMap();
      drawBarChart();
      break;
    case "Paired":
      colorScale1 = d3.scaleOrdinal(d3.schemePaired);
      drawMap();
      drawBarChart();
      break;
    default:
      break;
  }
}

// Draw the map in the #map svg
function drawMap() {

  // create tooltip
  var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);


  // create the map projection and geoPath
  let projection = d3.geoMercator()
    .scale(4000)
    .center(d3.geoCentroid(mapData))
    .translate([+mapSvg.style('width').replace('px', '') / 2,
    +mapSvg.style('height').replace('px', '') / 2.1]);
  let path = d3.geoPath()
    .projection(projection);


  d3.selectAll(".projection").remove()
  // draw the map on the #map svg
  let g = mapSvg.append('g');
  g.selectAll('path')
    .data(mapData.features)
    .enter()
    .append('path')
    .attr("class", "projection")
    .attr('d', path)
    .attr('id', d => { return d.properties.NAME })
    //.attr('class','countrymap')
    .style('fill', function (d, i) {
      return colorScale1(i)
    })
    .style('stroke', 'white')
    .style("stroke-width", 1)
    .style("opacity", 1)
    .on('mouseover', function (d, i) {
      console.log('mouseover on ' + d.properties.NAME);
      d3.selectAll(".projection")
        .transition()
        .duration(100)
        .style("opacity", .5)
      d3.select(this)
        .transition()
        .duration(100)
        .style("opacity", 1)

      div.transition()
        .duration(50)
        .style("opacity", 1);
      div.html("County: " + d.properties.NAME)
        .style("left", (d3.event.pageX + 10) + "px")
        .style("top", (d3.event.pageY - 15) + "px");
    })
    .on('mousemove', function (d, i) {
      console.log('mousemove on ' + d.properties.NAME);
    })
    .on('mouseout', function (d, i) {
      console.log('mouseout on ' + d.properties.NAME);
      d3.selectAll(".projection")
        .transition()
        .duration(100)
        .style("opacity", 1)
      d3.select(this)
        .transition()
        .duration(100)
        .style("opacity", 1)

      div.transition()
        .duration('50')
        .style("opacity", 0);
    })
    .on('click', function (d) {
      countyName = d.properties.NAME + " County"
      drawBarChart()
      //drawNodes()
    });


}

function drawBarChart() {
  var yearInput = document.getElementById("yearSelect").value
  var actualYear = parseInt(yearInput) + 2009
  console.log(yearInput)

  var countyFilter = countyData.filter(d => d["CTYNAME"] == countyName)
  var yearFilter = countyFilter[yearInput]
  var ageData = []
  ageData.push(parseInt(yearFilter.UNDER5_TOT) + parseInt(yearFilter.AGE513_TOT))
  ageData.push(parseInt(yearFilter.AGE1417_TOT) + parseInt(yearFilter.AGE1824_TOT))
  ageData.push(parseInt(yearFilter.AGE2544_TOT))
  ageData.push(parseInt(yearFilter.AGE4564_TOT))
  ageData.push(parseInt(yearFilter.AGE65PLUS_TOT))

  console.log(countyFilter)
  console.log(yearFilter)

  const g = barSvg.append('g')
    .attr('transform', `translate(${barMargin.left},${barMargin.top})`);

  const yScale = d3.scaleLinear()
    .domain([0.7, 5.3])
    .range([barInnerHeight, 0])

  const xScale = d3.scaleLinear()
    .domain([0, d3.max(ageData)])
    .range([0, barInnerWidth])
    .nice()

  //remove axis on refresh
  barSvg.selectAll(".axis").remove()

  g.append('g')
    .attr('class', 'axis')
    .attr('transform', `translate(0,${barInnerHeight})`)
    .call(d3.axisBottom(xScale)
      .ticks(15));

  g.append('g')
    .attr('class', 'axis')
    .call(d3.axisLeft(yScale)
      .tickFormat("")
      .tickSize(0));

  //remove bars and labels on refresh
  barSvg.selectAll("rect").remove()
  barSvg.selectAll(".labels").remove()
  barSvg.selectAll(".axisText").remove()

  var bars = g.selectAll('rect')
    .data(ageData)
    .enter()
    .append('rect')
    .attr('y', (d, i) => yScale(i + 1) - 20)
    .attr('height', 40)
    .attr('width', (d, i) => xScale(ageData[i]))
    .style('fill', (d, i) => colorScale1(i))

  var barText = g.selectAll('.labels')
    .data(ageData)
    .enter()
    .append("text")
    .attr("class", "labels")
    .attr('y', (d, i) => yScale(i + 1) + 3)
    .attr('x', (d, i) => xScale(ageData[i]) + 5)
    .text(function (d, i) {
      switch (i) {
        case 0:
          return "Age: 0-13"
          break;
        case 1:
          return "Age: 14-24"
          break;
        case 2:
          return "Age: 25-44"
          break;
        case 3:
          return "Age: 45-64"
          break;
        case 4:
          return "Age: 65+"
          break;
        default:
          break;
      }
    })
    .style("font-size", "12")
    .style("font-weight", "500");

  console.log(ageData)
  var peopleText = g.selectAll('.people')
    .data(ageData)
    .enter()
    .append("text")
    .attr("class", "people")
    .attr('y', (d, i) => yScale(i + 1) + 3)
    .attr('x', 10)
    .text(function (d, i) {
      return d + " People";
    })
    .style("font-size", "12")
    .style("font-weight", "500")

  var title = g.append('text')
    .attr('class', 'axisText')
    .attr('transform', `translate(${barWidth / 5},-15)`)
    .text("Population Distribution of " + countyName + " in " + actualYear)
    .style("font-size", 22)
    .style("font-weight", '500')

}
function drawNodes() {

  //clear svg on new county
  circleSvg.selectAll('circle').remove();
  circleSvg.selectAll('text').remove();

  var div = d3.select("body").append("div")
    .attr("class", "tooltipNode")
    .style("opacity", 0);

  var yearInputNodes = document.getElementById("yearSelect").value
  var actualYearNodes = parseInt(yearInputNodes) + 1
  //console.log(yearInputNodes)
  //var countyrFilter = countyData.filter(d => d["CTYNAME"] == countyName)
  var yearFilter = countyData.filter(d => d["YEAR"] == actualYearNodes)
  //console.log(countyFilter)
  var under5 = []
  var from5to13 = []
  var from10to14 = []
  var from15to19 = []
  var from20to24 = []
  var from25to29 = []
  var from30to34 = []
  var from35to39 = []
  var from40to44 = []
  var from45to49 = []
  var from50to54 = []
  var from55to59 = []
  var from60to64 = []
  var above65 = []


  for (item of yearFilter) {
    under5.push(parseInt(item.UNDER5_TOT))
    from5to13.push(parseInt(item.AGE513_TOT))
    from10to14.push(parseInt(item.AGE1014_TOT))
    from15to19.push(parseInt(item.AGE1519_TOT))
    from20to24.push(parseInt(item.AGE2024_TOT))
    from25to29.push(parseInt(item.AGE2529_TOT))
    from30to34.push(parseInt(item.AGE3034_TOT))
    from35to39.push(parseInt(item.AGE3539_TOT))
    from40to44.push(parseInt(item.AGE4044_TOT))
    from45to49.push(parseInt(item.AGE4549_TOT))
    from50to54.push(parseInt(item.AGE5054_TOT))
    from55to59.push(parseInt(item.AGE5059_TOT))
    from60to64.push(parseInt(item.AGE6064_TOT))
    above65.push(parseInt(item.AGE65PLUS_TOT))
  }

  // console.log(under5)
  // console.log(yearFilter)

  var x = d3.scaleOrdinal()
    .domain([1, 3, 5, 7, 9, 11, 12, 13, 15, 17, 19, 21, 23, 25, 27])
    .range([0, 600, 1200, 0, 600, 1200, 0, 600, 1200, 0, 600, 1200, 0, 600, 1200])
  var y = d3.scaleOrdinal()
    .domain([1, 3, 5, 7, 9, 11, 12, 13, 15, 17, 19, 21, 23, 25, 27])
    .range([60, 60, 60, 350, 350, 350, 750, 750, 750, 1200, 1200, 1200, 1600, 1600, 1600])
  var countyNames = ["Apache County", "Cochise County", "Coconino County", "Gila County", "Graham County", "Greenlee County", "La Paz County", "Maricopa County",
    "Mohave County", "Navajo County", "Pima County", "Pinal County", "Santa Cruz County", "Yavapai County", "Yuma County"]

  var colorCircle = d3.scaleOrdinal(d3.schemeSet3);

  var graph = circleSvg.append('text')
    .text("Average Population Size Based on Age Group By County from 2009 to 2020")
    .attr("x", 600)
    .attr("y", 100)
    .style("font-size", 24)
    .style("font-weight", '500')

  // Initialize the circle: all located at the center of the svg area
  var count = 0;
  var node = circleSvg.append("g")
    .selectAll("circle")
    .data(circleData)
    .enter()
    .append("circle")
    .attr("r", function (d) {
      if (d.COUNTY == "13") { return d.ageGroupTotal / 7000; }
      if (d.COUNTY == "19") { return d.ageGroupTotal / 2500; }
      if (d.COUNTY == "21") { return d.ageGroupTotal / 2000; }
      if (d.COUNTY == "25" || d.COUNTY == "15") { return d.ageGroupTotal / 1000; }
      if (d.COUNTY == "27") { return d.ageGroupTotal / 900; }
      if (d.COUNTY == "5" || d.COUNTY == "17" || d.COUNTY == "3") { return d.ageGroupTotal / 800; }
      if (d.COUNTY == "1" || d.COUNTY == "7") { return d.ageGroupTotal / 700; }
      if (d.COUNTY == "9" || d.COUNTY == "23") { return d.ageGroupTotal / 500; }
      if (d.COUNTY == "11" || d.COUNTY == "12") { return d.ageGroupTotal / 200; }

      else {
        return d.ageGroupTotal / 1000;
      }
    })
    .attr("cx", circleWidth / 2)
    .attr("cy", circleHeight / 2)
    .style("fill", (function (d) {
      return colorCircle(d.Group);
    }))
    .style("fill-opacity", 0.9)
    .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended))

    //hover functions
    .on('mouseover', function (d, i) {
      var ageGroup = ""
      var pop = ""
      switch (d.Group) {
        case "1":
          ageGroup = "Under 5:"
          pop = d.ageGroupTotal + " people"
          break;
        case "2":
          ageGroup = "Ages 5-13:"
          pop = d.ageGroupTotal + " people"
          break;
        case "3":
          ageGroup = "Ages 10-14:"
          pop = d.ageGroupTotal + " people"
          break;
        case "4":
          ageGroup = "Ages 15-19:"
          pop = d.ageGroupTotal + " people"
          break;
        case "5":
          ageGroup = "Ages 20-24:"
          pop = d.ageGroupTotal + " people"
          break;
        case "6":
          ageGroup = "Ages 25-29:"
          pop = d.ageGroupTotal + " people"
          break;
        case "7":
          ageGroup = "Ages 30-34:"
          pop = d.ageGroupTotal + " people"
          break;
        case "8":
          ageGroup = "Ages 35-39:"
          pop = d.ageGroupTotal + " people"
          break;
        case "9":
          ageGroup = "Ages 40-44:"
          pop = d.ageGroupTotal + " people"
          break;
        case "10":
          ageGroup = "Ages 45-49:"
          pop = d.ageGroupTotal + " people"
          break;
        case "11":
          ageGroup = "Ages 50-54:"
          pop = d.ageGroupTotal + " people"
          break;
        case "12":
          ageGroup = "Ages 55-59:"
          pop = d.ageGroupTotal + " people"
          break;
        case "13":
          ageGroup = "Ages 60-64:"
          pop = d.ageGroupTotal + " people"
          break;
        case "14":
          ageGroup = "Ages 65+:"
          pop = d.ageGroupTotal + " people"
          break;
        default:
          break;
      }
      console.log(ageGroup)
      d3.select(this).transition()
        .duration(10)
        .attr("stroke", "gray")
        .attr("stroke-width", 4)
      div.transition()
        .duration(50)
        .style("opacity", 0.95);
      div.html(ageGroup + "<br/>" + pop)
        .style("left", (d3.event.pageX + 30) + "px")
        .style("top", (d3.event.pageY - 40) + "px");
    })
    // .on('mousemove', function (d, i) {
    //   console.log('mousemove on ' + d.properties.NAME);
    // })
    .on('mouseout', function (d, i) {
      d3.select(this).transition()
        .duration(10)
        .attr("stroke-width", 0)
      div.transition()
        .duration('50')
        .style("opacity", 0);
    })

  // Features of the forces applied to the nodes:
  var simulation = d3.forceSimulation()
    .force("x", d3.forceX().strength(0.5).x(function (d) { return x(d.COUNTY) }))
    .force("y", d3.forceY().strength(0.5).y(d => y(d.COUNTY)))
    .force("center", d3.forceCenter().x(circleWidth / 2).y(circleHeight / 2)) // Attraction to the center of the svg area
    .force("charge", d3.forceManyBody().strength(1)) // Nodes are attracted one each other of value is > 0
    .force("collide", d3.forceCollide().strength(.3).radius(function (d) {
      if (d.COUNTY == "13") { return 50; }
      if (d.COUNTY == "19") { return 35; }
      if (d.COUNTY == "21") { return 18; }
      if (d.COUNTY == "25" || d.COUNTY == "15") { return 16; }
      if (d.COUNTY == "27") { return 16; }
      if (d.COUNTY == "5" || d.COUNTY == "17" || d.COUNTY == "3") { return 13; }
      if (d.COUNTY == "1" || d.COUNTY == "7") { return 10; }
      if (d.COUNTY == "9" || d.COUNTY == "23") { return 10; }
      if (d.COUNTY == "11" || d.COUNTY == "12") { return 8; }
      // else {

      // }
    }).iterations(1)) // Force that avoids circle overlapping

  // // Apply these forces to the nodes and update their positions.
  // // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
  simulation
    .nodes(circleData)
    .on("tick", function (d) {
      node
        .attr("cx", function (d) { return d.x; })
        .attr("cy", function (d) { return d.y; })
    });

  var nodeText = circleSvg.selectAll(".label")
    .data(countyNames)
    .enter()
    .append("text")
    .attr("class", "label")
    .attr("font-weight", 500)
    .attr("x", function (d, i) {
      if (i % 3 == 0) {
        return 250;
      }
      else if (i % 3 == 1) {
        return 850;
      }
      else {
        return 1450;
      }
    })
    .attr("y", function (d, i) {
      console.log(i)
      if (i < 3) {
        return 350;
      }
      if (3 <= i && i < 6) {
        return 600;
      }
      if (i >= 6 && i < 9) {
        return 1100;
      }
      if (i >= 9 && i < 12) {
        return 1500;
      }
      if (i >= 12 && i < 16) {
        return 1900;
      }

    })
    .text(function (d, i) {
      return countyNames[i]
    })


  // // What happens when a circle is dragged?
  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(.03).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }
  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(.03);
    d.fx = null;
    d.fy = null;
  }





}
