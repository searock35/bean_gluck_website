import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div>
            404 Page not found. Return to home: <Link to="/" >Home</Link>
        </div>
    );
}

export default Error;
