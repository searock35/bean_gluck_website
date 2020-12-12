import React from 'react';
import { Alert } from 'react-bootstrap';


const SuccessAlert = (props) => {
    let variant = "warning";
    let string = "An error occurred, no response from request API";
    if(props.success === "true") {
        variant = "success";
        string = "Listing request successful!";
    } else if (props.success === "authError") {
        variant = "warning";
        string = "Listing request failed. You need to be logged in to request a listing; login or register using the navbar above."
    } else {
        variant = "danger";
        string = props.success;
    }

    if(typeof props.success === "string") {
        return <Alert variant={variant}>{string}</Alert>
    } else {
        return null;
    }

}

export default SuccessAlert