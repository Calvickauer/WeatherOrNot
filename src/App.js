// Imports
import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';

// CSS
import './App.css';

// Components
import Signup from './components/Signup';
import About from './components/About';
import Footer from './components/Footer';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Welcome from './components/Welcome';
import WeatherComponent from './components/Weather';
import Countries from './components/Countries';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('jwtToken');
  console.log('===> Hitting a Private Route');

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
  // Set state values
  const [currentUser, setCurrentUser] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      let token = localStorage.getItem('jwtToken');

      if (!token) {
        setIsAuthenticated(false);
        console.log('====> Authenticated is now FALSE');
        console.log('change the app');
      } else {
        const decodedToken = jwt_decode(token);
        setAuthToken(token);
        setCurrentUser(decodedToken);
      }
    };

    checkAuth();
  }, []);

  const nowCurrentUser = (userData) => {
    console.log('===> nowCurrentUser is here.');
    setCurrentUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    if (localStorage.getItem('jwtToken')) {
      // Remove token from localStorage
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
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
