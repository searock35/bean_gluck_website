import React, { useEffect, useState, useContext } from "react";
import {
    Form,
    Button,
    ButtonGroup,
    ToggleButton,
    Col,
    InputGroup,
    Alert,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import booksAPI from "../../tools/api/booksAPI";
import UserContext from "../../tools/react/UserContext";
import AuthModalWithContext from "../auth/AuthModalWithContext";
import ResponseStatusAlert from "../pieces/ResponseStatusAlert";
import "./NewBookCreator.css";

let authorSchema = yup.object().shape({
    first_name: yup.string().required().max(30),
    middle_initial: yup.string().max(1),
    last_name: yup.string().required().max(30),
});

let bookSchema = yup.object().shape({
    title: yup.string().required().min(1).max(100),
    subtitle: yup.string().max(100),
    authors: yup.array().of(authorSchema),
    edition: yup.number().integer().lessThan(20).moreThan(0),
    isbn: yup
        .string()
        .matches(/^((\d{10})|(\d{13}))$/, {
            message:
                "Please omit any extra characters and make sure the ISBN is 10 or 13 digits long. If there is none, select 'No ISBN'",
        }),
    is_custom: yup.bool().required(),
});

function NewBookCreator() {
    let history = useHistory();
    let currentUser = useContext(UserContext);

    const [bookData, setBookData] = useState({
        title: "",
        subtitle: "",
        edition: "1",
        isbn: "",
    });

    const [bookAuthors, setBookAuthors] = useState([
        { first_name: "", middle_initial: "", last_name: "" },
    ]);
    const [disableAddAuthor, setDisableAddAuthor] = useState(false);
    const [disableRemoveAuthor, setDisableRemoveAuthor] = useState(true);
    const [editionSuffix, setEditionSuffix] = useState("st");
    const [isCustom, setIsCustom] = useState(false);
    const [postStatus, setPostStatus] = useState();
    const [postMessage, setPostMessage] = useState();
    const [validationMessage, setValidationMessage] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();
        let all_data = {
            ...bookData,
            authors: bookAuthors,
            is_custom: isCustom,
        };
        if (isCustom) delete all_data.isbn;
        bookSchema
            .validate(all_data)
            .then((book) => {
                setValidationMessage("");
                booksAPI
                    .postBook(all_data)
                    .then((response) => {
                        console.log(response.data)
                        console.log(response.status)
                        setPostStatus(response.status);
                        history.push(`/create-listing?bookId=${response.data.id}&schoolId=${currentUser.school_id}`);
                    })
                    .catch((err) => {
                        try {
                            setPostMessage(Object.entries(err.data)[0][1][0]);
                        }
                        catch(e) {
                            if (err.data) console.log(err.data)
                        }
                        setPostStatus(err.status);
                    });
            })
            .catch((err) => {
                setValidationMessage(err.message);
            });
    };

    const onChangeHandler = (e) => {
        e.preventDefault();
        const { id, value } = e.target;
        setBookData({
            ...bookData,
            [id]: value,
        });
    };

    const updateAuthorData = (e, index) => {
        e.preventDefault();
        const { id, value } = e.target;
        const newAuthors = bookAuthors.concat();
        newAuthors[index] = { ...newAuthors[index], [id]: value };
        setBookAuthors(newAuthors);
    };

    useEffect(() => {
        switch (bookData.edition) {
            case "":
                setEditionSuffix("");
                break;
            case "1":
                setEditionSuffix("st");
                break;
            case "2":
                setEditionSuffix("nd");
                break;
            case "3":
                setEditionSuffix("rd");
                break;
            default:
                setEditionSuffix("th");
        }
        console.log("rerendered");
    }, [bookData.edition]);

    useEffect(() => {
        if (bookAuthors.length === 1) {
            setDisableRemoveAuthor(true);
        } else if (bookAuthors.length === 3) {
            setDisableAddAuthor(true);
        } else {
            setDisableAddAuthor(false);
            setDisableRemoveAuthor(false);
        }
    }, [bookAuthors]);

    const addAuthor = () => {
        if (bookAuthors.length < 3)
            setBookAuthors(
                bookAuthors.concat({
                    first_name: "",
                    middle_initial: "",
                    last_name: "",
                })
            );
    };

    const removeAuthor = () => {
        if (bookAuthors.length > 1) setBookAuthors(bookAuthors.slice(0, -1));
    };

    const AuthorForms = bookAuthors.map((author, index) => {
        return (
            <div key={index} className="author-option">
                <Form.Label>Author {index + 1}</Form.Label>
                <Form.Row>
                    <Col xs={4} lg={3}>
                        <Form.Group controlId="first_name">
                            <Form.Control
                                type="name"
                                placeholder="First name"
                                value={bookAuthors[index].first_name}
                                onChange={(e) => updateAuthorData(e, index)}
                            />
                        </Form.Group>
                    </Col>
                    <Col xs={2} lg={1}>
                        <Form.Group controlId="middle_initial">
                            <Form.Control
                                type="name"
                                placeholder="Middle Initial"
                                value={bookAuthors[index].middle_initial}
                                onChange={(e) => updateAuthorData(e, index)}
                            />
                        </Form.Group>
                    </Col>
                    <Col xs={4} lg={3}>
                        <Form.Group controlId="last_name">
                            <Form.Control
                                type="name"
                                placeholder="Last name"
                                value={bookAuthors[index].last_name}
                                onChange={(e) => updateAuthorData(e, index)}
                            />
                        </Form.Group>
                    </Col>
                </Form.Row>
            </div>
        );
    });

    return (
        <div className="new-book-creator">
            <AuthModalWithContext />
            <Form onSubmit={submitHandler} className="new-book-form">
                <h1>Create Listable Resource</h1>
                <Form.Group controlId="title">
                    <Form.Label>Book Title</Form.Label>
                    <Form.Control
                        placeholder="e.g. 'Ender's Game'"
                        value={bookData.title}
                        onChange={onChangeHandler}
                    />
                </Form.Group>
                <Form.Group controlId="subtitle">
                    <Form.Label>Subtitle (optional)</Form.Label>
                    <Form.Control
                        placeholder="e.g. 'A Journey from Beyond'"
                        value={bookData.subtitle}
                        onChange={onChangeHandler}
                    />
                </Form.Group>
                <Form.Group>
                    {AuthorForms}
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
                    <Form.Text className="text-muted">
                        Add up to 3 authors.
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="edition">
                    <Form.Label>Edition</Form.Label>
                    <Col xs={4} sm={3} md={2} xl={1}>
                        <InputGroup>
                            <Form.Control
                                value={bookData.edition}
                                onChange={onChangeHandler}
                            />
                            <InputGroup.Append>
                                <InputGroup.Text>
                                    {editionSuffix}
                                </InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                    <Form.Text className="text-muted">
                        Enter "1st" if not listed
                    </Form.Text>
                </Form.Group>
                <Form.Label>Enter ISBN, if applicable.</Form.Label>
                <Form.Row>
                    <Col>
                        <Form.Group controlId="isbn">
                            <Form.Control
                                value={bookData.isbn}
                                onChange={onChangeHandler}
                                disabled={isCustom}
                            />
                        </Form.Group>
                        <Form.Text className="text-muted">
                            Please use the 13-digit ISBN-13, if possible.
                        </Form.Text>
                    </Col>
                    <Col>
                        <ButtonGroup toggle>
                            <ToggleButton
                                id="toggle-isbn-button"
                                type="checkbox"
                                variant="outline-success"
                                value="1"
                                checked={isCustom}
                                onChange={() => setIsCustom(!isCustom)}
                            >
                                No ISBN
                            </ToggleButton>
                        </ButtonGroup>
                    </Col>
                </Form.Row>

                <Button id="reg-submit-button" variant="primary" type="submit">
                    Submit
                </Button>
                <Alert variant="warning" show={!!validationMessage}>
                    {validationMessage}
                </Alert>
                <ResponseStatusAlert
                    status={postStatus}
                    message={postMessage}
                />
            </Form>
        </div>
    );
}

export default NewBookCreator;
