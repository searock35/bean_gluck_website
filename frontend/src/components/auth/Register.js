import React, { useState } from "react";
import { Alert, Form, Col, Button } from "react-bootstrap";
import { Redirect, useHistory } from "react-router-dom";
import authAPI from "../../tools/api/authAPI";
import * as yup from "yup";

let regSchema = yup.object().shape({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    username: yup.string().required().min(5).max(32),
    email: yup.string().email(),
    password: yup
        .string()
        .required()
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        )
        .min(8)
        .max(32),
});

function Register() {
    const history = useHistory();
    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        username: "",
        password: "",
        email: "",
        school: "",
    });

    const [errorString, setError] = useState("");
    const [show, setShow] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();

        // check validity
        regSchema
            .validate(user)
            .then((regInfo) => {
                authAPI
                    .register(regInfo)
                    .then((response) => history.goBack())
                    .catch((err) => setError(err.data));
            })
            .catch(function (err) {
                setError(err.errors);
                setShow(true);
            });
    };

    const onChangeHandler = (e) => {
        e.preventDefault();
        const { id, value } = e.target;

        setUser((user) => ({
            ...user,
            [id]: value,
        }));
    };

    if (authAPI.isAuth()) {
        return <Redirect to="/" />;
    }

    return (
        <Form noValidate onSubmit={submitHandler}>
            <h1>User Registration</h1>
            <Form.Group controlId="full_name">
                <Form.Label>Name</Form.Label>
                <Form.Row>
                    <Col>
                        <Form.Group controlId="first_name">
                            <Form.Control
                                type="name"
                                placeholder="First name"
                                value={user.firstName}
                                onChange={onChangeHandler}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="last_name">
                            <Form.Control
                                type="name"
                                placeholder="Last name"
                                value={user.last_name}
                                onChange={onChangeHandler}
                            />
                        </Form.Group>
                    </Col>
                </Form.Row>
                <Form.Text className="text-muted">
                    This is the name your peers will see for your book listings.{" "}
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={user.email}
                    onChange={onChangeHandler}
                />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.{" "}
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="username">
                <Form.Label>username</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter username"
                    value={user.username}
                    onChange={onChangeHandler}
                />
                <Form.Text className="text-muted">
                    This will be used for login, should be at least 5 characters
                    long.{" "}
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={user.password}
                    onChange={onChangeHandler}
                />
                <Form.Text className="text-muted">
                    Password must be 8-32 characters long, and must include
                    uppercase and lowercase, a number and a special character.{" "}
                </Form.Text>
            </Form.Group>
            <Form.Group controlId="school">
                <Form.Label>School</Form.Label>
                <Form.Control
                    type="school"
                    placeholder="Search for your school"
                    value={user.school}
                    onChange={onChangeHandler}
                />
                <Form.Text className="text-muted">
                    This is where you expect to be buying and selling books.{" "}
                </Form.Text>
            </Form.Group>
            <Button id="reg-submit-button" variant="primary" type="submit">
                Submit
            </Button>
            <Alert variant="warning" show={show}>
                {errorString}
            </Alert>
        </Form>
    );
}

export default Register;
