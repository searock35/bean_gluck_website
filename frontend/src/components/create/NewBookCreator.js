import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import "./NewBookCreator.css"


function NewBookCreator() {
    const [bookData, setBookData] = useState({
        bookTitle: "",
        author_first: "",
        author_last: "",
        edition: "",
        isbn: "",
        has_isbn: "",

    });


    const onChangeHandler = (e) => {
        e.preventDefault();
        const { id, value } = e.target;
        setBookData({
            ...bookData,
            [id]: value
        })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        //some API call here
        console.log("Submitted form")
    }

    return (
        <div className="new-book-creator">
            <Form onSubmit={submitHandler} className="new-book-form">
            <h1>Create Public Book</h1>
            <Form.Group controlId="title">
                <Form.Label>Book Title</Form.Label>
                <Form.Control placeholder="e.g. 'Ender's Game'" value={bookData.bookTitle} onChange={onChangeHandler} />
            </Form.Group>
            <Form.Group controlId="author">
                <Form.Label>Author</Form.Label>
                <Form.Row>
                    <Col>
                        <Form.Group controlId="author_first">
                            <Form.Control type="name" placeholder="First name" value={bookData.author_first} onChange={onChangeHandler} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="author_last">
                            <Form.Control type="name" placeholder="Last name" value={bookData.author_last} onChange={onChangeHandler} />
                        </Form.Group>
                    </Col>
                </Form.Row>
                <Form.Text className="text-muted">
                    Choose the most prominent author of the book, or the first name listed on the book.
                </Form.Text>
            </Form.Group>
            <Form.Group controlId="edition">
                <Form.Label>Enter the edition number here</Form.Label>
                <Form.Control placeholder="1" value={bookData.edition} onChange={onChangeHandler} />

            </Form.Group>

            <Button id="reg-submit-button" variant="primary" type="submit">
                Submit
            </Button>
            </Form>
        </div>
    )
}

export default NewBookCreator;