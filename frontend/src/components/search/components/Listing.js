import React, { useContext, useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import listingRequestAPI from '../../../tools/api/listingRequestAPI';
import UserContext from '../../../tools/react/UserContext';

const SuccessAlert = (props) => {
    let variant = "warning";
    let string = "An error occurred, no response from request API";
    if(props.success === "true") {
        variant = "success";
        string = "Listing request successful!";
    } else if (props.success === "authError") {
        variant = "warning";
        string = "Listing request failed. You need to be logged in to request a listing; login or register using the navbar above."
    } else {
        string = "Refresh the page and try again in a minute. If that fails, try another browser."
    }

    if(typeof props.success === "string") {
        return <Alert variant={variant}>{string}</Alert>
    } else {
        return null;
    }

}

const Listing = (props) => {

    const currentUser = useContext(UserContext);
    const placeHolderText = "Ask for availability, add any stipulations, etc.";

    const [success, setSuccess] = useState();
    const [buyOrRent, setBuyOrRent] = useState("buy");
    const [message, setMessage] = useState()

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(e.target);
        if(currentUser.userId === "0") {
            setSuccess("authError");
            console.log("Auth Error");
        } else {
            setSuccess(listingRequestAPI.requestListing( {action: buyOrRent, message: message, userId: currentUser.userId} ));
        }
    }

    const messageChangeHandler = (e) => {
        e.preventDefault();
        setMessage(e.target.value);
    }

    const radioHandler = (e) => {
        const { id } = e.target;
        setBuyOrRent(id);
    }

    if(props.length < 3) return <ul>Listing Error</ul>

    return (
        <div>
            <SuccessAlert success={success}></SuccessAlert>
            <ul className="search-listing">
                <li className="name">
                    Name: {props.owner.first_name} {props.owner.last_name}
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
                <li className="form">
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="request.message">
                            <Form.Label>Message (optional):</Form.Label>
                            <Form.Control as="textarea" rows="2" placeholder={placeHolderText} value={message} onChange={messageChangeHandler}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Check inline label="Rent" type="radio" id="rent" name="buyOrSell" checked={buyOrRent==="rent"} onChange={radioHandler} />
                            <Form.Check inline label="Buy" type="radio" id="buy"name="buyOrSell" checked={buyOrRent==="buy"} onChange={radioHandler}/>
                            <Button id={props.id} variant="primary" type="submit">
                                Request
                            </Button>
                        </Form.Group>
                    </Form>
                </li>
            </ul>
        </div>
    );
}

export default Listing;
