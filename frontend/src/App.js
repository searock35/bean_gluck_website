import React, { useState, useEffect } from "react";

//Styles
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

//Dependencies
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Components
import HomeNavbar from "./components/universal/HomeNavbar";
import Footer from './components/universal/Footer';
import Home from "./components/home/Home";
import UserRouter from "./tools/router/UserRouter";
import ProtectedRoute from "./tools/router/ProtectedRoute";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Donate from "./components/static/Donate";
import ListingsSearch from "./components/search/ListingsSearch";
import NewBookCreator from "./components/create/NewBookCreator";
import UserContext from "./tools/react/UserContext";
import Error from "./components/static/Error";
import authAPI from "./tools/api/authAPI";
import ListingCreator from "./components/create/ListingCreator";
import { Container } from "react-bootstrap";

function App() {
    const [userState, setUserState] = useState(authAPI.getDefaultUser());
    const [userLoading, setUserLoading] = useState(true);

    useEffect(() => {
        setUserLoading(true);
        authAPI
            .refreshUser()

            .then((user) => {
                setUserState(user);
                setUserLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setUserLoading(false);
            });
    }, []);

    return (
        <Router>
            <UserContext.Provider
                value={{
                    ...userState,
                    changeUserContext: (newUser) => setUserState(newUser),
                }}
            >
                <Container fluid>
                    <HomeNavbar />
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route path="/listings" component={ListingsSearch} />
                        <Route path="/create-listing" component={ListingCreator} />
                        <Route
                            path="/book-create/"
                            component={NewBookCreator}
                        />
                        <Route path="/donate" component={Donate} />
                        <ProtectedRoute path="/user/:username/" userLoading={userLoading}>
                            <UserRouter/>
                        </ProtectedRoute>
                        <Route path="/" component={Error} />
                    </Switch>

                    <Footer />
                </Container>
            </UserContext.Provider>
        </Router>
    );
}

export default App;
