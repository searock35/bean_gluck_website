import React, { useState, useEffect } from 'react';
//API's
//Components
import Book from '../pieces/Book';

import axios from 'axios'
import BooksAPI from '../../tools/api/booksAPI'
import "./BookSearchForm.css";
import { useHistory } from 'react-router-dom';
import { Form } from 'react-bootstrap';

const defaultSearchString = 'Enter book ISBN, Title, Author';
const restURL = 'http://localhost:8080'

function BookDropDown(props) {

    const allBooks = props.books.map( (book) => 
    <li className="book-drop-down-entry" key={book.isbn}>
        <Book bookInfo={book} clickable="true" />
    </li>
    )

    const history = useHistory();
    const createBook = () => history.push("/book-create/");

    if(props.searchString === "" || props.searchString === defaultSearchString) {
        // console.log("empty");
        return null;
    }
    return(
        <div className="form-group bookDropDown">
            <ul>
                {allBooks}
                <li className='new-book-creator' onClick={createBook}>
                    Create a new listing.
                </li> 
            </ul>
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

    useEffect(() => {
        let isMounted = 1;
        if (searchText && !(searchText===defaultSearchString)) {

            BooksAPI.getAutoComplete(searchText)
                .then(books => isMounted && setBookList(books))
                .catch(err => console.log(err))
 
        } else setBookList([])
       
        return (() => isMounted = 0)
 
    }, [searchText])
        
    function onChangeSearchText(e) {
        setSearchText(e.target.value);
    };

    function SchoolSelectOption() {

        return (
            <Form.Group controlId="schoolSelect">
                <Form.Label>Select your school: </Form.Label>
                <Form.Control as="select">
                    <option value="messiah">Messiah University</option>
                    <option value="penn_state">Penn State University</option>
                </Form.Control>
            </Form.Group>
        )
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
            <SchoolSelectOption />
            <br /><input id="form-submission" type="submit" value="Search" />
       </form>
    )
}

export default BookSearchForm;