import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        /*axios
            .get("api/user/roles")
            .then((response) => {
                setRoles(response.data);
            })
            .catch((error) => {
                console.log(error);
            });*/
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const data = Object.fromEntries(form.entries());
        const selectedRoles = Array.from(
            document.getElementById("roles").selectedOptions
        ).map(({ value }) => value);
        register(
            data.username,
            data.email,
            data.password,
            data.confirm_password,
            selectedRoles
        )
            .then(function (response) {
                window.location.href = "index.html";
            })
            .catch(function (error) {
                alert(error.response.data.message);
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
                        <select id="roles" className="form-select" name="roles" multiple aria-label="select roles">
                            {roles.map((role) => (
                                <option key={role.name} value={role.name}>{role.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <Link to={"/login"} className="link">Already registered? Sign in</Link>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-class">Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
