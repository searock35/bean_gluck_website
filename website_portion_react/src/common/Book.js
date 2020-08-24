import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../user/UserContext';



//the book item will recieve the information from the database as props.bookInfo
function Book(props) {

    const history = useHistory();
    const bookInfo = props.bookInfo;
    const userInfo = useContext(UserContext);

    //redirects user to book search page with bookID as the 
    const linkHandler = (bookId) => history.push("/book-search/?book-Id=" + bookId + "&school-Id=" + userInfo.schoolId);

    let idMessage = "";
    if(bookInfo.id.length < 10 || bookInfo.idIsCustom) {
        idMessage = "ID: " + bookInfo.id;
    } else {
        idMessage = "ISBN: " + bookInfo.id;
    }

    let amountMessage = "Listings: ";
    if(bookInfo.amount) amountMessage += bookInfo.amount;
    else amountMessage+="None";
    
    return (
    <ul className="book-info" onClick={() => linkHandler(bookInfo.id)}>
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