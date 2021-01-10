import React from 'react';


const Listing = (props) => {

    console.log(props)
    return (
        <div>
            <ul className="search-listing">
                <li className="name">
                    Name: {props.owner.user.first_name} {props.owner.user.last_name}
                </li>
                <li className="condition">
                    Condition: {props.condition_display}
                </li>
                <li className="price">
                    Price: {props.price}
                </li>
                <li className="type">
                    For {props.is_for_rent ? "Rent":"Purchase"}
                </li>
            </ul>
        </div>
    );
}

export default Listing;
