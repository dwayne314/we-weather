import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPage, getCurrentLocation } from '../../redux/selectors';
import { fetchForecast } from '../../redux/actions';
import Search from '../../pages/Search/Search';
import Main from '../../pages/Main/Main';

import './App.css';


const App = () => {
	const page = useSelector(getPage);
	const dispatch = useDispatch();
	const currentLocation = useSelector(getCurrentLocation);

	// Updates forecast only on a page refresh or location change
	useEffect(() => {
		fetchForecast(currentLocation.name)(dispatch);
	}, [currentLocation.name, dispatch])
    return (
        <div className="app-container">
            {page === 'Home' ? 
            	<Main /> :
            	<Search />
            } 
        </div>
    )
};

export default App;

