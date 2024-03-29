import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../slices/authSlice'
import axios from "axios";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const [errorMessages, setErrorMessages] = useState([]);

    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)

    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            username: username,
            password: password
        };
        axios
            .post(import.meta.env.VITE_API_URL + "/auth/signin", data)
            .then((response) => {
                dispatch(login(response.data));
                navigate("/");
            })
            .catch((error) => {
                setErrorMessages([error.response.data.message]);
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
                    {errorMessages.map((message, index) => (
                        <div key={index} className="alert alert-danger" role="alert">
                            {message}
                        </div>
                    ))}
                    <div className="text-center">
                        <button type="submit" className="btn btn-class">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
