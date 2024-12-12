import React, { useState } from 'react';
import './adminLogin.css'; 
import { Link, useNavigate } from "react-router-dom";

function AdminLogin() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({ username: "", password: "" });

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validateForm = () => {
        let isValid = true;
        let errors = { username: "", password: "" };

        if (!username) {
            errors.username = "Email is required.";
            isValid = false;
        } else if (!validateEmail(username)) {
            errors.username = "Please enter a valid email.";
            isValid = false;
        }

        if (!password) {
            errors.password = "Password is required.";
            isValid = false;
        } else if (password.length < 6) {
            errors.password = "Password must be at least 6 characters long.";
            isValid = false;
        }

        setError(errors);
        return isValid;
    };

    async function handleSubmit(event) {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        const adminData = {
            email: username,
            password: password,
        };

        try {
            const response = await fetch('http://localhost:4000/admin/adminLogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(adminData),
            });

            const data = await response.json();
            console.log(data);

            if (data.success) {
                console.log("Admin signed in");
                navigate("/adminDashboard", { state: { id: data.name } });
            } else {
                console.log("Admin login failed");
                alert(data.message);
            }
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="adminLogin-section">
            <h1 className='adminLogin_title'>Admin Login</h1>
            <div className='adminLogin'>
                <div className="admin-section">
                    <div className='adminLogin_wrapper'>
                        <form onSubmit={handleSubmit} className='adminLogin_form'>
                            <input
                                type='text'
                                className={`adminLogin_input ${error.username ? "error" : ""}`}
                                placeholder='Admin Email'
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            {error.username && <p className="error-text">{error.username}</p>}
                            
                            <input
                                type='password'
                                className={`adminLogin_input ${error.password ? "error" : ""}`}
                                placeholder='Admin Password'
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {error.password && <p className="error-text">{error.password}</p>}
                            
                            <button type='submit' className='adminLogin_submit-btn'>Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;
