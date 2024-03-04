import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from '../slices/authSlice'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    console.log(user)

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const data = Object.fromEntries(form.entries());
        login(data.username, data.password)
            .then(function (response) {
                navigate("/");
            })
            .catch(function (error) {
                alert(error.response.data.message);
            });
    };

    return (
        <div className="container main">
            <div className="content">
                <h3 className="text-center signin-text mb-3">Sign In</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" name="username" className="form-control" required value={username} onChange={handleUsernameChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" name="password" className="form-control" required value={password} onChange={handlePasswordChange} />
                    </div>
                    <div className="mb-3">
                        <Link to={"/register"} className="link">Not registered? Sign up</Link>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-class">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
