import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import SearchResultBook from "./SearchResultBook";
import BooksAPI from "../../../tools/api/booksAPI";

/**
 * An active book dropdown menu that lists books based off of a search string. The books provide links to
 * create new listings or get listings, provided a schoolId is provided to the dropdown.
 * @param {props} searchString The most up to date string in the search
 * @param {props} schoolId The current schoolId to be used for getting listings
 * @param {props} className The class of the dropdown (navbar or home)
 * @param {props} defaultSearchString The default string in the search bar.
 * @param {props} forceHide Forces the dropdown to close
 */
function BookDropDown({searchString, schoolId, className, defaultSearchString, forceHide}) {
    const history = useHistory();
    const [books, setBooks] = useState([])
    const [hideDropdown, setHideDropdown] = useState(true);

    
    useEffect(() => {
        let isMounted = 1;
        if (searchString && !(searchString === defaultSearchString)) {
            setHideDropdown(false);
            BooksAPI.getAutoComplete(searchString)
                .then((books) => isMounted && setBooks(books))
                .catch((err) => console.log(err));
        } else {
            setHideDropdown(true);
            setBooks([]);
        }

        return () => (isMounted = 0);
    }, [searchString, defaultSearchString]);

    const allBooks = books.map((book) => (
        <li className="booksearch-book" key={book.id}>
            <SearchResultBook bookInfo={book} schoolId={schoolId} />
        </li>
    ));

    const createBook = () => history.push("/book-create/");
    

    return (
        <div className={`book-search-dropdown ${className}`} hidden={forceHide || hideDropdown}>
            <ul className="booksearch-list">
                {allBooks}
                <li className="booksearch-add-book" onClick={createBook}>
                    <div className="plus-sign">+</div>
                    <div className="booksearch-add-text">Add an Unlisted Book</div>
                </li>
            </ul>
        </div>
    );
}

export default BookDropDown;
