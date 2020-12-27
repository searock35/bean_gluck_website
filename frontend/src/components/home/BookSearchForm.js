import React, { useState, useEffect } from 'react';
import BooksAPI from '../../tools/api/booksAPI';
import GeneralAPI from '../../tools/api/generalAPI';
import "./BookSearchForm.css";
import { Alert } from 'react-bootstrap';
import SchoolSelectOption from '../pieces/SchoolSelectOption';
import BookDropDown from './components/BookDropDown';
import authAPI from '../../tools/api/authAPI';

const defaultSearchString = 'Enter book ISBN, Title, Author';

function BookSearchForm(props) {

    const [searchText, setSearchText] = useState(defaultSearchString); 
    const [schoolId, setSchoolId] = useState(authAPI.currentUser.school_id);
    const [schools, setSchools] = useState([{id: 0, name: 'Loading...'}]);
    const [bookList, setBookList] = useState([]);  
    const [noSchoolAlert, setNoSchoolAlert] = useState(false);

    const onSearchSubmit = (e) => {
        if (!schoolId) setNoSchoolAlert(true);
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
        let isMounted = true
        GeneralAPI.getSchoolsBasic()
        .then(school_list => isMounted && setSchools(school_list))
        
        .catch(err => console.log(err))

        return (() => isMounted = false)
    }, [])
        
    function onChangeSearchText(e) {
        setSearchText(e.target.value);
    };

    function schoolChange(e) {
        setSchoolId(e.target.value);
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
                <BookDropDown books={bookList} schoolId={schoolId}/> 
            </div>
            <SchoolSelectOption schools={schools} onChangeCB={schoolChange} label="Select your school" value={schoolId}/>
            <br /><input id="form-submission" type="submit" value="Search" />
            {noSchoolAlert && (<Alert variant="warning">Please select a school.</Alert>)}
       </form>
    )
}

export default BookSearchForm;