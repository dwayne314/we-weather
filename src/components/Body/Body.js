import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import * as d3 from 'd3';
import { getForecast } from '../../redux/selectors';

import './Body.css';


const Body = () => {
	const futureTempLength = 5;
	const [offsetWidth, setOffsetWidth] = useState(0);
	const [offsetHeight, setOffsetHeight] = useState(0);
	const [tempData, setTempData] = useState([]);
	const forecast = useSelector(getForecast);

	const getWidth = () => document.getElementsByClassName('body-container')[0].offsetWidth;
	const getHeight = () => document.getElementsByClassName('body-container')[0].offsetHeight;

	const clearChart = () => {
		const chartContainer = document.getElementById('line-chart');
		chartContainer.innerHTML = "";
	}

	const generateChart = useCallback(() => {
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
		const forecastedTemps = tempData.slice(1, tempData.length);
		const bodyHeight = offsetHeight - margin.getTotalTop();
		const bodyWidth = offsetWidth - margin.getTotalSide();
		const minTemp = forecastedTemps.reduce((acc, temp) => Math.min(temp, acc) ,+Infinity);
		const maxTemp = forecastedTemps.reduce((acc, temp) => Math.max(temp, acc) ,-Infinity);

		const yScale = d3.scaleLinear()
		    .domain([minTemp, maxTemp])
		    .range([bodyHeight, margin.top]);

		const xScale = d3.scaleLinear()
		    .domain([0, futureTempLength-1])
		    .range([0, bodyWidth]);

		const line = d3.line()
		    .x(function(d, i) { return xScale(i) })
		    .y(function(d) { return yScale(d) });

		const svg = d3.select("#line-chart").append("svg")
		    .attr("width", bodyWidth + margin.getTotalSide())
		    .attr("height", bodyHeight + margin.getTotalTop())
		    .append("g")
		        .attr("transform", "translate(" + margin.left + ",0)");

		svg.append("path")
		    .datum(forecastedTemps) 
		    .attr("d", line)
		    .attr("stroke", "black")
		    .attr("stroke-width", 3)
		    .attr("fill", "none");

		svg.selectAll(".chart-dot")
		    .data(forecastedTemps)
		    .enter()
		        .append("circle")
		        .attr("cx", function(d, i) { return xScale(i) })
		        .attr("cy", function(d) { return yScale(d) })
    		    .attr("r", 5);

		svg.selectAll(".chart-text")
		    .data(forecastedTemps)
		    .enter()
		        .append("text")
		        .text(function(d) { return d + '°'})    
		        .attr('x',function(d, i) { return xScale(i) })
		        .attr("y", function(d) { return yScale(d) - 15 })    
		        .attr('text-anchor', 'middle');
	}, [tempData, offsetHeight, offsetWidth]);

	useEffect(() => {
		if (forecast) {
			const temps = forecast.forecast.reduce((acc, day) => acc.concat(day.temp), []);
			setTempData(temps);
		}
	}, [forecast]);


	useEffect(() => {
		const resizeListener = () => {
			setOffsetWidth(getWidth());
			setOffsetHeight(getHeight());
		};
		window.addEventListener('resize', resizeListener);

		return () => window.removeEventListener('resize', resizeListener);
			
	}, [setOffsetWidth, setOffsetHeight]);

	useEffect(() => {
		clearChart();
		setOffsetWidth(getWidth());
		setOffsetHeight(getHeight());
		generateChart();

	}, [tempData, setOffsetWidth, setOffsetHeight, generateChart]);
    return (
        <div className="body-container">
        	<div id="line-chart"></div>
        </div>
    );
};

export default Body;
