import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import axios from "axios";

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [availableRoles, setAvailableRoles] = useState([]);
    const [roles, setRoles] = useState([]);

    const [errorMessages, setErrorMessages] = useState([]);

    const user = useSelector(state => state.auth.user)

    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    useEffect(() => {
        axios
            .get(import.meta.env.VITE_API_URL + "/user/roles")
            .then((response) => {
                setAvailableRoles(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleRolesChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
        setRoles(selectedOptions);
    }

    const validate = (username, email, password, confirmPassword) => {
        let messages = [];
        if (password !== confirmPassword) {
            messages.push("Passwords do not match");
        }
        if (password.length < 6) {
            messages.push("Password must be at least 6 characters long");
        }
        if (username.length < 3) {
            messages.push("Username must be at least 3 characters long");
        }
        if (email.length < 3) {
            messages.push("Email must be at least 3 characters long");
        }
        setErrorMessages(messages);
        return messages.length === 0;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            username: username,
            email: email,
            password: password,
            roles: roles
        };
        
        if (!validate(username, email, password, confirmPassword)) {
            return;
        }

        axios
            .post(import.meta.env.VITE_API_URL + "/auth/signup", data)
            .then(() => {
                navigate("/login");
            })
            .catch((error) => {
                setErrorMessages([error.response.data.message]);
            });
    };

    return (
        <div className="container main">
            <div className="content">
                <h3 className="text-center signin-text mb-3">Sign Up</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" name="username" className="form-control" required value={username} onChange={handleUsernameChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" name="email" className="form-control" required value={email} onChange={handleEmailChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" name="password" className="form-control" required value={password} onChange={handlePasswordChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirm_password" className="form-label">Confirm Password</label>
                        <input type="password" name="confirm_password" className="form-control" required value={confirmPassword} onChange={handleConfirmPasswordChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="roles" className="form-label">Select your roles:</label>
                        <select id="roles" className="form-select" name="roles" multiple aria-label="select roles" onChange={handleRolesChange}>
                            {availableRoles.map((role) => (
                                <option key={role.name} value={role.name}>{role.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <Link to={"/login"} className="link">Already registered? Sign in</Link>
                    </div>
                    {errorMessages.map((message, index) => (
                        <div key={index} className="alert alert-danger" role="alert">
                            {message}
                        </div>
                    ))}
                    <div className="text-center">
                        <button type="submit" className="btn btn-class">Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
