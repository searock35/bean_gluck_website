import React, { useState, useContext, useEffect } from 'react';
import authAPI from '../../tools/api/authAPI';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import UserContext from '../../tools/react/UserContext';
import ResponseStatusAlert from '../pieces/ResponseStatusAlert';



function Login(props) {
    const [fields, setFields] = useState({
        username: "",
        password: "",
    });

    const [loginState, setLoginState] = useState()
    const [alertMessage, setAlertMessage] = useState()

    const history = useHistory();
    const currentUser = useContext(UserContext);

    function handleLoginEvent(e) {
        e.preventDefault();
        authAPI.login(fields.username, fields.password)
        .then(newUser => {
            setLoginState("200")
            currentUser.changeUserContext(newUser);
        })
        .catch(response => {
            setLoginState(response.status);
            if(response.data && response.data.non_field_errors) {
                setAlertMessage(response.data.non_field_errors[0])
            }
        })
    }

    const onChangeHandler = (e) => {
        const { id, value } = e.target;
        setFields({
            ...fields,
            [id]: value
        })
    }


    useEffect(() => {
        if(currentUser.isAuth) {
            if (currentUser.email === authAPI.getDefaultUser().email) {
                //for this case, usertoken is enabled but User is not actually logged in on client. This should never happen.
                authAPI.logout();
            } else {
                history.push("/")
        }}
    }, [currentUser, history])

    return (
        <Form onSubmit={handleLoginEvent}>
            <h1>User Login</h1>
            <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control placeholder="Enter Username" value={fields.username} onChange={onChangeHandler} />
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
            <ResponseStatusAlert status={loginState} message={alertMessage}/>
        </Form>
    )   
}


export default Login;