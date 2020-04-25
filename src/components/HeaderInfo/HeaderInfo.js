import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getForecast } from '../../redux/selectors';

import './HeaderInfo.css';


const HeaderInfo = () => {
	const [todaysTemp, setTodaysTemp] = useState('');
	const [todaysStatus, setTodaysStatus]= useState('');
	const [forecastLocation, setForecastLocation]= useState('');

	const forecast = useSelector(getForecast);

	useEffect(() => {
		if (forecast) {
			const {weatherPattern, temp } = forecast.forecast[0];
			setTodaysTemp(temp);
			setTodaysStatus(weatherPattern);
			setForecastLocation(`${forecast.city}, ${forecast.state}`);
		};

	}, [forecast])
	return (
		<div className="header-info-container">
			<div className="header-info-content">
				<div className="header-info-temp">
					{`${todaysTemp}°`}
				</div>
				<div className="header-info-status">
					{`${todaysStatus}`}
				</div>
				<div className="header-info-location">
					{forecastLocation}
				</div>
			</div>
		</div>
	);
};

export default HeaderInfo;
