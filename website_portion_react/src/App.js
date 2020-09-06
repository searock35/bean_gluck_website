import React, { useState } from 'react';

//Styles
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

//Dependencies
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Components
import HomeNavbar from './components/common/HomeNavbar';
import Footer from './components/common/Footer';
import Home from './components/home/Home';
import UserRouter from './components/user/UserRouter';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Donate from './components/donate/Donate';
import BookResults from './components/search/BookResults';
import UserContext from './components/user/UserContext';
import Error from './components/common/Error';
import authAPI from './components/auth/authAPI';
//import TestComponent from './TestComponent';

function App() {
  const initUser = authAPI.refreshUser();
  const [userState, setUserState] = useState(initUser);

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
            <Route path="/register" component={Register} />
            <Route path="/book-search/" component={BookResults} />
            <Route path="/donate" component={Donate} />
            <ProtectedRoute path="/user/:username/" component={UserRouter} />
            <Route path="/" component={Error} />
          </Switch>

          <Footer />
        </div>

      </UserContext.Provider>
    </Router>
  );
}

export default App;
