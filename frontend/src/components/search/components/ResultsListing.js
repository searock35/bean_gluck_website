import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import SuccessAlert from './SuccessAlert';
import listingRequestAPI from '../../../tools/api/listingRequestAPI';
import Listing from './Listing';

const ResultsListing = (props) => {
    const [success, setSuccess] = useState();
    const [buyOrRent, setBuyOrRent] = useState("buy");
    const [requestCost, setRequestCost] = useState(props.listing.purchase_price);
    const [sliderVal, setSliderVal] = useState(100)

    const updateCost = () => {
        if (buyOrRent === "buy") {
            setRequestCost((sliderVal / 100 * props.listing.purchase_price).toFixed(2));
        }
        else {
            setRequestCost((sliderVal / 100 * props.listing.rental_price).toFixed(2));
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        setSuccess("...");
        console.log(e.target);
        listingRequestAPI.requestListing(props.listing.id, buyOrRent, requestCost)
            .then((response) => setSuccess("true"))
            .catch((err) => {
                if (err.response.status === 401)
                    setSuccess("authError")
                else setSuccess(err.response.data.error)
            })
    }

    const priceRangeHandler = (e) => {
        setSliderVal(e.target.value)
        updateCost()
    }

    const radioHandler = (e) => {
        const { id } = e.target;
        setBuyOrRent(id);
        updateCost()
    }

    return (
        <div className="results-listing">
            <SuccessAlert success={success}></SuccessAlert>
            <Listing {...props.listing}/>
            <div className="listing-form">
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="request.asking_price">
                        <Form.Label>Asking price (optional):</Form.Label>
                        <Form.Control type="range" onChange={priceRangeHandler} defaultValue={100}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Check inline label="Rent" type="radio" id="rent" name="buyOrSell" checked={buyOrRent==="rent"} onChange={radioHandler} />
                        <Form.Check inline label="Buy" type="radio" id="buy"name="buyOrSell" checked={buyOrRent==="buy"} onChange={radioHandler}/>
                        <Button id={props.id} variant="primary" type="submit">
                            Request for {buyOrRent} for ${requestCost}
                        </Button>
                    </Form.Group>
                </Form>
            </div>
        </div>
    )
}

export default ResultsListing