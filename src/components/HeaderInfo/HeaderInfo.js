import React, { useEffect } from 'react';

import './HeaderInfo.css';


const HeaderInfo = () => {
	useEffect(() => {
		let headerDegree = 0;
		const initializeTimer = () => {
			const elem = document.getElementsByClassName('header-info-timer')[0];
			headerDegree = headerDegree + (360 / 60);
			elem.style.transform = `rotate(${headerDegree}deg)`;
		}
		window.setInterval(initializeTimer, 500);

		return () => {
			window.clearInterval(initializeTimer, 500);
		}
	}, []);

	return (
		<div className="header-info-container">
			<div className="header-info-content">
				<div className="header-info-temp">
					75°
				</div>
				<div className="header-info-status">
					Windy
				</div>
				<div className="header-info-location">
					Chicago, IL
				</div>
			<span className="header-info-timer">
				<span className="timer-circle"></span>
			</span>
			</div>
		</div>
	);
};

export default HeaderInfo;
