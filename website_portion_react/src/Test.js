import React from 'react'
import { Button } from 'react-bootstrap'
import axios from 'axios'

const buttonHandler = (e) => {
    e.preventDefault();
    axios.get('http://localhost:8080/searock35?TEST')
        .then( (response) => {
            console.log(response)
        }, 
        (error) => {
            console.log(error);
        });
}



function Test() {
    return (
        <div>
            <Button onClick={buttonHandler}>Click me to test the API!</Button>
        </div>
    )
}

export default Test
