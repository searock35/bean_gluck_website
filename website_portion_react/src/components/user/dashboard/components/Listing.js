import React from 'react';
import { Button } from 'react-bootstrap';

function Listing(props) {
    const testFunction = () => console.log("Test");
    //title: "Bridge to nowhere", author: "John Henry", id: "8", condition: "Good", rentalPrice: "20$", sellingPrice: "30$", listingId: "1"},
    return(
        <div>
            <ul>
                <li>Book: {props.title}</li>
                <li>condition: {props.condition}</li>
                <li>Rental Price: ${props.rentalPrice}</li>
                <li>Purchase Price: ${props.sellingPrice}</li>
                <li>Number of requests: {props.requests}</li>
                <li><Button onClick={testFunction}>See Requests</Button></li>

            </ul>
        </div>
    )

}


export default Listing;
