import React, { useState, useEffect } from 'react';
import Book from '../pieces/Book';

import BooksAPI from '../../tools/api/booksAPI'
import GeneralAPI from '../../tools/api/generalAPI'
import "./BookSearchForm.css";
import { useHistory } from 'react-router-dom';
import { Form } from 'react-bootstrap';

const defaultSearchString = 'Enter book ISBN, Title, Author';

function BookDropDown(props) {

    const allBooks = props.books.map( (book) => 
    <li className="book-drop-down-entry" key={book.isbn}>
        <Book bookInfo={book} schoolId={props.schoolId} clickable="true" />
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
    const [schoolId, setSchoolId] = useState();
    const [schools, setSchools] = useState([{id: 0, name: 'Loading...'}]);
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

    useEffect(() => {
        console.log("Mounted!");
        GeneralAPI.getSchoolsBasic()
        .then(school_list => setSchools(school_list))
        
        .catch(err => console.log(err))
    }, [])
        
    function onChangeSearchText(e) {
        setSearchText(e.target.value);
    };

    function schoolChange(e) {
        setSchoolId(e.target.value);
    }

    function SchoolSelectOption(props) {
        let options = props.schools.map((school) => {
            return <option value={school.id} key={school.id}>{school.name}</option>
        })

        return (
            <Form.Group controlId="schoolSelect">
                <Form.Label>Select your school: </Form.Label>
                <Form.Control as="select" onChange={schoolChange}>
                    {options}
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
                <BookDropDown books={bookList} schoolId={schoolId} searchString={searchText}/>
            </div>
            <SchoolSelectOption schools={schools}/>
            <br /><input id="form-submission" type="submit" value="Search" />
       </form>
    )
}

export default BookSearchForm;