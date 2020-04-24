import React from 'react';
import PickLocation from '../../components/PickLocation/PickLocation';
import LocationSelector from '../../components/LocationSelector/LocationSelector';
import './Search.css';


const Search = () => {
	return (
		<div className="search-container">
			<PickLocation icon={'X'} />

			<form className="search-form">
				<div className="form-input-container">
					<span className="form-text">Current City </span> 
					<LocationSelector />
				</div>
			</form>
		</div>
	);
}

export default Search;
