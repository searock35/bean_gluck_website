import React, { useContext, useEffect, useState } from "react";
import listingAPI from "../../../../tools/api/listingsAPI";
import UserContext from "../../../../tools/react/UserContext";
import DetailedListing from "./DetailedListing";

import "./styles/ListingsBox.css"


/**
 * A box containing all the listings that a user had, and the requests for each of those listings.
 */
function BookListings() {
    let currentUser = useContext(UserContext);

    const [listings, setListings] = useState([]);

    useEffect(() => {
        let isMounted = true;
        listingAPI
            .getListingsByUser(currentUser.user_id)
            .then((listings) => isMounted && setListings(listings))
            .catch((err) => console.log(err));

        return () => isMounted = false;
    }, [currentUser.user_id]);

    let renderedListings = listings.map((listing) => (
        <li key={listing.id}>
            <DetailedListing {...listing} />
        </li>
    ));

    return (
        <div className="scroll-container listings-container">
            <h2>My Listings</h2>
            <ul className="listings-list">{renderedListings}</ul>
        </div>
    );
}

export default BookListings;
