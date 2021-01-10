import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../../../../tools/react/UserContext";
import { Button } from "react-bootstrap";

function UserInfo() {
    const history = useHistory();
    const userInfo = useContext(UserContext);
    const editRedirect = () => history.push("./" + userInfo.username + "/edit");

    return (
        <div className="profile-container">
            <ul>
                <li>
                    Name: {userInfo.first_name} {userInfo.last_name}
                </li>
                <li>Major: {userInfo.majors[0]}</li>
                <li>Graduating Year: {userInfo.grad_year}</li>
                <li>
                    Home City: {userInfo.home_city}{" "}
                    <Button onClick={editRedirect}>Edit</Button>
                </li>
            </ul>
        </div>
    );
}

export default UserInfo;
