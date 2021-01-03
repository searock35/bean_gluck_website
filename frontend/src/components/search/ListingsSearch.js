import React, { useState, useEffect } from 'react';
import Book from '../pieces/Book';
import { useLocation } from 'react-router-dom';
import booksAPI from '../../tools/api/booksAPI';
import listingsAPI from '../../tools/api/listingsAPI';
import ResultsListing from './components/ResultsListing';

// A list of listings that are based on the current school and book ID parameters

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const SchoolListings = (props) => {
    if (props.listings === "loading") {
        return (<p className="school-listings-loading">Loading...</p>)
    }
    else if (props.listings.length === 0) {
        return (<h2>It appears there are no listings for this book at this school. Check again later.</h2>)
    }
    const bookList = props.listings.map((listing) => (<li key={listing.id}><ResultsListing listing={listing} /></li>));
    return (<ul className="school-listings">
        {bookList}
    </ul>);
}


const BookResults = () => {

    const query = useQuery();
    const bookId = query.get("bookId")
    const schoolId = query.get("schoolId");

    const [bookInfo, setBookInfo] = useState({state: "loading"});
    const [schoolListingsResults, setSchoolListingsResults] = useState("loading")


    useEffect(() => {
        booksAPI.getBookFromId(bookId)
            .then((response) => setBookInfo({...response, state: "good"}))
            .catch((err) => setBookInfo({state: "error"}))
        listingsAPI.getSchoolListings(bookId, schoolId)
            .then(response => setSchoolListingsResults(response.data))
            .catch(err => console.log(err))
    }, [bookId, schoolId])


    return (    //Adding BS text
        <div>
            <div className="listings-book-header">
                <h1>Listings for: </h1>
                <Book bookInfo={bookInfo}></Book>
            </div>
            <SchoolListings listings={schoolListingsResults}/>
        </div>
    );
}

export default BookResults;