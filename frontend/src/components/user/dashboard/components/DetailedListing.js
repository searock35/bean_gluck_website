import React, { useEffect, useState } from 'react';
import BooksAPI from '../../../../tools/api/booksAPI'

/**
 * A listing, given the book Id will discover information about the book.
 */
function DetailedListing(props) {
    const book_id = props.book
    // {"id":3,         "owner":{"user":{"id":5,"first_name":"Corey","last_name":"Bean"},"school":1,"locality":1,"grad_year":2021,"major":[1,2]},
    // "school_name":"Messiah University","book":3,"condition":"vg","purchase_price":"30.52","rental_price":"20.10"}
    const [book, setBook] = useState({ title: "Loading..." })

    useEffect(() => {
        let isMounted = true

        console.log("Getting book with id from listing", book_id);
        BooksAPI.getBookFromId(book_id)
            .then(book => isMounted && setBook(book))
            .catch(err => isMounted && setBook({ title: "Server error." }))
        return (() => isMounted = false)
    }, [book_id])


    return (
        <div>
            <ul>
                <li>Book: {book.title}</li>
                <li>School: {props.school_name}</li>
                <li>Condition: {props.condition_display}</li>
                <li>Rental Price: ${props.rental_price}</li>
                <li>Purchase Price: ${props.purchase_price}</li>
            </ul>
        </div>
    )

}


export default DetailedListing;
