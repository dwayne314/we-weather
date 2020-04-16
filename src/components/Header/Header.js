import React from 'react';
import HeaderInfo from '../HeaderInfo/HeaderInfo';
import PickLocation from '../PickLocation/PickLocation';

import './Header.css'


const Header = () => {
	return (
		<div className="header-container">
			<HeaderInfo />
			<PickLocation />
		</div>
	);
}

export default Header;
