import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Form, Button, ButtonGroup, ToggleButton } from "react-bootstrap";

import booksAPI from "../../tools/api/booksAPI";
import generalAPI from "../../tools/api/generalAPI";
import listingAPI from "../../tools/api/listingsAPI";
import Book from "../pieces/Book";
import SchoolSelectOption from "../pieces/SchoolSelectOption";
import * as yup from "yup";
import ResponseStatusAlert from "../pieces/ResponseStatusAlert";
import AuthModalWithContext from "../auth/AuthModalWithContext";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const listingSchema = yup.object().shape({
    book: yup.number().required(),
    purchase_price: yup.number().max(1000).positive(),
    rental_price: yup.number().max(1000).positive(),
    negotiable: yup.boolean(),
    condition: yup.string().matches(/^(vg|g|fr|f|nf|p)$/),
    school: yup.number().positive(),
});

const ListingCreator = () => {
    const query = useQuery();
    const bookId = query.get("bookId");
    const schoolId = query.get("schoolId");

    const defaultCondition = "g";

    const [book, setBook] = useState({ state: "loading" });
    const [schools, setSchools] = useState([]);
    const [responseStatus, setResponseStatus] = useState();
    const [listing, setListing] = useState({
        book: bookId,
        purchase_price: undefined,
        rental_price: undefined,
        negotiable: false,
        condition: defaultCondition,
        school: schoolId,
    });

    useEffect(() => {
        booksAPI
            .getBookFromId(bookId)
            .then((bookInfo) => setBook(bookInfo))
            .catch((err) => setBook({ state: "error" }));

        generalAPI
            .getSchoolsBasic()
            .then((schools) => setSchools(schools))
            .catch((err) => console.log(err));
    }, [bookId]);

    const submitHandler = () => {
        listingSchema
            .validate(listing)
            .then(() => {
                listingAPI
                    .postListing(listing)
                    .then((response) => {
                        setResponseStatus(response.status);
                        console.log(response.status);
                    })
                    .catch((err) => setResponseStatus(err.status));
            })
            .catch((err) => console.log(err));
    };

    const onChangeHandler = (e) => {
        let { id, value } = e.target;
        setListing({ ...listing, [id]: value });
    };

    return (
        <div>
            <AuthModalWithContext />
            Creating a listing for:
            <Book bookInfo={book} />
            <Form>
                <SchoolSelectOption
                    schools={schools}
                    value={listing.school}
                    onChangeCB={onChangeHandler}
                    label={"Which school should this listing be available to?"}
                />
                <Form.Group controlId="condition">
                    <Form.Label>Condition</Form.Label>
                    <Form.Control
                        as="select"
                        defaultValue={defaultCondition}
                        onChange={onChangeHandler}
                    >
                        <option value="f">Like New (6)</option>
                        <option value="nf">Near Fine (5)</option>
                        <option value="vg">Very Good (4)</option>
                        <option value="g">Good (3)</option>
                        <option value="fr">Fair (2)</option>
                        <option value="p">Poor (1)</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="purchase_price">
                    <Form.Label>Purchase Price</Form.Label>
                    <Form.Control
                        value={listing.purchase_price}
                        onChange={onChangeHandler}
                        placeholder="e.g. 12.99"
                    />
                    <Form.Text className="text-muted">
                        Enter a purchase price, if desired.
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="rental_price">
                    <Form.Label>Rental Price</Form.Label>
                    <Form.Control
                        value={listing.rental_price}
                        onChange={onChangeHandler}
                        placeholder="e.g. 7.99"
                    />
                    <Form.Text className="text-muted">
                        Enter a rental price, if desired.
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="negotiable">
                    <Form.Label>Negotiable?</Form.Label>
                    <ButtonGroup toggle>
                        <ToggleButton
                            className="negotiable-button"
                            type="checkbox"
                            variant="outline-success"
                            checked={listing.negotiable}
                            onChange={() =>
                                onChangeHandler({
                                    target: { id: "negotiable", value: true },
                                })
                            }
                        >
                            Negotiable
                        </ToggleButton>
                    </ButtonGroup>
                    <ButtonGroup toggle>
                        <ToggleButton
                            className="non-negotiable-button"
                            type="checkbox"
                            variant="outline-danger"
                            checked={!listing.negotiable}
                            onChange={() =>
                                onChangeHandler({
                                    target: { id: "negotiable", value: false },
                                })
                            }
                        >
                            Non-Negotiable
                        </ToggleButton>
                    </ButtonGroup>
                </Form.Group>
                <Button onClick={submitHandler}>Create Listing</Button>
                <ResponseStatusAlert status={responseStatus} />
            </Form>
        </div>
    );
};

export default ListingCreator;
