import React, { useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Redirect } from 'react-router-dom';
import setAuthToken from '../utils/setAuthToken';

const { REACT_APP_SERVER_URL } = process.env;

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userData = { email, password };
            const response = await axios.post(`${REACT_APP_SERVER_URL}/users/login`, userData);

            const { token } = response.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);

            const decoded = jwt_decode(token);
            props.nowCurrentUser(decoded);
        } catch (error) {
            console.log('===> Error on login', error);
            alert('Either email or password is incorrect. Please try again.');
        }
    }

    if (props.user) {
        return <Redirect to="/profile" />;
    }

    return (
        <div className="custom-login-container">
            <div className="custom-login-card">
                <h2 className="custom-login-heading">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="custom-form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" value={email} onChange={handleEmailChange} className="custom-form-control" />
                    </div>
                    <div className="custom-form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" value={password} onChange={handlePasswordChange} className="custom-form-control" />
                    </div>
                    <button type="submit" className="custom-submit-button">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
