import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Editor } from '@tinymce/tinymce-react';
import { FaUpload } from 'react-icons/fa';

import './Write.css';

function Write() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [authorId, setAuthorId] = useState('');

  const [categories, setCategory] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [coverImagePreview, setCoverImagePreview] = useState(null); // For preview
  const [content, setContent] = useState('');

  const [saveImage, setSaveImage] = useState('');

  const [successMessage, setSuccessMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);


  const Storycategories = [
    { label: 'Adventure', value: 'Adventure' },
    { label: 'Fantasy', value: 'Fantasy' },
    { label: 'Science Fiction', value: 'Science Fiction' },
    { label: 'Romance', value: 'Romance' },
    { label: 'Mystery', value: 'Mystery' },
    { label: 'Horror', value: 'Horror' },
    { label: 'Historical Fiction', value: 'Historical Fiction' },
    { label: 'Drama', value: 'Drama' },
    { label: 'Action', value: 'Action' },
    { label: 'Comedy', value: 'Comedy' },
    { label: 'Animal Tales', value: 'Animal Tales' },
    { label: 'Spy/Espionage', value: 'Spy/Espionage' },
    { label: "Children's Literature", value: "Children's Literature" },
    { label: 'Literary Fiction', value: 'Literary Fiction' },
    { label: 'Magical Realism', value: 'Magical Realism' },
    { label: 'Western', value: 'Western' },
    { label: 'Biography/Autobiography', value: 'Biography/Autobiography' },
    { label: 'Non-Fiction', value: 'Non-Fiction' },
    { label: 'Psychological Thriller', value: 'Psychological Thriller' },
    { label: 'Post-Apocalyptic', value: 'Post-Apocalyptic' },
    { label: 'Fairy Tale Retelling', value: 'Fairy Tale Retelling' },
    { label: 'Paranormal Romance', value: 'Paranormal Romance' },
    { label: 'Spy Thriller', value: 'Spy Thriller' },
    { label: 'Hard Science Fiction', value: 'Hard Science Fiction' },
    { label: 'Epic Fantasy', value: 'Epic Fantasy' },
    { label: 'Legal Drama', value: 'Legal Drama' },
    { label: 'Sports Fiction', value: 'Sports Fiction' },
    { label: 'Folklore/Mythology', value: 'Folklore/Mythology' },
    { label: 'Historical Fantasy', value: 'Historical Fantasy' },
    { label: 'Alien Invasion', value: 'Alien Invasion' },
    { label: 'Mythopoeic Fantasy', value: 'Mythopoeic Fantasy' },
    { label: 'Technothriller', value: 'Technothriller' },
    { label: 'Political Thriller', value: 'Political Thriller' },
    { label: 'Crossover', value: 'Crossover' },
    { label: 'Tragedy', value: 'Tragedy' },
    { label: 'Survival', value: 'Survival' },
    { label: 'Spirituality', value: 'Spirituality' },
    { label: 'Social Commentary', value: 'Social Commentary' },
    { label: 'Morality Tales', value: 'Morality Tales' },
    { label: "Hero’s Journey", value: "Hero’s Journey" },
    { label: 'Friendship', value: 'Family' },
  ]
  const handleTitle = (e) => {
    setTitle(e.target.value);
  }
  const handleAuthor = (e) => {
    setAuthor(e.target.value);
  }
  const handleCategory = (e) => {
    const arr = e.map(option => option.value);
    setCategory(arr);
    console.log(arr);
  }
  // Handle cover image selection, show a preview
  const handleCoverImage = (e) => {
    const file = e.target.files[0];
    setCoverImage(file);
    setCoverImagePreview(URL.createObjectURL(file)); // Generate preview URL
  }

  // Remove the selected cover image
  const removeCoverImage = () => {
    setCoverImage(null);
    setCoverImagePreview(null);
  }

  const handleEditorChange = (newContent) => {
    setContent(newContent);
  };

  const submitStory = (e) => {
    e.preventDefault();
    const story = {
      title, author,authorId, categories, 'coverImage': saveImage, content
    }
    console.log(story);

    const formData = new FormData();
    formData.append('coverImage', coverImage); // Add the image to the form data

    fetch(`http://localhost:4000/story/uploadStoryImages`, {
      method: 'POST',
      // headers: {
      //   "Content-Type" : "multipart/form-data"
      // },
      // body: {coverImage}
      body: formData
    }).then(res => {
      if (!res.ok) {
        throw new Error(`Server Erro: ${res.status} - ${res.statusText}`);
      }
      return res.json();
    }).then((data) => {
      if (!data.location) {
        throw new Error('No location in the server response');
      }
      setSaveImage(data.location);
      story.coverImage = data.location;

      // API call to submit the story
      fetch(`http://localhost:4000/story/uploadStory`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(story)
      })
        // .then(res => res.json())
        .then(res => {
          if (!res.ok) {
            // Handle errors here - for instance, log the status and text
            throw new Error(`Server Error: ${res.status} - ${res.statusText}`);
          }
          return res.json(); // Parse JSON response if successful
        })
        .then(data => {
          console.log('Story submitted:', data);
          setSuccessMessage('Story submitted successfully!');
          setShowPopup(true); // Show popup on successful submission

        })
        .catch(error => {
          console.error('Error submitting story:', error);
        });

    })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  useEffect(() => {
    fetch('http://localhost:4000/users/checkLogin', {
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
          setAuthor(data.name);
        }
    })
    .catch(error => console.log('Error checking login:', error));
}, []);

  const closePopup = () => {
    setShowPopup(false);
    setTitle(''); // Reset title
    setAuthor(''); // Reset author
    setCategory([]); // Reset categories
    setCoverImage(null);
    setCoverImagePreview(null);
    setContent(''); // Reset content
  };

  return (
    <div className='write_popup'>
      <div className="write-page">
        {/* Popup modal for success message */}
        {showPopup && (
          <div className="popup">
            <div className="popup-inner">
              <h2>{successMessage}</h2>
              <button onClick={closePopup}>Close</button>
            </div>
          </div>
        )}
        {/* <h1 className="page-title">Write Your Story</h1> */}
        <div className="write-page-form">
          <label className='write-label'>Give Your Story a Title</label>
          <input type='text' className='write-input' name="title" onChange={handleTitle} required />
          <div className='parent-author-category'>

            <div className='author-category-div2'>
              <label className='write-label label-category'>Category</label>
              <Select className='write-input-category'
                options={Storycategories}
                isMulti
                name='categories'
                onChange={handleCategory}
              />
            </div>
          </div>
          <div className='write-cover-image'>
            <label className='write-label'>Cover Image</label>
            <label className='custom-upload-button' htmlFor="coverImageInput">
              <FaUpload className="upload-icon" />
              Upload
            </label>
            <input
              id="coverImageInput"
              type="file"
              name="coverImage"
              onChange={handleCoverImage}
              style={{ display: 'none' }} // Hide the actual input
            />
            {coverImagePreview && (
              <div className="write-cover-image-preview">
                <img src={coverImagePreview} alt="Preview" style={{ maxWidth: '100px' }} />
                <button onClick={removeCoverImage}>Remove</button>
              </div>
            )}
          </div>

          <label className='write-label' >Story Content </label>

          <Editor
            apiKey="3vb0t4chzjqi9du3vs8ww5y1rqpvo364ay0p8a95lvzaw1kk" // TinyMCE API key
            value={content}
            onEditorChange={handleEditorChange}
            init={{
              selector: "#editor",
              height: 500,
              toolbar_sticky: true,
              autosave_restore_when_empty: true,

              menubar: true,
              plugins: 'advlist autocorrect autolink autosave casechange charmap checklist codesample directionality editimage emoticons footnotes formatpainter help image insertdatetime link linkchecker lists markdown media mediaembed mergetags nonbreaking pagebreak permanentpen powerpaste searchreplace table tableofcontents autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste help wordcount emoticons textcolor colorpicker  tinymcespellchecker typography visualblocks visualchars wordcount',
              toolbar: 'undo redo spellcheckdialog | aidialog aishortcuts | blocks fontfamily fontsizeinput | fontselect fontsizeselect | forecolor backcolor | bold italic underline strikethrough | blockquote subscript superscript | alignleft aligncenter alignright alignjustify lineheight | bullist numlist outdent indent | link image media addcomment showcomments | emoticons | preview fullscreen | code help',
              paste_data_images: true,
              spellchecker_active: true,
              spellchecker_language: 'en_US',
              spellchecker_languages: 'English (United States)=en_US,English (United Kingdom)=en_GB,Danish=da,French=fr,German=de,Italian=it,Polish=pl,Spanish=es,Swedish=sv',

              file_picker_types: 'image',


              automatic_uploads: true,
              images_upload_url: 'http://localhost:4000/story/uploadStoryImages', // Your existing image upload route
              images_reuse_filename: true, // Reuse filenames on the server

              images_file_types: "jpeg,jpg",

              images_upload_handler: function (blobInfo, success) {
                let formData = new FormData();
                formData.append('file', blobInfo.blob(), blobInfo.filename());

                fetch('http://localhost:4000/story/uploadStoryImages', {
                  method: 'POST',
                  body: formData,
                })
                  .then((res) => {
                    if (!res.ok) {
                      throw new Error('Failed to upload image');
                    }
                    return res.json();
                  })
                  .then((data) => {
                    if (!data.location) {
                      throw new Error('No location in the server response');
                    }
                    Editor.activeEditor.insertContent(`<img src="${data.location}" alt="">`);
                    success(data.location); // Return the image URL (location)
                  })
                  .catch((error) => {
                    console.error('Error:', error);
                    // failure('Image upload failed.');
                  });
              },




              image_uploadtab: 'upload',
              image_caption: true,  // Enable captions for images
              image_title: true,    // Enable image titles for images
              content_style: 'img {max-width: 100%; height: auto;}',  // Ensure the image is responsive
              autosave_ask_before_unload: false,  // Disable autosave
              autosave_restore_when_empty: false,  // Prevent drafts from saving if the editor is empty
              relative_urls: false,
              remove_script_host: false,
              convert_urls: true
            }}
          />
          <button type="submit" onClick={submitStory} >Submit Story</button>
        </div>
      </div>
    </div>
  );
}

export default Write;
