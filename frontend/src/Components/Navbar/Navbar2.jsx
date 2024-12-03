import React, { useEffect, useState } from 'react';
import './navbar2.css';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import Login from '../Login/Login';

function Navbar2() {
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState();
    const [uid, setUid] = useState();
    const navigate = useNavigate(); // Initialize useNavigate for navigation

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const response = await fetch('http://localhost:4000/users/checkLogin', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
                const data = await response.json();
                console.log(data);
                if (data && data.name) { // Check if data exists and name is available
                    setUsername(data.name);
                    setUid(data.uid);
                    console.log(data.name);
                    console.log(data.uid);
                } else {
                    navigate('/login');

                }
            } catch (error) {
                console.log('Error checking login:', error);
                // navigate('/login'); 
            }
        };

        checkLogin();
    }, [navigate]); // Add navigate as a dependency'


    const handleLogout = () => {
        fetch('http://localhost:4000/users/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log("Logout successful");
                    setUsername(null);
                    navigate('/'); // Redirect to home after logout
                } else {
                    console.log("Logout failed");
                }
            })
            .catch(error => console.log('Error:', error));
    };
    // if(username == null || username == undefined) {return (<Login />);}

    return (
        <nav className="navbar2">
            <div className="navbar2-brand">
                <Link to={'/'} className='nav2_logo'>PlotPlus</Link>
            </div>
            <div className="navbar2-toggle" onClick={toggleNavbar}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul className={isOpen ? "navbar2-links open" : "navbar2-links"}>
                {username ? (
                    <>
                        <Link state={{ uid: uid, username: username }} to="/userprofile" className='navbar-a'>{username}</Link>
                        {/* <Link to={{ pathname: '/profile', state: { uid: user._id, username: user.name } }}>
  Go to Profile
</Link> */}

                        <button onClick={handleLogout} className='nav_logout_btn'>Logout</button>
                    </>
                ) : (
                    <>
                        <li className='nav2_signup_btn'><Link to="/signup" className='nav-sign'>Signup</Link></li>
                        <li className='nav2_login_btn'><Link to="/login" className='nav_btn'>Login</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar2;
