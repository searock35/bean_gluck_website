import React, { useState, useContext } from 'react';
import authAPI from '../../tools/api/authAPI';
import { Form, Button } from 'react-bootstrap';
import { Redirect, useHistory } from 'react-router-dom';
import UserContext from '../../tools/react/UserContext';
import getDefaultUser from '../../tools/getDefaultUser';


function Login(props) {
    const [fields, setFields] = useState({
        email: "",
        password: "",
    });

    const history = useHistory();
    const currentUser = useContext(UserContext);

    function loginCb(newUser) {
        currentUser.changeUserContext(newUser);
        history.goBack();
    }

    function handleLoginEvent(e) {
        e.preventDefault();
        authAPI.login(loginCb, fields.email, fields.password);
    }

    const onChangeHandler = (e) => {
        const { id, value } = e.target;
        setFields({
            ...fields,
            [id]: value
        })
    }

    if(authAPI.isAuth()) {
        if (currentUser.email === getDefaultUser().email) {
            //for this case, usertoken is enabled but User is not actually logged in on client. This should never happen.
            authAPI.logout();
            currentUser.changeUserContext(getDefaultUser());
        } else {
            return <Redirect to="/" />
    }}
    return (

        <Form onSubmit={handleLoginEvent}>
            <h1>User Login</h1>
            <Form.Group controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={fields.email} onChange={onChangeHandler} />
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={fields.password} onChange={onChangeHandler} />
                <Form.Text className="text-muted">
                    Reminder: Password is 8-32 characters long, and must include uppercase and lowercase, a number and a special character.
                </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
                Login
            </Button>
        </Form>
    )   
}


export default Login;