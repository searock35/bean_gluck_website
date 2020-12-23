import React from "react";
import { Alert } from "react-bootstrap";

/**
 * An alert designed to give feedback based on API calls. Can be given a status and a message.
 * If given a status of 0, no response was given. Notify user they are offline.
 *
 * @param {*} props
 */
const ResponseStatusAlert = (props) => {
    // props.status
    // props.message

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
            message = "You must be logged in to perform this action.";
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

    if (props.status) {
        return <Alert variant={variant}>{message}</Alert>;
    } else {
        return null;
    }
};

export default ResponseStatusAlert;
