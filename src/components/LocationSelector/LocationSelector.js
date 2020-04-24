import React, { useState, useEffect, useRef } from 'react';

import './LocationSelector.css';

const LocationSelector = () => {

	const [selectorOpen, toggleSelectorOpen] = useState(false);
	const locationRef = useRef(null);

	const locations = [
		{id: 1, name: 'Chicago', isActive: false},
		{id: 2, name: 'Miami', isActive: false},
		{id: 3, name: 'Boston', isActive: true},
	]

	const dropdownLocations = () => {
		// dispatch clear active element but keep sort
		toggleSelectorOpen(true);
	}

	const selectLocation = () => {
		// dispatch update the current location
		toggleSelectorOpen(false);
	}

	const displayLocations = locations
		.map(location => {
			return (
				<div 
					key={location.id} 
					className={
						`location${location.isActive ? 
							' active' : 
							!selectorOpen ? 
								' hidden' : // inactive elements when selector is closed
								''
						}`}
					onClick={location.isActive ? dropdownLocations : selectLocation}>
					{ location.name }
				</div>
			)
		})
		.sort(location => location.isActive ? 1 : -1)

	useEffect(() => {
		const handleClick = (evt) => {

			try {
				if (!locationRef.current.contains(evt.target)) {
					toggleSelectorOpen(false);
				}
			}
			catch {
			}

		}
		window.addEventListener('click', handleClick);
		return () => window.removeEventListener('resize', handleClick);
	}, [])
	return (
		<div ref={locationRef} className="location-selector-container">
			{ displayLocations}
		</div>
	)
};

export default LocationSelector;
