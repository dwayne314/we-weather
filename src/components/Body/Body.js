import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import './Body.css';


const Body = () => {
	const futureTempLength = 5;
	let [offsetWidth, setOffsetWidth] = useState(0);
	let [offsetHeight, setOffsetHeight] = useState(0);


	const temps = [
		{id: 0, temp: 60, pattern: 'Windy'},
		{id: 1, temp: 60, pattern: 'Windy'},
		{id: 2, temp: 70, pattern: 'Windy'},
		{id: 3, temp: 65, pattern: 'Windy'},
		{id: 4, temp: 63, pattern: 'Windy'},
		{id: 5, temp: 78, pattern: 'Windy'},
	]
	const getWidth = () => document.getElementsByClassName('body-container')[0].offsetWidth;
	const getHeight = () => document.getElementsByClassName('body-container')[0].offsetHeight;

	const clearChart = () => {
		const chartContainer = document.getElementById('line-chart');
		chartContainer.innerHTML = "";

	}


	useEffect(() => {
		const resizeListener = () => {
			setOffsetWidth(getWidth());
			setOffsetHeight(getHeight());
		}
		window.addEventListener('resize', resizeListener);

		return () => window.removeEventListener('resize', resizeListener);
			
	}, [setOffsetWidth, setOffsetHeight])

	useEffect(() => {
		clearChart();
		setOffsetWidth(getWidth());
		setOffsetHeight(getHeight());

		// left and right margin should come from the footer width / 5
		const margin = {
			top: 50, 
			right: 50, 
			bottom: 20, 
			left: 50,
			getTotalSide: function () {
				return this.left + this.right;
			} ,
			getTotalTop: function () {
				return this.top + this.bottom;
			} 
		};		

		const futureTemps = temps.splice(1, temps.length);

		const bodyHeight = offsetHeight - margin.getTotalTop();
		const bodyWidth = offsetWidth - margin.getTotalSide();
		const minTemp = futureTemps.reduce((acc, data) => Math.min(acc, data.temp), +Infinity);
		const maxTemp = futureTemps.reduce((acc, data) => Math.max(acc, data.temp), -Infinity);
		
		const yScale = d3.scaleLinear()
		    .domain([minTemp, maxTemp])
		    .range([bodyHeight, margin.top]);

		const xScale = d3.scaleLinear()
		    .domain([0, futureTempLength-1])
		    .range([0, bodyWidth]);

		const line = d3.line()
		    .x(function(d, i) { return xScale(i) })
		    .y(function(d) { return yScale(d.temp) });

		const svg = d3.select("#line-chart").append("svg")
		    .attr("width", bodyWidth + margin.getTotalSide())
		    .attr("height", bodyHeight + margin.getTotalTop())
		    .append("g")
		        .attr("transform", "translate(" + margin.left + ",0)");

		svg.append("path")
		    .datum(futureTemps) 
		    .attr("d", line)
		    .attr("stroke", "black")
		    .attr("stroke-width", 3)
		    .attr("fill", "none");

		svg.selectAll(".chart-dot")
		    .data(futureTemps)
		    .enter()
		        .append("circle")
		        .attr("cx", function(d, i) { return xScale(i) })
		        .attr("cy", function(d) { return yScale(d.temp) })
    		    .attr("r", 5);

		svg.selectAll(".chart-text")
		    .data(futureTemps)
		    .enter()
		        .append("text")
		        .text(function(d) { return d.temp + '°'})    
		        .attr('x',function(d, i) { return xScale(i) })
		        .attr("y", function(d) { return yScale(d.temp) - 15 })    
		        .attr('text-anchor', 'middle');
	})
    return (
        <div className="body-container">
        	<div id="line-chart"></div>
        </div>
    );
};

export default Body;
