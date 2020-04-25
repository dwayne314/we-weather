import React from 'react';
import Body from '../../components/Body/Body';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import addBtn from '../../static/icons/add_button.svg';


const Main = () => {
    return (
        <div className="main-container">
            <Header pickLocationIcon={addBtn} />
            <Body />
            <Footer />
        </div>
    )
}

export default Main;
