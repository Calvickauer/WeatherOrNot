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
        <div className="row mt-4">
            <div className="col-md-7 offset-md-3">
                <div className="card card-body">
                    <h2 className="py-2">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" value={email} onChange={handleEmailChange} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" value={password} onChange={handlePasswordChange} className="form-control" />
                        </div>
                        <button type="submit" className="btn btn-primary float-right">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
