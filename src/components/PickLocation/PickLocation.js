import React from 'react';
import { useDispatch } from 'react-redux';
import { togglePage } from '../../redux/actions';

import './PickLocation.css';


const PickLocation = (props) => {
	const { icon } = props;
	const isMobile = true;
	const dispatch = useDispatch();

	const togglePickLocation = () => {
		dispatch(togglePage())
	}

	return isMobile ? (
		<div onClick={togglePickLocation} className="pick-location-container mobile-picker">
			<div className="mobile-pick-location-icon"> {icon} </div>
		</div>
	) : (
		<div onClick={togglePickLocation} className="pick-location-container desktop-picker">
			<div className="pick-location-text">
				Change Location
			</div>
		</div>
	)
};

export default PickLocation;
