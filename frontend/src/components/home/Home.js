import React, { useContext } from 'react';
import UserContext from '../../tools/react/UserContext';
import HomeSearchForm from './HomeSearchForm';


function Home() {
    const currentUser = useContext(UserContext);


    
    return (
        <div className="home-container w-container">
            <div className="home-page-header-container">
                <h2 className="home-page-main-header">TextTrader for {currentUser.school_name}</h2>
                <h3 className="home-page-sug-header">Sell, Buy, and Rent books and other resources from your peers on campus!</h3>
            </div>
            <HomeSearchForm schoolId={currentUser.school_id}/>
        </div>
    )
}

export default Home;