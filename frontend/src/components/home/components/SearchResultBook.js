import React from "react";
import { useHistory } from "react-router-dom";
import listingAPI from "../../../tools/api/listingsAPI";
import getSuffixFromNumber from "../../../tools/react/getSuffixFromNumber";

/**
 * Renders a book with clickable links to get and create listings.
 * @param {Number} schoolId The ID for which to create the "get listings" link.
 * @param {Object} bookInfo The book data from the API response
 */
const SearchResultBook = ({schoolId, bookInfo}) => {
    const history = useHistory();

    const createListingHandler = () =>
        history.push(
            "/create-listing?bookId=" +
                bookInfo.id +
                "&schoolId=" +
                schoolId
        );

    const getListingsHandler = () => {
        listingAPI.postListingSearch(bookInfo.id, schoolId)
            .then(response => {
                console.log(response);
                history.push(
                    `/listings?bookId=${bookInfo.id}&schoolId=${schoolId}&searchId=${response.data.id}`
                );
            })
            .catch(err => console.log(err))

            history.push(
                "/listings?bookId=" + bookInfo.id + "&schoolId=" + schoolId
            );
            

    }

    return (
        <>
            <img className="booksearch-book-cover" src="https://via.placeholder.com/60x80" alt="Book Cover" />
            <div className="booksearch-book-info">
                <div className="booksearch-book-text title">{bookInfo.title}</div>
                <div className="booksearch-book-text subtitle">{bookInfo.subtitle}</div>
                <div className="booksearch-book-text edition">{bookInfo.edition}{getSuffixFromNumber(bookInfo.edition)} Edition</div>
                <div className="booksearch-book-text isbn">ISBN: {bookInfo.isbn13}</div>
                <div className="booksearch-book-text authors">Authors: {bookInfo.authors[0].first_name} {bookInfo.authors[0].last_name}</div>

            </div>
            <button className="booksearch-book-button sell" onClick={getListingsHandler}>Sell</button>
            <button className="booksearch-book-button find theme-background" onClick={createListingHandler}>Find</button>

        </>
    );
};

export default SearchResultBook;
