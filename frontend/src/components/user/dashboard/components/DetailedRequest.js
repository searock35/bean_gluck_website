import React from 'react';
import DetailedListing from './DetailedListing'


function DetailedRequest(props) {
    //title: "Bridge to nowhere", author: "John Henry", id: "8", condition: "Good", rentalPrice: "20$", sellingPrice: "30$", listingId: "1"},

    // {"id":3,         "owner":{"user":{"id":5,"first_name":"Corey","last_name":"Bean"},"school":1,"locality":1,"grad_year":2021,"major":[1,2]},
    // "school_name":"Messiah University","book":3,"condition":"vg","purchase_price":"30.52","rental_price":"20.10"}
    const buyOrRent = props.purchase_asking_price ? "buy" : "rent";
    const price = props.purchase_asking_price ? props.purchase_asking_price : props.rental_asking_price;


    return(
        <div>
            <ul>
                <li>
                    <h3>Listing:</h3>
                    <DetailedListing {...props.listing_data} owner={props.owner_first_name + " " + props.owner_last_name}/>
                </li>
                <li>You requested to {buyOrRent} for ${price}</li>
            </ul>
        </div>
    )

}


export default DetailedRequest;
