import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import ResponseStatusAlert from '../../pieces/ResponseStatusAlert';
import listingRequestAPI from '../../../tools/api/listingRequestAPI';
import Listing from './Listing';

const ResultsListing = (props) => {
    const [responseStatus, setResponseStatus] = useState();
    const [buyOrRent, setBuyOrRent] = useState("buy");
    const [requestCost, setRequestCost] = useState(props.listing.purchase_price);
    const [sliderVal, setSliderVal] = useState(100)

    useEffect(() => {
    
        if (buyOrRent === "buy") {
            setRequestCost((sliderVal / 100 * props.listing.purchase_price).toFixed(2));
        }
        else {
            setRequestCost((sliderVal / 100 * props.listing.rental_price).toFixed(2));
        }
    

    }, [buyOrRent, sliderVal, props])

    const submitHandler = (e) => {
        e.preventDefault();
        listingRequestAPI.requestListing(props.listing.id, buyOrRent, requestCost)
            .then((response) => setResponseStatus(response.status))
            .catch((err) => {
                console.log(err)
                setResponseStatus(err.status)
            })
    }

    const priceRangeHandler = (e) => {
        setSliderVal(e.target.value)
    }

    const radioHandler = (e) => {
        const { id } = e.target;
        setBuyOrRent(id);
    }

    return (
        <div className="results-listing">
            <ResponseStatusAlert status={responseStatus}></ResponseStatusAlert>
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
                            Request to {buyOrRent} for ${requestCost}
                        </Button>
                    </Form.Group>
                </Form>
            </div>
        </div>
    )
}

export default ResultsListing