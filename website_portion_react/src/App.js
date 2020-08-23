import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeNavbar from './common/HomeNavbar';
// import Donate from './components/Donate';
import Footer from './common/Footer';
import Home from './home/Home';
// import BookResults from './components/BookResults';
import Dashboard from './user/Profile';
import ProtectedRoute from './auth/ProtectedRoute';
import Login from './auth/Login';
import UserContext from './user/UserContext';
import getStoredUser from './common/getUserFromCookies';
import UserListings from './user/UserListings';









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
