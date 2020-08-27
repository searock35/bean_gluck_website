import React, { useState } from 'react';
//API's
import BooksAPI from '../common/books';
//Components
import Book from '../common/Book';

function BookDropDown(props) {

    const allBooks = props.books.map( (book) => 
    <li className="book-drop-down-entry" key={book.id}>
        <Book bookInfo={book} />
    </li>
    )

    return(<ul>{allBooks}</ul>);
}

function BookSearchForm(props) {

    const defaultSearchString = 'Enter book ISBN, Title, Author';
    const [searchText, setSearchText] = useState(defaultSearchString); 
    const [bookList, setBookList] = useState([]);  

    const onSearchSubmit = (e) => {
        console.log("form submitted");
        e.preventDefault();
    }
        
    function onChangeSearchText(e) {
        setSearchText(e.target.value);

        //sets state of book list from result by Books API
        setBookList(BooksAPI.getAutoComplete(e.target.value));
    }

    return (
        <form onSubmit={onSearchSubmit}>
            <div id="book-search-bar" className="form-group"><label>Book Title/ISBN:</label>
                <input 
                    id="mainSearch"
                    className="form-control form-control-lg"
                    value={searchText}
                    name="name"
                    type="text"
                    onClick={(e) => (e.target.value===defaultSearchString) && setSearchText("")}
                    onChange={onChangeSearchText}
                />
            </div>
            <div className="form-group bookDropDown">
                <BookDropDown books={bookList} />
            </div>
            <div className="form-group">
                Select your school:
                <select name="school_select">
                        <option value="messiah">Messiah University</option>
                        <option value="penn_state">Penn State University</option>
                    </select>
                <input defaultChecked="checked" name="local" type="checkbox" value="daily" /> Include Local Searches <br />
                <input id="form-submission" type="submit" value="Search" />
            </div>
        </form>
    )



}

export default BookSearchForm;