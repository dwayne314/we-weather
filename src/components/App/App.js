import React from 'react';
import { useSelector } from 'react-redux';
import { getPage } from '../../redux/selectors';
import Search from '../../pages/Search/Search';
import Main from '../../pages/Main/Main';


import './App.css';


const App = () => {
	const page = useSelector(getPage)

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

