import React, { useState, useContext } from 'react';
import { Form, Col, Button } from "react-bootstrap";
import { useHistory, Redirect } from 'react-router-dom';
import authAPI from '../../tools/api/authAPI';
import UserContext from '../../tools/react/UserContext';
import getDefaultUser from '../../tools/getDefaultUser';

function Register() {

    const history = useHistory();
    const currentUser = useContext(UserContext);

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        password: "",
        email: "",
        school: ""
    })

    const errors = {
        firstName: "Required",
        lastName: "Required",
        password: "Required",
        email: "Required",
        school: "Required"
    };

    const submitHandler = (e) => {
        e.preventDefault();
        var success = true;

        if(errorsClear()) {
            const regCb = (newUser) => {
                currentUser.changeUserContext(newUser);
                history.push('/');
            }
            success = authAPI.register(regCb);
            if(success === false) {
                console.log("bad reg");
            }
        } else {
            console.log("Data not correct");
        }
    }

    const errorsClear = () => {
        var clear = true;
        for (const error in errors) {
            if (errors[error].length > 0) clear = false;
        }
        console.log(clear);
        return clear
    }

    const showSubmit = (show) => {
        if(show === "true") {
            console.log("ready to submit");
            document.getElementById("reg-submit-button").removeAttribute("disabled");
        }
    }

    const onChangeHandler = (e) => {
        e.preventDefault();
        const { id, value } = e.target;
        setUser((user) => ({
            ...user,
            [id]: value
        }))
    }

    const setError = (name, value) => {
        errors[name] = value
    }

    const validate = values => {
        if (typeof values.firstName === "string") {
            if(values.firstName === "") {
                setError("firstName", "Required");
            } else if (values.firstName.length < 2 || values.firstName.length > 32) {
                setError("firstName", "Invalid length");
            } else {
                setError("firstName", "");
            }
        }

        if (typeof values.lastName === "string") {
            if(values.lastName === "") {
                setError("lastName", "Required");
            } else if (values.firstName.length < 2 || values.firstName.length > 32) {
                setError("lastName", "Invalid length");
            } else {
                setError("lastName", "");
            }
        }
        
        if (typeof values.email === "string") {
            if(values.email.length === 0) {
                setError("email", "Required");
            } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                setError("email", "Invalid email");
            } else {
                setError("email", "");
            }
        }
    
        if (typeof values.password === "string") {
            if (values.password.length >= 8 && values.password.length < 32) {
                if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i.test(values.password)) {
                    setError("password", "Invalid password");
                } else {
                    setError("password", "");
                }
            } else if (values.password.length===0) {
                setError("password", "Required");
            } else {
                setError("password", "Incorrect Length");
            }
        }

        if (typeof values.school === "string") {
            if(values.school.length > 0) {
                setError("school", "");
            } else {
                setError("school", "Please choose a school");
            }
        }
    };

    validate(user);
    errorsClear() ? showSubmit("true") : showSubmit("false");

    //if user is logged in, redirect them away from this page
    if(authAPI.isAuth()) {
        if (currentUser.email === getDefaultUser().email) {
        //for this case, usertoken is enabled but User is not actually logged in on client. This should never happen.
        authAPI.logout();
        } else {
            return <Redirect to="/" />
    }}

    return (
        <Form onSubmit={submitHandler}>
            <h1>User Registration</h1>
            <Form.Group controlId="fullName">
                <Form.Label>Name</Form.Label>
                <Form.Row>
                    <Col>
                        <Form.Group controlId="firstName">
                            <Form.Control type="name" placeholder="First name" value={user.firstName} onChange={onChangeHandler} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="lastName">
                            <Form.Control type="name" placeholder="Last name" value={user.lastName} onChange={onChangeHandler} />
                        </Form.Group>
                    </Col>
                </Form.Row>
                <Form.Text className="text-muted">
                    This is the name your peers will see for your book listings. <span style={{color: "red"}}>{errors.firstName}</span>
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={user.email} onChange={onChangeHandler} />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else. <span style={{color: 'red'}}>{errors.email}</span>
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={user.password} onChange={onChangeHandler} />
                <Form.Text className="text-muted">
                    Password must be 8-32 characters long, and must include uppercase and lowercase, a number and a special character. <span style={{color: "red"}}>{errors.password}</span>
                </Form.Text>
            </Form.Group>
            <Form.Group controlId="school">
                <Form.Label>School</Form.Label>
                <Form.Control type="school" placeholder="Search for your school" value={user.school} onChange={onChangeHandler} />
                <Form.Text className="text-muted">This is where you expect to be buying and selling books. <span style={{color: "red"}}>{errors.school}</span></Form.Text>
            </Form.Group>
            <Button id = "reg-submit-button" variant="primary" type="submit" disabled>
                Submit
            </Button>
        </Form>
    );
}

export default Register;