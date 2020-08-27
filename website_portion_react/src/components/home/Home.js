import React from 'react';
//Style
import './HomeStyle.css';
//Components
import BookSearchForm from './BookSearchForm';
//Dependencies


function Home() {

    
    return (
        <div className="container">
            <h2>Your one stop shop for buying and selling books, <em>on campus!</em></h2>

            <BookSearchForm />

        </div>
    )
}

export default Home;