import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import ResponseStatusAlert from "../../pieces/ResponseStatusAlert";
import listingRequestAPI from "../../../tools/api/listingRequestAPI";
import Listing from "./Listing";

const ResultsListing = (props) => {
    const [responseStatus, setResponseStatus] = useState();
    const [responseMessage, setResponseMessage] = useState();
    const [buyOrRent, setBuyOrRent] = useState("buy");
    const [requestCost, setRequestCost] = useState(
        props.listing.purchase_price
    );
    const [sliderVal, setSliderVal] = useState(100);

    useEffect(() => {
        if (buyOrRent === "buy") {
            setRequestCost(
                ((sliderVal / 100) * props.listing.purchase_price).toFixed(2)
            );
        } else {
            setRequestCost(
                ((sliderVal / 100) * props.listing.rental_price).toFixed(2)
            );
        }
    }, [buyOrRent, sliderVal, props]);

    const submitHandler = (e) => {
        e.preventDefault();
        listingRequestAPI
            .requestListing(props.listing.id, buyOrRent, requestCost)
            .then((response) => {
                setResponseMessage();
                setResponseStatus(response.status)
            })
            .catch((err) => {
                console.log(err);
                setResponseStatus(err.status);
                if (err.data) setResponseMessage(err.data.detail)
            });
    };

    const priceRangeHandler = (e) => {
        setSliderVal(e.target.value);
    };

    return (
        <div className="results-listing">
            <ResponseStatusAlert status={responseStatus} message={responseMessage}></ResponseStatusAlert>
            <Listing {...props.listing} />
            <div className="listing-form">
                <Form onSubmit={submitHandler}>
                    {props.listing.negotiable ? (
                        <Form.Group>
                            <Form.Label>Asking price (optional):</Form.Label>
                            <Form.Control
                                type="range"
                                onChange={priceRangeHandler}
                                defaultValue={100}
                            />
                        </Form.Group>
                    ) : (
                        <p>Non-negotiable</p>
                    )}
                    <Form.Group>
                        <Form.Check
                            inline
                            label="Rent"
                            type="radio"
                            name="buyOrSell"
                            checked={buyOrRent === "rent"}
                            onChange={() => setBuyOrRent("rent")}
                        />
                        <Form.Check
                            inline
                            label="Buy"
                            type="radio"
                            name="buyOrSell"
                            checked={buyOrRent === "buy"}
                            onChange={() => setBuyOrRent("buy")}
                        />
                        <Button id={props.id} variant="primary" type="submit">
                            Request to {buyOrRent} for ${requestCost}
                        </Button>
                    </Form.Group>
                </Form>
            </div>
        </div>
    );
};

export default ResultsListing;
