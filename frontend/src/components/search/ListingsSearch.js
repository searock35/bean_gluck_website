import React, { useState, useEffect } from "react";
import Book from "../pieces/Book";
import { useLocation } from "react-router-dom";
import booksAPI from "../../tools/api/booksAPI";
import listingsAPI from "../../tools/api/listingsAPI";
import ResultsListing from "./components/ResultsListing";
import { Button } from "react-bootstrap";
import ResponseStatusAlert from "../pieces/ResponseStatusAlert";
import generalAPI from "../../tools/api/generalAPI";

// A list of listings that are based on the current school and book ID parameters

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const SchoolListings = (props) => {
    const query = useQuery();
    const bookId = query.get("bookId");
    const schoolId = query.get("schoolId")
    const [responseStatus, setResponseStatus] = useState();

    const createListingNotifier = (book, school) => {
        generalAPI
            .postNotificationRequest(book, school)
            .then((response) => setResponseStatus(response.status))
            .catch((err) => setResponseStatus(err.status));
    };

    if (props.listings === "loading") {
        return <p className="school-listings-loading">Loading...</p>;
    } else if (props.listings.length === 0) {
        return (
            <div className="no-listings-response">
                <h2>
                    It appears there are no listings for this book at this
                    school at this time. If you are interested in buying this
                    book and want to be notified via email when one is listed,
                    click here.
                </h2>
                <Button onClick={() => createListingNotifier(bookId, schoolId)}>Notify me!</Button>
                <ResponseStatusAlert status={responseStatus} />
            </div>
        );
    }
    const bookList = props.listings.map((listing) => (
        <li key={listing.id}>
            <ResultsListing listing={listing} />
        </li>
    ));
    return <ul className="school-listings">{bookList}</ul>;
};

const BookResults = () => {
    const query = useQuery();
    const bookId = query.get("bookId");
    const schoolId = query.get("schoolId");

    const [bookInfo, setBookInfo] = useState({ state: "loading" });
    const [schoolListingsResults, setSchoolListingsResults] = useState(
        "loading"
    );

    useEffect(() => {
        booksAPI
            .getBookFromId(bookId)
            .then((response) => setBookInfo({ ...response, state: "good" }))
            .catch((err) => setBookInfo({ state: "error" }));
        listingsAPI
            .getSchoolListings(bookId, schoolId)
            .then((response) => setSchoolListingsResults(response.data))
            .catch((err) => console.log(err));
    }, [bookId, schoolId]);

    return (
        //Adding BS text
        <div>
            <div className="listings-book-header">
                <h1>Listings for: </h1>
                <Book bookInfo={bookInfo}></Book>
            </div>
            <SchoolListings listings={schoolListingsResults} />
        </div>
    );
};

export default BookResults;
