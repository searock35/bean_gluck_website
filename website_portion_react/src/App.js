import React, { useState } from 'react';

//Styles
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

//Dependencies
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Components
import HomeNavbar from './components/universal/HomeNavbar';
import Footer from './components/universal/Footer';
import Home from './components/home/Home';
import UserRouter from './tools/router/UserRouter';
import ProtectedRoute from './tools/router/ProtectedRoute';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Donate from './components/static/Donate';
import BookResults from './components/search/ListingsResults';
import UserContext from './tools/react/UserContext';
import Error from './components/static/Error';
import authAPI from './tools/api/authAPI';
import { Container } from 'react-bootstrap';
import Test from './Test';

function App() {
  const initUser = authAPI.refreshUser();
  const [userState, setUserState] = useState(initUser);

  return (
    <Router>
      <UserContext.Provider value={{
        ...userState,
        changeUserContext: (newUser) => setUserState(newUser)
      }}>

        <Container fluid>
          <HomeNavbar />
          <Test />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/book-search/" component={BookResults} />
            <Route path="/donate" component={Donate} />
            <ProtectedRoute path="/user/:username/" component={UserRouter} />
            <Route path="/" component={Error} />
          </Switch>

          <Footer />
        </Container>

      </UserContext.Provider>
    </Router>
  );
}

export default App;
