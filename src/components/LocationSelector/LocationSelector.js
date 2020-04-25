import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentLocation } from '../../redux/actions';
import { getLocations, getCurrentLocationId } from '../../redux/selectors';

import './LocationSelector.css';

const LocationSelector = () => {

	const [selectorOpen, toggleSelectorOpen] = useState(false);
	const locationRef = useRef(null);
	const dispatch = useDispatch();
	const locations = useSelector(getLocations);
	const currentLocationId = useSelector(getCurrentLocationId);

	const dropdownLocations = (evt) => {
		toggleSelectorOpen(true);
	}

	const selectLocation = (id) => {
		if (id !== currentLocationId) dispatch(updateCurrentLocation(id));
		toggleSelectorOpen(false);
	}

	const displayLocations = locations
		.sort(location => location.id === currentLocationId ? -1 : 1)	
		.map(location => {
			return (
				<div 
					key={location.id} 
					className={
						`location${(location.id === currentLocationId && selectorOpen === false) ? 
							' active' : // active locations active when selector is closed
							!selectorOpen ? 
								' hidden' : // inactive locations hidden when selector is closed
								''
						}`}
					onClick={
						(location.id === currentLocationId && selectorOpen === false) ? 
							dropdownLocations : 
							selectLocation.bind(this, location.id)}
				>
					<span className="location-text">
						{ location.name }
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