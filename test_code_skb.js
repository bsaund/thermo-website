/**
 * Created by secretariat21 on 9/3/15. From code from https://groups.google.com/forum/#!topic/d3-js/vo-6AciRswU
 * This code plots the Gibbs Free Energy function
 */

var width = 250;
var height = 120;

var xmin = 300E-9; // defining the x-axis: function undefined at 0
var xmax = 1;
var sample = 1000;

var R = 8.3145; // J/mol*K
var T = 273;    // K

function plotFunction(functionToPlot, xDomain, yRange, xScreenBoundary, yScreenBoundary) {
    var numSamples = 1000
    var x = d3.scale.linear().domain(xDomain).range(xScreenBoundary);
    var y = d3.scale.linear().domain(yRange).range(yScreenBoundary);

    var x1 = d3.scale.linear().domain([0, sample]).range(xDomain);
    var data = d3.range(numSamples).map(function (d) {
        return {
            x: x1(d),
            y: functionToPlot(x1(d))
        };
    });
    var line = d3.svg.line()
        .x(function (d) {
            return x(d.x);
        })
        .y(function (d) {
            return y(d.y);
        });
    return line(data);
}

function gibbs_of_mixing(x){    // this is the function you want plotted
    return R*T*(x*Math.log(x) + (1-x)*Math.log(1-x));
}

//var x1 = d3.scale.linear().domain([0, sample]).range([xmin, xmax]); // maps the domain to the range (makes an array: x1(350) = 0.5)
//var data = d3.range(sample).map(function(d){ return {
//    x: x1(d),
//    intensity: gibbs_of_mixing(x1(d))};   // creates the data (x is x, intensity is y, for each point in xmin to xmax)
//});
//
//var x = d3.scale.linear().domain([xmin, xmax]).range([450, 450+width]); // puts the graph in the correct place on the screen
//var y = d3.scale.linear().domain(d3.extent(data.map(function(d){return d.intensity;}))).range([30+height, 30]);
//
//var line = d3.svg.line()    // turns the data into a line object
//    .x(function(d) { return x(d.x); })
//    .y(function(d) { return y(d.intensity); })
//
//d3.select("#panelTwo").append("path").attr("d", line(data))     // puts the line in the correct panel
//    .attr("class", "curve2");

var intensityCurve = plotFunction(gibbs_of_mixing, [xmin, xmax], [-1573,0],[450, 450+width], [30+height, 30]);
d3.select("#panelTwo").append("path").attr("d", intensityCurve)     // puts the line in the correct panel
    .attr("class", "curve2");

var width2 = 250;
var height2 = 50;

var Tmin = 0; // defining the x-axis: function undefined at 0
var Tmax = 10;
//var sample = 1000;

function Gibbs_phase(T, S, b){
    S = typeof S !== 'undefined' ? S : 10;
    b = typeof b !== 'undefined' ? b : 10;
    return -S*T+b;
}

function Gibbs_phase2(T){    // this is the function you want plotted
    return Gibbs_phase(T, 25)
}




//var x1 = d3.scale.linear().domain([0, sample]).range([Tmin, Tmax]);
//var data = d3.range(sample).map(function(d){ return {
//    x: x1(d),
//    G: Gibbs_phase(x1(d))};   // creates the data (x is x, intensity is y, for each point in xmin to xmax)
//});
//
//var x = d3.scale.linear().domain([Tmin, Tmax]).range([175, 175+width2]); // puts the graph in the correct place on the screen
//var y = d3.scale.linear().domain(d3.extent(data.map(function(d){return d.G;}))).range([70+height2, 70]);
//
//var line = d3.svg.line()    // turns the data into a line object
//    .x(function(d) { return x(d.x); })
//    .y(function(d) { return y(d.G); })

//d3.select("#panelPtMass").append("path").attr("d", line(data))     // puts the line in the correct panel
//    .attr("class", "curve2");

var solidLine = plotFunction(Gibbs_phase, [Tmin, Tmax], [-100, 50], [175, 175+width2], [70+height2, 70]);

d3.select("#panelPtMass").append("path").attr("d", solidLine)     // puts the line in the correct panel
    .attr("class", "curve2");



var width3 = 275;
var height3 = 120;

var Tmin2 = 0; // defining the x-axis: function undefined at 0
var Tmax2 = 10;



//var x1 = d3.scale.linear().domain([0, sample]).range([Tmin2, Tmax2]);
//var data = d3.range(sample).map(function(d){ return {
//    x: x1(d),
//    G: Gibbs_phase2(x1(d))};   // creates the data (x is x, intensity is y, for each point in xmin to xmax)
//});
//
//var x = d3.scale.linear().domain([Tmin2, Tmax2]).range([300, 300+width3]); // puts the graph in the correct place on the screen
//var y = d3.scale.linear().domain(d3.extent(data.map(function(d){return d.G;}))).range([80+height3, 80]);
//
//var line = d3.svg.line()    // turns the data into a line object
//    .x(function(d) { return x(d.x); })
//    .y(function(d) { return y(d.G); })

//d3.select("#panelPtMass").append("path").attr("d", line(data))     // puts the line in the correct panel
//    .attr("class", "curve3");

var liquidDottedLine = plotFunction(Gibbs_phase2, [Tmin2, Tmax2], [-240,10],[300, 300+width3], [80+height3, 80]);
d3.select("#panelPtMass").append("path").attr("d", liquidDottedLine)     // puts the line in the correct panel
    .attr("class", "curve3");