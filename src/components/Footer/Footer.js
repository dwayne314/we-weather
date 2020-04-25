import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getForecast } from '../../redux/selectors';

import './Footer.css';


const Footer = () => {

    const dayMap = {
        0: 'Sunday',
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6:'Saturday',
    };

    const [upcomingForecast, setUpcomingForecast] = useState([]);

    const forecast = useSelector(getForecast);

    const createFooter = upcomingForecast.map(prediction => {
        const dayOfWeek = new Date(prediction.date).getDay();
        return (
            <div key={dayOfWeek} className="footer-section">
                <div className="footer-section-text">
                    {dayMap[dayOfWeek]}
                </div>
                <div className="footer-section-temp">
                    {`${prediction.temp}°`}
                </div>
                <div className="footer-icon">
                    <img src={prediction.icon} alt={prediction.alt}></img>
                </div>
            </div>
        );
    });

    useEffect(() => {
        if (forecast) {
            setUpcomingForecast(forecast.forecast.slice(1, forecast.length))
        }
    }, [forecast]);

    return (
        <div className="footer-container">
        	{ createFooter }
        </div>
    );
};

export default Footer;
