import React from "react";
import { useHistory } from "react-router-dom";
import Book from "../../pieces/Book";

/**
 * Renders a book with clickable links to get and create listings.
 * @param {Number} schoolId The ID for which to create the "get listings" link.
 * @param {Object} bookInfo The book data from the API response
 */
const SearchResultBook = (props) => {
    const history = useHistory();
    const schoolId = props.schoolId;

    const createListingHandler = () =>
        history.push(
            "/create-listing?bookId=" +
                props.bookInfo.id +
                "&schoolId=" +
                schoolId
        );
    const getListingsHandler = () =>
        history.push(
            "/listings?bookId=" + props.bookInfo.id + "&schoolId=" + schoolId
        );

    return (
        <div>
            <Book {...props} />

            <ul className="clickable-items">
                {schoolId !== 0 ? (
                    <li
                        className="get-book-listings"
                        onClick={getListingsHandler}
                    >
                        Get Listings
                    </li>
                ) : (
                    <li className="get-book-listings-disabled">
                        Please select a school to get listings for this item.
                    </li>
                )}
                <li
                    className="create-book-listing"
                    onClick={createListingHandler}
                >
                    Create Listing
                </li>
            </ul>
        </div>
    );
};

export default SearchResultBook;
