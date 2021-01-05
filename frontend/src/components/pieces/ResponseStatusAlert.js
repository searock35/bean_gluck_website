import React from "react";
import { Alert, Button } from "react-bootstrap";

/**
 * An alert designed to give feedback based on API calls. Can be given a status and a message.
 * If given a status of 0, no response was given. Notify user they are offline.
 *
 * @param {HTML | String} message An optional message to override the default message.
 * @param {Number} status The HTTP status to base the info off of
 */
const ResponseStatusAlert = (props) => {

    let variant = "warning";
    let message = "An unknown error occurred";


    switch (props.status) {
        case 200:
            variant = "success";
            message = "Success.";
            break;

        case 201:
            variant = "success";
            message = "Successfully created.";
            break;

        case 401:
            message = <div>You must be logged in to perform this action. <Button onClick={() => document.getElementById("navbar-login-button").click()}>Login</Button></div>

            break;

        case 400:
            message = "Bad Request.";
            break;

        case 500:
            message = "Server error. Please try and refresh this page.";
            break;

        case 0:
            message = "Could not connect to server. Try again later.";
            break;

        default:
            break;
    }

    if (!!props.message) message = props.message;
    if (typeof message === "string") message = <div>{message}</div>

    if (typeof props.status === "number") {
        return <Alert variant={variant}>{message}</Alert>;
    } else {
        return null;
    }
};

export default ResponseStatusAlert;
