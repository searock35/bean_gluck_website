import React, { useState } from 'react';
//API's
import BooksAPI from '../../tools/api/booksAPI';
//Components
import Book from '../pieces/Book';

import "./BookSearchForm.css";

const defaultSearchString = 'Enter book ISBN, Title, Author';

function BookDropDown(props) {

    const allBooks = props.books.map( (book) => 
    <li className="book-drop-down-entry" key={book.id}>
        <Book bookInfo={book} clickable="true" />
    </li>
    )
    console.log(props.searchString)
    if(props.searchString === "" || props.searchString === defaultSearchString) {
        console.log("empty");
        return null;
    }
    return(
        <div className="form-group bookDropDown">
            <ul>{allBooks}</ul>
        </div>
    );
}

function BookSearchForm(props) {

    
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
            <div className="form-group book-search-bar">
                <input 
                    id="mainSearch"
                    className="form-control form-control-lg"
                    value={searchText}
                    name="name"
                    type="text"
                    onClick={(e) => (e.target.value===defaultSearchString) && setSearchText("")}
                    onChange={onChangeSearchText}
                />
                <BookDropDown books={bookList} searchString={searchText}/>
            </div>
            <div className="form-group search-options">
                Select your school: 
                <select name="school_select" className="school-selector">
                        <option value="messiah">Messiah University</option>
                        <option value="penn_state">Penn State University</option>
                    </select>
                    {/* Include Local Searches <input defaultChecked="checked" name="local" type="checkbox" value="daily" /> <br /> */}
                <br /><input id="form-submission" type="submit" value="Search" />
            </div>
        </form>
    )



}

export default BookSearchForm;