import React, { useContext, useEffect, useState } from "react";
import { Alert, Form, Col, Button } from "react-bootstrap";
import authAPI from "../../tools/api/authAPI";
import generalAPI from "../../tools/api/generalAPI";
import * as yup from "yup";
import ResponseStatusAlert from "../pieces/ResponseStatusAlert";
import UserContext from "../../tools/react/UserContext";
import SchoolSelectOption from "../pieces/SchoolSelectOption";

const localitySchema = yup.object().shape({
    city: yup.string().required(),
    state: yup.string().required().length(2),
    zip_code: yup.string().required().length(5),
});

const name_message = "Please enter your first and last name.";
const userSchema = yup.object().shape({
    first_name: yup.string().required(name_message),
    last_name: yup.string().required(name_message),
    username: yup.string().required("Username is required.").min(5).max(32),
    email: yup.string().email().required("Please enter your email."),
    // locality: localitySchema,
    password: yup
        .string()
        .required("Password is required.")
        // .matches(
        //     /^(?=.*[a-z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[a-za-z\d@$!%*?&]{8,}$/,
        //     {message: "password must have at least 1 letter, l number, 1 special character, and must be at least 8 characters long."}
        // )
        .min(8)
        .max(32),
});

const customerSchema = yup.object().shape({
    school: yup.number().required().min(1, "Please select a school."),
    grad_year: yup.number().min(1980).max(2028),
    locality: localitySchema,
    user: userSchema,
});

function Register() {
    const currentUser = useContext(UserContext);

    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        username: "",
        password: "",
        email: "",
        school: "0",
    });

    const [locality, setLocality] = useState({
        city: "",
        state: "",
        zip_code: "",
    });

    const [customer, setCustomer] = useState({
        school: "0",
        grad_year: "",
    });

    const [responseStatus, setResponseStatus] = useState();
    const [responseMessage, setResponseMessage] = useState();
    const [validationError, setValidationError] = useState("");
    const [schoolOptions, setSchoolOptions] = useState([]);

    useEffect(() => {
        generalAPI
            .getSchoolsBasic()
            .then((schools) => {
                setSchoolOptions(schools);
            })
            .catch((err) => {
                setResponseStatus(err.status);
            });
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        setResponseStatus();
        setValidationError("");

        // check validity
        customerSchema
            .validate({ ...customer, locality: locality, user: user })
            .then((valUser) => {
                authAPI
                    .register(valUser)
                    .then((newUser) => currentUser.changeUserContext(newUser))
                    .catch((err) => {
                        setResponseStatus(err.status);
                        console.log(err.data);
                    });
            })
            .catch((err) => {
                setValidationError(err.message);
            });
    };

    const onChangeHandler = (e) => {
        e.preventDefault();
        const { id, value } = e.target;

        setUser({
            ...user,
            [id]: value,
        });
    };

    const changeCustomer = (e) => {
        e.preventDefault();
        const { id, value } = e.target;
        setCustomer({
            ...customer,
            [id]: value,
        })
    }

    const changeLocality = (e) => {
        e.preventDefault();
        const { id, value } = e.target;
        if (id === "zip_code" && value.length > 5) return;
        else if (id === "state" && value.length > 2) return;
        setLocality({
            ...locality,
            [id]: value,
        })
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
                <Form.Label>Username</Form.Label>
                <Form.Control
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
            <Form.Row>
                <Col>
                    <SchoolSelectOption
                        schools={schoolOptions}
                        onChangeCB={changeCustomer}
                        label="School"
                        label_muted="This is where you expect to be buying and selling books."

                    />
                </Col>
                <Col>
                    <Form.Group controlId="grad_year">
                        <Form.Label>Grad Year</Form.Label>
                        <Form.Control
                            placeholder="e.g. 2021"
                            value={customer.grad_year}
                            onChange={changeCustomer}
                        />
                        <Form.Text className="text-muted">
                            We use the grad year to help make recommendations to you.
                        </Form.Text>
                    </Form.Group>
                </Col>
            </Form.Row>
            <Form.Row>
                <Col>
                    <Form.Group controlId="city">
                        <Form.Label>City</Form.Label>
                        <Form.Control placeholder="City" value={locality.city} onChange={changeLocality} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="state">
                        <Form.Label>State</Form.Label>
                        <Form.Control placeholder='e.g. "PA"' value={locality.state} onChange={changeLocality} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="zip_code">
                        <Form.Label>Zip Code </Form.Label>
                        <Form.Control placeholder="Zip" value={locality.zip_code} onChange={changeLocality} />
                    </Form.Group>
                </Col>
            </Form.Row>

            <Button id="reg-submit-button" variant="primary" type="submit">
                Submit
            </Button>
            <ResponseStatusAlert
                status={responseStatus}
                message={responseMessage}
            />
            <Alert variant="warning" show={!!validationError}>
                {validationError}
            </Alert>
        </Form>
    );
}

export default Register;
