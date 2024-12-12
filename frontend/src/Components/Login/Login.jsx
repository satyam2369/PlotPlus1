import React, { useEffect, useState } from 'react';
import google from '../../Assets/google.png';
import facebook from '../../Assets/facebook.png';
import github from '../../Assets/github.png';
import './login.css';
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useUser } from './UserContext';

import { IoArrowBack } from 'react-icons/io5'; // Import the back icon


function Login() {
    const history = useNavigate();
    // const { setUser } = useUser(); // Get setUser from context
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
        const userData = {
            email: username,
            password: password,
        };

        try {
            const response = await fetch('http://localhost:4000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // For cookies
                body: JSON.stringify(userData),
            });

            const data = await response.json();
            console.log(data);

            if (data.success) {
                console.log("signed");
                history("/", { state: { id: data.name } }); // Navigate to home, sending name in state
            } else {
                console.log("not sig");
                alert(data.message); // Use the message from the server
            }
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className='login'>
            
            <Link to='/' className='Back_to_home'><IoArrowBack className='back_icon'/>Back</Link>
            <h1 className='login_title'>Choose a Login Method</h1>
            <div className='wrapper'>
                <div className='left'>
                    <div className='login_button google' onClick={() => window.location.href = 'http://localhost:4000/auth/google'}>
                        <img src={google} alt="google" className='icons' />
                        Google
                    </div>
                    <div className='login_button facebook' onClick={() => window.location.href = '/auth/facebook'}>
                        <img src={facebook} alt="facebook" className='icons' />
                        Facebook
                    </div>
                    <div className='login_button github' onClick={() => window.location.href = '/auth/github'}>
                        <img src={github} alt="github" className='icons' />
                        GitHub
                    </div>
                </div>
                <div className='center'>
                    <div className='line' />
                    <div className='or'>OR</div>
                </div>
                <div className='right'>
                    <form onSubmit={handleSubmit}>
                        <input 
                            type='text' 
                            className="input_login" 
                            placeholder='Username' 
                            onChange={(e) => setUsername(e.target.value)} 
                        />
                        <input 
                            type='password' 
                            className="input_login" 
                            placeholder='Password' 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                        <button type='submit' className='submit-btn color-blue'>Submit</button>
                    </form>
                    <p className='Login_text'> Don't have an account?{' '}
                        <Link to="/signup" className="signup-link">
                            Join the Adventure!
                        </Link>
                    </p>
                    <p> Are You an Admin ?{' '}
                        <Link to="/adminLogin" className="signup-link">
                            Login Here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
