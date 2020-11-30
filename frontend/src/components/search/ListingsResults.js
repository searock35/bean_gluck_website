import React, { useState, useEffect } from 'react';
import Book from '../pieces/Book';
import { useLocation } from 'react-router-dom';
import booksAPI from '../../tools/api/booksAPI';
import listingsAPI from '../../tools/api/listingsAPI';
import Listing from './components/Listing';

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  //props: bookInfo = {title, author, edition, id, amount}
const BookResults = () => {
    
    const query = useQuery();
    const bookId = query.get("bookId")
    const schoolId = query.get("schoolId");

    const loadingString = "Loading..."
    const [bookInfo, setBookInfo] = useState({title: loadingString});

    useEffect(() => {
        booksAPI.getBookFromId(bookId)
        .then((response) => setBookInfo(response.data))
        .catch((err) => setBookInfo({error: err}))
    }, [bookId])
    
        const LocalListings = () => {
            let listings;
            listingsAPI.getLocalListings(bookId)
                            .then(returned_listings => listings = returned_listings)
                            .catch(error => {
                                console.log(error)
                                listings = []
                            })

            const listingsList = listings.map((listing) => (<li key={listing.listingId}><Listing {...listing} /></li>));
            
            return (<ul className="local-listings">
                {listingsList}
            </ul>);
        }

        const SchoolListings = () => {
            let listings = [];
            listingsAPI.getSchoolListings(bookId, schoolId)
                .then(ret => listings = ret)
                .catch(error =>
                    console.log(error)
                )

            const bookList = listings.map((listing) => (<li key={listing.id}><Listing {...listing} /></li>));

            return (<ul className="school-listings">
                {bookList}
            </ul>);
        }

    return (    //Adding BS text
        <div>
            <div className="listings-book-header">
                <h1>Listings for: </h1>
                <Book bookInfo={bookInfo}></Book>
            </div>
            <h1>School Listings:</h1>
            <SchoolListings/>
            <h1>Local Listings:</h1>
            <LocalListings/>
        </div>
    );
}

export default BookResults;