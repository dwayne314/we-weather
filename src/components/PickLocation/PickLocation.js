import React from 'react';

import './PickLocation.css';


const PickLocation = (props) => {
	const { icon } = props;
	const isMobile = true;

	const togglePickLocation = () => {
		console.log('toggling pick location')
	}

	return isMobile ? (
		<div onClick={togglePickLocation} className="pick-location-container mobile-picker">
			<div className="mobile-pick-location-icon"> {icon} </div>
		</div>
	) : (
		<div onClick={togglePickLocation} className="pick-location-container">
			<div className="pick-location-text">
				Change Location
			</div>
		</div>
	)
};

export default PickLocation;
