import React, { useState, useEffect } from "react";
import booksAPI from "../../../../tools/api/booksAPI";
import MessengerPopup from "./MessengerPopup";
import noCoverImage from '../../../../images/nocover.png';
import generalAPI from "../../../../tools/api/generalAPI"
import "./styles/DetailedRequest.css"

/**
 * Display details for a request on the user dashboard.
 * 
 * @param {Object} request The request information
 * @param {Object} active Whether the message box is active or not
 * @param {Function} setActive A function to set whether the message box is active 
 * @param {Number} unreadMessages The number of unread messages for this user on the listing.
 * @param {String} context Either "request" or "listing", to set further parameters
 */
function DetailedRequest({ request, active, setActive, unreadMessages, context }) {
    // {"id":3,         "owner":{"user":{"id":5,"first_name":"Corey","last_name":"Bean"},"school":1,"locality":1,"grad_year":2021,"major":[1,2]},
    // "school_name":"Messiah University","book":3,"condition":"vg","price":"30.52","is_for_rent":True}

    const [book, setBook] = useState({title: "Loading", subtitle: "", edition: ""});
    let listing = request.listing_data;

    let recipientName = (context === "request") ? `${listing.owner.user.first_name} ${listing.owner.user.last_name}`:`${request.owner_first_name} ${request.owner_last_name}`

    useEffect(() => {
        let isMounted = true;

        booksAPI
            .getBookFromId(listing.book)
            .then((book) => isMounted && setBook(book))
            .catch((err) => console.log(err));

        return () => (isMounted = false);
    }, [listing.book]);

    return <div>
        <div className="request-body">
            <img alt={"Cover for " + book.title} src={noCoverImage} style={{height:30, width:30, objectFit:"cover"}}/>
            <ul className="book-info">
                <li className="book-title">{book.title}</li>
                <li className="book-subtitle">{book.subtitle}</li>
                <li className="book-edition">{generalAPI.getEditionSting(book.edition) + " Edition"}</li>
            </ul>
            <ul className="listing-info">
                <li className="listing-type">For {listing.is_for_rent ? "Purchase":"Rent"}</li>
                <li className="listing-price">Price: ${listing.price}</li>
                <li className="listing-condition">Wear: {listing.condition_display}</li>
            </ul>
            <button onClick={() => setActive(true)}>
                Message {recipientName}
            </button>
            <u>{!!unreadMessages && unreadMessages}</u>
        </div>
        <MessengerPopup request={request} active={active} setActive={setActive} userId={request.owner_id}/>
    </div>;

}

export default DetailedRequest;
