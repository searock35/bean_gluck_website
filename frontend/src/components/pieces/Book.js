import React from "react";

/**
 * Book instance, with clickable links to get and generate listings for the book, optionally set with "linked" prop.
 * @param {Object} bookInfo Title, subtitle, authors, etc. from API Get request, as well as state which can be "loading", "error"
 */
function Book(props) {
    const bookInfo = props.bookInfo;

    if (bookInfo.state) {
        if (bookInfo.state === "error") {
            return <p>Server Error. Try refreshing, or check back later.</p>;
        } else if (bookInfo.state === "loading") {
            return <p>Loading...</p>;
        }
    }

    if (!bookInfo) return <p>Loading...</p>;


    let author = "Not Listed";
    if (bookInfo.authors[0]) {
        author = bookInfo.authors[0];
    }

    let isbn = bookInfo.isbn;
    if (!bookInfo.isbn && bookInfo.isbn13) isbn = bookInfo.isbn13.substring(3);

    return (
        <ul className="book-info">
            <li><img src={`http://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`} alt={`Book Cover for ${bookInfo.title}`}></img></li>
            <li className="book-title">Title: {bookInfo.title}</li>
            {bookInfo.subtitle ? (
                <li className="book-subtitle">Subtitle: {bookInfo.subtitle}</li>
            ) : (
                <></>
            )}
            <li className="book-edition">Edition: {bookInfo.edition}</li>
            <li className="book-author">
                Book Author: {author.first_name} {author.middle_initial}.{" "}
                {author.last_name}
            </li>
            <li className="book-isbn">ISBN: {isbn || "N/A"}</li>
            <li className="book-isbn13">ISBN-13: {bookInfo.isbn13 || "N/A"}</li>
        </ul>
    );
}

export default Book;
