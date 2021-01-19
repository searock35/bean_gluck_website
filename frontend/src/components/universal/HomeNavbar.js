import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import auth from "../../tools/api/authAPI";
import UserContext from "../../tools/react/UserContext";
import AuthModal from "../auth/AuthModal";
import NavbarSearch from "./NavbarSearch";

/**
 * Returns the global navbar.
 */
const HomeNavbar = () => {
    const history = useHistory();

    const [modalMode, setModalMode] = useState("hide");
    const [userLinksActive, setUserLinksActive] = useState(false);
    const currentUser = useContext(UserContext);

    const handleNavLinks = (reference) => {
        switch (reference) {
            case "home":
                history.push("/")
                break;

            case "logout":
                auth.logout();
                history.push("/");
                break;

            case "dashboard":
                if (auth.isAuth()) history.push(`/user/${auth.user.username}`);
                else setModalMode("login");
                break;

            case "login":
                if (!auth.isAuth()) setModalMode("login");
                break;

            case "register":
                if (!auth.isAuth()) setModalMode("register");
                break;

            default:
                console.log(reference)
                break;
        }
    };
    return (
        <div className="navbar">
            <h1 className="navbar-link main-logo">TextTrader</h1>
            <div className="navbar-link" onClick={() => handleNavLinks("home")}>Home</div>
            <div className="navbar-link" onClick={() => handleNavLinks("dashboard")}>Dashboard</div>
            <NavbarSearch />
            <div className="school-select">
                <img
                    className="navbar-school-logo"
                    src="https://via.placeholder.com/100x50"
                    alt="School logo"
                />
                <div className="navbar-link change-link">Change</div>
            </div>
            <div className="navbar-user-settings" hidden={!auth.isAuth()}>
                {/* In the future, replace image source with context user link */}
                <div>{currentUser.first_name}</div>
                <img
                    className="navbar-profile-pic"
                    src="https://via.placeholder.com/45"
                    alt="Current User"
                />
                <ul
                    className="burger-list"
                    onClick={() => setUserLinksActive(!userLinksActive)}
                >
                    <li className="burger-slice" />
                    <li className="burger-slice" />
                    <li className="burger-slice" />
                </ul>
                <ul
                    classname="navbar-user-links"
                    hidden={userLinksActive || !auth.isAuth()}
                >
                    <li onClick={() => handleNavLinks("dashboard")}>
                        Dashboard
                    </li>
                    <li onClick={() => handleNavLinks("logout")}>Logout</li>
                </ul>
            </div>
            <div className="navbar-auth-links" hidden={auth.isAuth()}>
                <div
                    className="navbar-login"
                    onClick={() => handleNavLinks("login")}
                >
                    Login
                </div>
                <div
                    className="navbar-register"
                    onClick={() => handleNavLinks("register")}
                >
                    Register
                </div>
            </div>

            <AuthModal mode={modalMode} setMode={setModalMode} />
        </div>
    );
};

export default HomeNavbar;
