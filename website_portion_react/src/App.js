import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeNavbar from './components/HomeNavbar';
// import Donate from './components/Donate';
import Footer from './components/Footer';
import Home from './components/Home';
// import BookResults from './components/BookResults';
import Profile from './userComponents/Profile';
import ProtectedRoute from './userComponents/ProtectedRoute.js';
import Login from './userComponents/Login';

// const defaultUser = {
//   username: 'Guest',
//   email: '',
//   id: '0',
//   isAuthenticated: false,
// }

const currentUser = {
  username: 'Searock35',
  email: 'searock35@gmail.com',
  id: '46843',
  isAuthenticated: true,
}

//somehow include functions to load in user information using cookies


function App() {
  return (
    <Router>
      <div className="container-md">
        <HomeNavbar school='' user={currentUser} ></HomeNavbar>
        <Switch>
          <Route path="/" exact component={Home} />

          <Route path="/login">   
            <Login />
          </Route> 

          <ProtectedRoute path="/profile">
            <Profile user={currentUser} />
          </ProtectedRoute>
        </Switch>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
