import React, { useState } from 'react';
import './signup.css';
import signup from '../../Assets/signup.png';
import { Link, useNavigate } from "react-router-dom";
import { FaUpload } from 'react-icons/fa';

function SignUp() {
  const navigate = useNavigate();

  // State to store input values
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  // State to store validation errors
  const [errors, setErrors] = useState({});
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);
  const [isEmailAvailable, setIsEmailAvailable] = useState(true);

  // Functions to handle input changes
  const handleChange = (e) => {
    setUserName(e.target.value);
    checkUsernameAvailability(e.target.value);
  };
  const handleChange1 = (e) => {
    setEmail(e.target.value);
    checkEmailAvailability(e.target.value);
  };
  const handleChange2 = (e) => setPassword(e.target.value);
  const handleChange3 = (e) => setConfirmPassword(e.target.value);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
  };

  const checkUsernameAvailability = async (username) => {
    try {
      const response = await fetch(`https://plotplus1.onrender.com/users/checkUsername`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: username })
      });
      const data = await response.json();

      if (response.status === 400) {
        setIsUsernameAvailable(false);
        setErrors(prev => ({ ...prev, username: "Username already taken" }));
      } else {
        setIsUsernameAvailable(true);
        setErrors(prev => ({ ...prev, username: "" }));
      }
    } catch (error) {
      console.error("Error checking username: ", error);
    }
  };

  const checkEmailAvailability = async (email) => {
    try {
      const response = await fetch(`https://plotplus1.onrender.com/users/checkEmail`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email })
      });
      const data = await response.json();

      if (response.status === 400) {
        setIsEmailAvailable(false);
        setErrors(prev => ({ ...prev, email: "Email already taken" }));
      } else {
        setIsEmailAvailable(true);
        setErrors(prev => ({ ...prev, email: "" }));
      }
    } catch (error) {
      console.error("Error checking email availability: ", error);
    }
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!username) {
      formErrors.username = "Username is required";
      isValid = false;
    } else if (!isUsernameAvailable) {
      formErrors.username = "Username already taken";
      isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
      formErrors.email = "Please enter a valid email";
      isValid = false;
    } else if (!isEmailAvailable) {
      formErrors.email = "Email already taken";
      isValid = false;
    }

    if (password.length < 6) {
      formErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (password !== confirmPassword) {
      formErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleForm = (event) => {
    event.preventDefault();

    if (validateForm()) {
      const formData = new FormData();
      formData.append("name", username);
      formData.append("email", email);
      formData.append("password", password);
      if (profilePic) formData.append("profilePic", profilePic);

      fetch(`https://plotplus1.onrender.com/users/signup`, {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          navigate('/login');
        })
        .catch(e => {
          console.log(e);
        });

      setUserName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      console.log("Signup form submitted");
    }
  };

  return (
    <div className='SignUp'>
      <h1 className='signup_title'>Exciting Stories Await! Join PlotPlus</h1>
      <div className='signup_parent'>
        <div className='wrapper_signup'>
          <div className='left_signup'>
            <div className='signup_pic'>
              <img src={signup} alt='signup' />
            </div>
          </div>
          <div className='center'>
            {/* <div className='line' /> */}
          </div>
          <div className='right_signup'>
            {/* Signup Form */}
            <form onSubmit={handleForm}>
              <label>
                <input
                  type='text'
                  className="input_signup"
                  placeholder='Name'
                  name='username'
                  onChange={handleChange}
                  value={username}
                />
              </label>
              {errors.username && <span className='error'>{errors.username}</span>}
              <br />
              <div className='profile-pic-parent'>
                <label>Profile Image</label>
                <label className='custom-upload-button' htmlFor="profilePic">
                  <FaUpload className="upload-icon" />
                  Upload
                </label>
                <input
                  id="profilePic"
                  type="file"
                  name="profilePic"
                  className="input_signup"
                  onChange={handleProfilePicChange}
                  style={{ display: 'none' }}
                />
                {errors.profilePic && <span className='error'>{errors.profilePic}</span>}
              </div>
              <br />

              <label>
                <input
                  type='text'
                  className="input_signup"
                  placeholder='email@gmail.com'
                  name='email'
                  onChange={handleChange1}
                  value={email}
                />
              </label>
              {errors.email && <span className='error'>{errors.email}</span>}
              <br />

              <label>
                <input
                  type='password'
                  className="input_signup"
                  placeholder='Password'
                  name='password'
                  onChange={handleChange2}
                  value={password}
                />
              </label>
              {errors.password && <span className='error'>{errors.password}</span>}
              <br />

              <label>
                <input
                  type='password'
                  className="input_signup"
                  placeholder='Confirm Password'
                  name='confirmPassword'
                  onChange={handleChange3}
                  value={confirmPassword}
                />
              </label>
              {errors.confirmPassword && <span className='error'>{errors.confirmPassword}</span>}
              <br />

              <input className='submit-btn2 color-blue2' type="submit" value="SUBMIT" />
            </form>

            <p className='signup-lastLine'>Been Here Before?{' '}
              <Link to="/login" className="login-link">
                Log in and Continue Your Story!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
