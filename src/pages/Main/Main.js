import React from 'react';
import App from '../../components/App/App';
import Body from '../../components/Body/Body';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';


const Main = () => {
    return (
        <div className="main-container">
            <Header />
            <Body />
            <Footer />
        </div>
    )
}

export default Main;
