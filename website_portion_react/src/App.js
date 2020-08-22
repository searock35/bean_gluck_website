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
import ProtectedRoute from './userComponents/ProtectedRoute';
import Login from './userComponents/Login';
import UserContext from './userComponents/UserContext';
import storedUser from './userComponents/api/getUserFromCookies';



//import last known user using cookies
const currentUser = {
  ...storedUser
}


function App() {
  return (
    <Router>
      <UserContext.Provider value={currentUser}>
        <div className="container-md">
          <HomeNavbar school='' ></HomeNavbar>
          <Switch>
            <Route path="/" exact component={Home} />

            <Route path="/login">   
              <Login />
            </Route> 

            <ProtectedRoute path="/profile">
              <Profile/>
            </ProtectedRoute>

          </Switch>

          <Footer />
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
