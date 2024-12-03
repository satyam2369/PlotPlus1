import React, { useState } from 'react';
import './adminLogin.css'; // Ensure this is the correct path to your CSS file
import { Link, useNavigate } from "react-router-dom";

function AdminLogin() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
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
                        className="adminLogin_input" 
                        placeholder='Admin Email' 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                    <input 
                        type='password' 
                        className="adminLogin_input" 
                        placeholder='Admin Password' 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <button type='submit' className='adminLogin_submit-btn'>Login</button>
                </form>
                {/* <p className='adminLogin_signup_text'>Don't have an admin account?{' '}
                    <Link to="/admin/signup" className="adminLogin_signup-link">
                        Create Admin Account
                    </Link>
                </p> */}
                </div>
            </div>
        </div>
        </div>
    );
}

export default AdminLogin;
