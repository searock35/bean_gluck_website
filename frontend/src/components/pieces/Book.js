import React from 'react';
import { useHistory } from 'react-router-dom';

function Book(props) {

    const history = useHistory();
    const bookInfo = props.bookInfo;
    const schoolId = props.schoolId;

    //redirects user to book search page with bookID and schoolID in search criteria
    const createListingHandler = () => history.push("/create-listing?bookId=" + bookInfo.id + "&schoolId=" + schoolId);
    const getListingsHandler = () => history.push("/listings?bookId=" + bookInfo.id + "&schoolId=" + schoolId);

    let idMessage = "";
    if (bookInfo.idIsCustom) {
        idMessage = "ID: " + bookInfo.isbn;
    } else {
        idMessage = "ISBN: " + bookInfo.isbn;
    }

    // let amountMessage = "Listings: ";
    // if (bookInfo.amount) amountMessage += bookInfo.amount;
    // else amountMessage += "None";
    console.log(bookInfo)
    let author = "Not Listed"
    if (bookInfo.authors[0]) {
        author = bookInfo.authors[0]
    }
    
    return (
        <ul className="book-info">
            <li className="book-title">Title: {bookInfo.title}</li>
            <li className="book-edition">Edition: {bookInfo.edition}</li>
            <li className="book-author">Book Author: {author}</li>
            <li className="book-id">{idMessage}</li> 
            {/* <li className="book-amount">{amountMessage}</li> */}

            {props.clickable &&
                <div className="clickable-items">
                    <li className="get-book-listings" onClick={props.clickable && getListingsHandler}>Get Listings</li>
                    <li className="create-book-listing" onClick={props.clickable && createListingHandler}>Create Listing</li>
                </div>
            }

        </ul>
    )


}

export default Book;