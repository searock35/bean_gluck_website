import React from 'react';
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

    const bookId = query.get("bookId");
    
        const LocalListings = () => {
            let books;
            listingsAPI.getLocalListings(bookId, "1")
                            .then(returned_book => books = returned_book)
                            .catch(error => {
                                console.log(error)
                                books = []
                            })

            const bookList = books.map((value) => (<li key={value.listingId}><Listing {...value} /></li>));
            
            return (<ul className="local-listings">
                {bookList}
            </ul>);
        }

    return (    //Adding BS text
        <div>
            <div className="listings-book-header">
                <h1>Listings for: </h1>
                <Book bookInfo={booksAPI.getBookFromId(bookId)}></Book>
            </div>
            <h1>Local Listings:</h1>
            <LocalListings/>
        </div>
    );
}

export default BookResults;