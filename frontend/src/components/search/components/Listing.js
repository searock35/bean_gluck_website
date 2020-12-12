import React from 'react';


const Listing = (props) => {

    return (
        <div>
            <ul className="search-listing">
                <li className="name">
                    Name: {props.owner.user.first_name} {props.owner.user.last_name}
                </li>
                <li className="condition">
                    Condition: {props.condition}
                </li>
                <li className="rental-price">
                    Rental Price: {props.rental_price}
                </li>
                <li className="selling-price">
                    Selling Price: {props.purchase_price}
                </li>
            </ul>
        </div>
    );
}

export default Listing;
