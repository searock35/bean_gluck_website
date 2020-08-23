import React, { useContext } from 'react';
import UserContext from '../user/UserContext';

function Footer () {
    const userContext = useContext(UserContext);
    return(
        <div className="container">
            <footer>
                Created by Jared Gluck and Corey Bean, {userContext.username}
            </footer>
        </div>

    )
}

export default Footer;
