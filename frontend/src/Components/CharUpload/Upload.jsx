import React, { useEffect, useState } from 'react';
import './Upload.css';  // Importing CSS
import { FaUpload, FaTimes } from 'react-icons/fa';  // Importing an upload and cancel icon from react-icons
import CharCard from './CharCard';
import Navbar2 from '../Navbar/Navbar2';
const Upload = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [charImage, setCharImage] = useState('');
  const [imagePreview, setImagePreview] = useState(null);  // State to store image preview URL
  const [authorId, setAuthorId] = useState("");
  const [Data, setData] = useState([]);

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleGenre = (e) => {
    setGenre(e.target.value);
  };

  const handleImageUpload = (e) => {
    setCharImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));  // Generate a preview URL for the image
  };

  const handleImageCancel = () => {
    setCharImage(null);
    setImagePreview(null);  // Remove the preview
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
          setAuthorId(data.uid);
        }
    })
    .catch(error => console.log('Error checking login:', error));
}, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('genre', genre);
    formData.append('charImage', charImage);
    formData.append('authorId', authorId);
  
    // Handle form submission logic
    fetch(`https://plotplus1.onrender.com/character/charUpload`, {
      method: 'POST',
      body: formData,  // Automatically sets the appropriate headers for file uploads
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  };


useEffect(() => {
  fetch("https://plotplus1.onrender.com/character/allCharacter")
    .then((response) => response.json())
    .then((data) => {
      setData(data);
    });
}, []);
console.log(Data);
  

  return (
    <div className="char-upload-container">
      <Navbar2 />
      <div className='char-background'></div>
    <div className="char-upload-main-heading">Bring Your Character to Life</div>
    <div className="char-upload-parent">
      <div className="char-upload-left">
      {typeof Data.length === 0 ? (
          <p>loding</p>
        ) : (
          Data.map((character, i) => (
            <CharCard
                key={parseInt(i)}
                inx={i}
                charImage={character.charImage}
                name={character.name}
                description={character.description}
                genre={character.genre}
                createdAt={character.createdAt}

              />
          ))
        )}

      </div>
      <div className="char-upload-right">
        <div className="character-upload">
          <h1 className="form-title">Upload Your Character</h1>
          <form className="character-form" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="form-group">
              <label htmlFor="name" className="form-label">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-input"
                value={name}
                onChange={handleName}
                placeholder="Enter character name"
                required
              />
            </div>

            {/* Description */}
            <div className="form-group">
              <label htmlFor="description" className="form-label char-description">Description:</label>
              <textarea
                id="description"
                name="description"
                className="form-textarea"
                value={description}
                onChange={handleDescription}
                placeholder="Describe your character"
                required
              />
            </div>

            {/* Genre */}
            <div className="form-group">
              <label htmlFor="genre" className="form-label">Genre:</label>
              <select
                id="genre"
                name="genre"
                className="form-select"
                value={genre}
                onChange={handleGenre}
                required
              >
                <option value="">Select Genre</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Horror">Horror</option>
                <option value="Action">Action</option>
              </select>
            </div>

            {/* Image Upload */}
            <div className="form-group">
              <label htmlFor="image" className="form-label">Upload Image:</label>
              <label htmlFor="image" className="custom-file-upload">
                <FaUpload className="upload-icon" /> Choose File
              </label>
              <input
                type="file"
                id="image"
                name="charImage"
                className="form-file"
                accept="image/*"
                // multiple
                onChange={handleImageUpload}
                required
              />
            </div>

            {/* Image Preview and Cancel */}
            {imagePreview && (
              <div className="image-preview-container">
                <img src={imagePreview} alt="Image Preview" className="image-preview" />
                <button type="button" className="cancel-button" onClick={handleImageCancel}>
                  <FaTimes className="cancel-icon" /> Cancel
                </button>
              </div>
            )}

            {/* Submit Button */}
            <div className="form-group">
              <button type="submit" className="form-button">Submit Character</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Upload;
