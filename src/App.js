import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';

import './App.css';

import Signup from './components/Signup';
import About from './components/About';
import Footer from './components/Footer';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Welcome from './components/Welcome';
import WeatherComponent from './components/Weather';
import Countries from './components/Countries';
import Teresa from './components/Teresa';
import Messages from './components/Messages'; 

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('jwtToken');

  return (
    <Route
      {...rest}
      render={(props) =>
        token ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

const App = () => {
  const [currentUser, setCurrentUser] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      let token = localStorage.getItem('jwtToken');

      if (!token) {
        setIsAuthenticated(false);
      } else {
        const decodedToken = jwt_decode(token);
        setAuthToken(token);
        setCurrentUser(decodedToken);
      }
    };

    checkAuth();
  }, []);

  const nowCurrentUser = (userData) => {
    setCurrentUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    if (localStorage.getItem('jwtToken')) {
      localStorage.removeItem('jwtToken');
      setCurrentUser(null);
      setIsAuthenticated(false);
    }
  };

  return (
    <Router>
      <div className="App">
        <Navbar handleLogout={handleLogout} isAuth={isAuthenticated} />
        <div className="container mt-5">
          <Switch>
            <Route path="/signup" component={Signup} />
            <Route
              path="/login"
              render={(props) => (
                <Login
                  {...props}
                  nowCurrentUser={nowCurrentUser}
                  setIsAuthenticated={setIsAuthenticated}
                  user={currentUser}
                />
              )}
            />
            <PrivateRoute
              path="/profile"
              component={Profile}
              user={currentUser}
              handleLogout={handleLogout}
            />
            <Route exact path="/" component={Welcome} />
            <Route path="/about" component={About} />
            <Route path="/weather" component={WeatherComponent} />
            <Route path="/countries" component={Countries} />
            <PrivateRoute
              path="/teresa"
              component={Teresa}
              user={currentUser}
              handleLogout={handleLogout}
            />
            <PrivateRoute
              path="/messages"
              component={Messages}
              user={currentUser}
              handleLogout={handleLogout}
            />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
