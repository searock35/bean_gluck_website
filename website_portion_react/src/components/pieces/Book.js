import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../tools/react/UserContext';



//the book item will recieve the information from the database as props.bookInfo
//props: bookInfo = {title, author, edition, id, amount}
//       clickable = "true" : book will link to search, DEFAULT is FALSE

function Book(props) {

    const history = useHistory();
    const bookInfo = props.bookInfo;
    const userInfo = useContext(UserContext);

    var linkHandler;
    if(props.clickable === "true") {
        //redirects user to book search page with bookID and schoolID in saerch criteria
        linkHandler = (bookId) => history.push("/book-search?bookId=" + bookId + "&schoolId=" + userInfo.schoolId);
    } else {
        linkHandler = () => (0)
    }

    let idMessage = "";
    if(bookInfo.isbn.length < 10 || bookInfo.idIsCustom) {
        idMessage = "ID: " + bookInfo.isbn;
    } else {
        idMessage = "ISBN: " + bookInfo.isbn;
    }

    let amountMessage = "Listings: ";
    if(bookInfo.amount) amountMessage += bookInfo.amount;
    else amountMessage+="None";
    
    return (
    <ul className="book-info" onClick={() => linkHandler(bookInfo.isbn)}>
        <li className="book-title">Title: {bookInfo.title}</li>
        <li className="book-edition">Edition: {bookInfo.edition}</li>
        <li className="book-author">Book Author: {bookInfo.author}</li>
        {/* Add "not available" option if book ID is other format for different book type */}
        <li className="book-id">{idMessage}</li> 
        <li className="book-amount">{amountMessage}</li>
    </ul>
    )


}

export default Book;