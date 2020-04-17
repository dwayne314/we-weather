import React from 'react';
import PickLocation from '../../components/PickLocation/PickLocation';

import './Search.css';


const Search = () => {
	return (
		<div className="search-container">
			<PickLocation icon={'X'} />

			<form className="search-form">
				<div className="form-label-container">
					<label htmlFor="search">Search Location</label>
				</div>
				<div className="form-input-container">
					<input id="search" type="text"></input>
				</div>
			</form>
		</div>
	);
}

export default Search;
