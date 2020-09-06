import React from 'react';
import Book from '../common/Book';
import { useLocation } from 'react-router-dom';
import booksAPI from '../common/booksAPI';

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  //props: bookInfo = {title, author, edition, id, amount}
const BookResults = () => {
    
    const query = useQuery();

    const bookId = query.get("bookId");
    console.log(bookId);
    console.log(booksAPI.getBookFromId(bookId));

    //make api call using search info
    
    return (
        <div>
            <h1>Listings for: </h1>
            <Book bookInfo={booksAPI.getBookFromId(bookId)}></Book>
        </div>
    );
}

export default BookResults;