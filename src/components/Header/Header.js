import React from 'react';
import HeaderInfo from '../HeaderInfo/HeaderInfo';
import PickLocation from '../PickLocation/PickLocation';

import './Header.css'


const Header = (props) => {
	const { pickLocationIcon } = props;
	return (
		<div className="header-container">
			<HeaderInfo />
			<PickLocation icon={pickLocationIcon}/>
		</div>
	);
}

export default Header;
