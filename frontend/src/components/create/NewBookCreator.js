import React, { useEffect, useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import * as yup from "yup";
import "./NewBookCreator.css";

let bookSchema = yup.object().shape({
    title: yup.string().required().min(1).max(30),
    subtitle: yup.string().required().min(1).max(50),
    author_first: yup.string().required().max(30),
    author_middle: yup.string().max(1),
    author_last: yup.string().required().max(30),
    edition: yup.number().integer().lessThan(20).moreThan(0),
    isbn: yup.string().matches(/^((\d{10})|(\d{13}))$/),
});

function NewBookCreator() {
    const [bookData, setBookData] = useState({
        title: "",
        subtitle: "",
        authors: [{ first_name: "", middle_initial: "", last_name: "" }],
        edition: "",
        isbn: "",
        has_isbn: "",
    });

    const [disableAddAuthor, setDisableAddAuthor] = useState(false);
    const [disableRemoveAuthor, setDisableRemoveAuthor] = useState(true);

    const onChangeHandler = (e) => {
        e.preventDefault();
        const { id, value } = e.target;
        setBookData({
            ...bookData,
            [id]: value,
        });
    };

    useEffect(() => {
        if (bookData.authors.length === 1) {
            setDisableRemoveAuthor(true);
        } else if (bookData.authors.length === 3) {
            setDisableAddAuthor(true);
        } else {
            setDisableAddAuthor(false);
            setDisableRemoveAuthor(false);
        }
    }, [bookData]);

    const addAuthor = () => {
        if (bookData.authors.length < 3) {
            bookData.authors.push({
                first_name: "",
                middle_initial: "",
                last_name: "",
            });
        }

        if (bookData.authors.length === 3) {
            setDisableAddAuthor(true);
        } else {
            setDisableAddAuthor(false);
        }

        setBookData({ ...bookData });
    };

    const removeAuthor = () => {
        if (bookData.authors.length > 1) {
            bookData.authors.pop();
        }
        if (bookData.authors.length === 1) {
            setDisableRemoveAuthor(true);
        } else {
            setDisableRemoveAuthor(false);
        }

        setBookData({ ...bookData });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        bookSchema
            .validate(bookData)
            .then((book) => {
                console.log(book);
            })
            .catch((err) => {
                console.log(err);
            });

        //some API call here
    };

    const AuthorForms = bookData.authors.map((author, index) => {
        return (
            <Form.Group controlId={`author${index}`} key={index}>
                <Form.Label>Author {index + 1}</Form.Label>
                <Form.Row>
                    <Col>
                        <Form.Group controlId="first_name">
                            <Form.Control
                                type="name"
                                placeholder="First name"
                                value={bookData.authors[index].first_name}
                                onChange={onChangeHandler}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="middle_initial">
                            <Form.Control
                                type="name"
                                placeholder="Middle Initial"
                                value={bookData.authors[index].middle_initial}
                                onChange={onChangeHandler}
                            />
                            .
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="last_name">
                            <Form.Control
                                type="name"
                                placeholder="Last name"
                                value={bookData.authors[index].last_name}
                                onChange={onChangeHandler}
                            />
                        </Form.Group>
                    </Col>
                </Form.Row>
            </Form.Group>
        );
    });

    return (
        <div className="new-book-creator">
            <Form onSubmit={submitHandler} className="new-book-form">
                <h1>Create Public Book</h1>
                <Form.Group controlId="title">
                    <Form.Label>Book Title</Form.Label>
                    <Form.Control
                        placeholder="e.g. 'Ender's Game'"
                        value={bookData.title}
                        onChange={onChangeHandler}
                    />
                </Form.Group>
                <Form.Group controlId="subtitle">
                    <Form.Label>Subtitle</Form.Label>
                    <Form.Control
                        placeholder="e.g. 'A Journey from Beyond'"
                        value={bookData.subtitle}
                        onChange={onChangeHandler}
                    />
                </Form.Group>
                <Form.Label>Authors</Form.Label>
                {AuthorForms}
                <Form.Text className="text-muted">
                    Add up to 3 authors.
                </Form.Text>
                <Button
                    id="add-author-button"
                    variant="outline-primary"
                    onClick={addAuthor}
                    disabled={disableAddAuthor}
                >
                    Add Author
                </Button>
                <Button
                    id="remove-author-button"
                    variant="danger"
                    onClick={removeAuthor}
                    disabled={disableRemoveAuthor}
                >
                    Remove Author
                </Button>
                <Form.Group controlId="edition">
                    <Form.Label>Enter the edition number here</Form.Label>
                    <Form.Control
                        placeholder="1"
                        value={bookData.edition}
                        onChange={onChangeHandler}
                    />
                </Form.Group>
                <Form.Group controlId="isbn">
                    <Form.Label>Enter ISBN, if applicable.</Form.Label>
                    <Form.Control
                        value={bookData.isbn}
                        onChange={onChangeHandler}
                    />
                </Form.Group>

                <Button id="reg-submit-button" variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default NewBookCreator;
