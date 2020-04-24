import React from 'react';

import './HeaderInfo.css';


const HeaderInfo = () => {

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
			</div>
		</div>
	);
};

export default HeaderInfo;
