import React, { useState } from 'react';
import { Form, Col, Button } from "react-bootstrap";

function Register() {

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        password: "",
        email: "",
        school: ""
    })

    const [errors, setErrors] = useState({
        ...user
    });

    const submitHandler = (e) => {
        e.preventDefault();
        console.log("Registered");
        //Add functionality later.
    }

    const onChangeHandler = (e) => {
        const { id, value } = e.target;
        setUser((user) => ({
            ...user,
            [id]: value
        }))
        
        validate({ [id]: value });

    }

    const setError = (name, value) => {
        setErrors({
            ...errors,
            [name]: value,
        })
    }

    const validate = values => {
      
        if (typeof values.firstName === "string") {
            if(values.firstName ==="") {
                setError("firstName", "Required");
            } else if (values.firstName === "admin") {
                setError("firstName", "Nice try!");
            }
        }
        
        if (typeof values.email === "string") {
            if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
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
      };

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
                    This is the name your peers will see for your book listings.
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
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
        // <div key="divKey">
        //     <form onSubmit={submitHandler} key="formkey">
        //         First Name:<input type="text" name="firstName" value={user.firstName} onChange={onChangeHandler}/>
        //         Last Name:<TextInput name="lastName" value={user.lastName} onChange={onChangeHandler}/>
        //         Password: <TextInput name="password" value={user.password} onChange={onChangeHandler}/>
        //     </form>
        // </div>
    );
}

export default Register;