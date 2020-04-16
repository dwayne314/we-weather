import React from 'react';

import './PickLocation.css';


const PickLocation = () => {
	const isMobile = true;

	return isMobile ? (
		<div className="pick-location-container mobile-picker">
			<div className="mobile-pick-location-icon"> + </div>
		</div>
	) : (
		<div className="pick-location-container">
			<div className="pick-location-text">
				Change Location
			</div>
		</div>
	)
};

export default PickLocation;
