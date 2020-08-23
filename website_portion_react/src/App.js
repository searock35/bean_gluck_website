import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeNavbar from './components/HomeNavbar';
// import Donate from './components/Donate';
import Footer from './components/Footer';
import Home from './components/Home';
// import BookResults from './components/BookResults';
import Dashboard from './userComponents/Profile';
import ProtectedRoute from './userComponents/ProtectedRoute';
import Login from './userComponents/Login';
import UserContext from './userComponents/UserContext';
import getStoredUser from './userComponents/api/getUserFromCookies';
import UserListings from './userComponents/UserListings';









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
            <Route path="/login">   
              <Login />
            </Route> 
            <ProtectedRoute path="/user/:username/dashboard">
              <Dashboard/>
            </ProtectedRoute>
            <ProtectedRoute path="/user/:username/my-listings">
              <UserListings/>
            </ProtectedRoute>

          </Switch>

          <Footer />
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
