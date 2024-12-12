import React, { useEffect, useState } from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState();
    const [uid, setUid] = useState();
    const [profilePic, setProfilePic] = useState(null); // New state for profile picture

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        fetch('https://plotplus1.onrender.com/users/checkLogin', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
        .then(response => response.json())
        .then(data => {
            console.log("User data:", data); 
            if (data) {
                setUsername(data.name);
                setUid(data.uid);
                const formattedProfilePic = data.profilePic ? `https://plotplus1.onrender.com/images/${data.profilePic}` : null;
            setProfilePic(formattedProfilePic);
            }
        })
        .catch(error => console.log('Error checking login:', error));
    }, []);
    

    const handleLogout = () => {
        fetch('https://plotplus1.onrender.com/users/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setUsername(null);
                setProfilePic(null); // Reset profile picture on logout
                window.location.href = '/';
            } else {
                console.log("Logout failed");
            }
        })
        .catch(error => console.log('Error:', error));
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">PlotPlus</div>
            <div className="navbar-toggle" onClick={toggleNavbar}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul className={isOpen ? "navbar-links open" : "navbar-links"}>
                <li><a href="#about" className="navbar-a">Our Story</a></li>
                <li><Link to='/read' className="navbar-a">Read</Link></li>
                <li><Link to='/write' className="navbar-a">Write</Link></li>
                <li><Link to='/upload' className="navbar-a">Upload</Link></li>
                {username ? (
                    <>
                        <li>
                            {profilePic && (
                                <img src={profilePic} alt="Profile" className="profile-pic" />
                            )}
                            <Link state={{ uid, username }} to="/userprofile" className='navbar-a'>
                                {username}
                            </Link>
                        </li>
                        <button onClick={handleLogout} className='nav_logout_btn'>Logout</button>
                    </>
                ) : (
                    <>
                        <li className='nav_signup_btn'><Link to="/signup" className='nav-sign'>Signup</Link></li>
                        <li className='nav_login_btn'><Link to="/login" className='nav_btn'>Login</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
