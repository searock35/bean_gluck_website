import React from "react";
import { useHistory } from "react-router-dom";
import SearchResultBook from "./SearchResultBook";

/**
 * A book dropdown menu that lists books based off of a book list. The books provide links to
 * create new listings or get listings, provided a schoolId is provided to the dropdown.
 * @param {props} books A list of books from the server
 * @param {props} schoolId The current schoolId to be used for getting listings
 */
function BookDropDown(props) {
    const history = useHistory();

    const allBooks = props.books.map((book) => (
        <li className="book-drop-down-entry" key={book.isbn}>
            <SearchResultBook bookInfo={book} schoolId={props.schoolId} />
        </li>
    ));

    const createBook = () => history.push("/book-create/");

    if (props.hide) {
        return null;
    }

    return (
        <div className="form-group bookDropDown">
            <ul>
                {allBooks}
                <li className="new-book-creator" onClick={createBook}>
                    Create a new book.
                </li>
            </ul>
        </div>
    );
}

export default BookDropDown;
