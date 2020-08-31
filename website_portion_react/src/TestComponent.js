import React from 'react';
import cookiesAPI from './components/auth/cookiesAPI';


function TestComponent() {

    return (
        <div>
            <button onClick={() => console.log(cookiesAPI.getAuthTokenInCookies())}>Log Cookies</button>
        </div>
    )
}


export default TestComponent;