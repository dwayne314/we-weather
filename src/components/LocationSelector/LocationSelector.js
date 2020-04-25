import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentLocation } from '../../redux/actions';
import { getLocations, getCurrentLocation } from '../../redux/selectors';

import './LocationSelector.css';

const LocationSelector = () => {

	const [selectorOpen, toggleSelectorOpen] = useState(false);
	const locationRef = useRef(null);
	const dispatch = useDispatch();
	const locations = useSelector(getLocations);
	const currentLocation = useSelector(getCurrentLocation);

	const dropdownLocations = (evt) => {
		toggleSelectorOpen(true);
	}

	const selectLocation = (id) => {
		if (id !== currentLocation.id) dispatch(updateCurrentLocation(id));
		toggleSelectorOpen(false);
	}

	const displayLocations = locations
		.sort(location => location.id === currentLocation.id ? -1 : 1)	
		.map(location => {
			return (
				<div 
					key={location.id} 
					className={
						`location${(location.id === currentLocation.id && selectorOpen === false) ? 
							' active' : // active locations active when selector is closed
							!selectorOpen ? 
								' hidden' : // inactive locations hidden when selector is closed
								''
						}`}
					onClick={
						(location.id === currentLocation.id && selectorOpen === false) ? 
							dropdownLocations : 
							selectLocation.bind(this, location.id)}
				>
					<span className="location-text">
						{ location.city }
					</span>
				</div>
			);
		});

	useEffect(() => {
		const handleClick = (evt) => {

			try {
				if (!locationRef.current.contains(evt.target)) {
					toggleSelectorOpen(false);
				}
			}
			catch {}
		}
		window.addEventListener('click', handleClick);
		return () => window.removeEventListener('resize', handleClick);
	}, []);

	return (
		<div ref={locationRef} className="location-selector-container">
			{ displayLocations}
		</div>
	);
};

export default LocationSelector;
