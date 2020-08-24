import React, { useState } from 'react';

//Styles
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

//Dependencies
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Components
import HomeNavbar from './common/HomeNavbar';
import Footer from './common/Footer';
import Home from './home/Home';
import UserRouter from './user/UserRouter';
import ProtectedRoute from './auth/ProtectedRoute';
import Login from './auth/Login';
import UserContext from './user/UserContext';
import getStoredUser from './common/getUserFromCookies';


function App() {
  const [userState, setUserState] = useState(getStoredUser());
  return (
    <Router>
      <UserContext.Provider value={{
        ...userState,
        changeUserContext: (newUser) => setUserState(newUser)
      }}>

        <div className="container-md">
          <HomeNavbar />

          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />   
            <ProtectedRoute path="/user/:username/" component={UserRouter} />
          </Switch>

          <Footer />
        </div>

      </UserContext.Provider>
    </Router>
  );
}

export default App;
