import React, { useEffect, useState } from 'react';
import Write from './Write';
import './WriteStory.css';
import Navbar2 from '../Navbar/Navbar2';
import { redirect, useNavigate } from 'react-router-dom';

function WriteStory() {
    const history = useNavigate();
    const [username, setUsername] = useState("");

    const [plotSuggestion, setPlotSuggestion] = useState('');
    const [plotSuggestion2, setPlotSuggestion2] = useState('');
    const [plotSuggestion3, setPlotSuggestion3] = useState('');
    const [plotSuggestion4, setPlotSuggestion4] = useState('');

    const [selectedGenre, setSelectedGenre] = useState('fantasy'); // Default genre
    const [loading, setLoading] = useState(false);

    const handleGenreChange = (e) => {
        setSelectedGenre(e.target.value);
    };

    const generatePlot = async () => {
        setLoading(true);
        try {
            // Plot Generator API
            const response = await fetch(`https://story-shack-cdn-v2.glitch.me/generators/writing-prompt-generator?genre=${selectedGenre}`);
            const data = await response.json();
            const response2 = await fetch(`https://story-shack-cdn-v2.glitch.me/generators/writing-prompt-generator?genre=${selectedGenre}`);
            const data2 = await response2.json();
            const response3 = await fetch(`https://story-shack-cdn-v2.glitch.me/generators/writing-prompt-generator?genre=${selectedGenre}`);
            const data3 = await response3.json();
            const response4 = await fetch(`https://story-shack-cdn-v2.glitch.me/generators/writing-prompt-generator?genre=${selectedGenre}`);
            const data4 = await response4.json();

            setPlotSuggestion(data.data.name);
            setPlotSuggestion2(data2.data.name);
            setPlotSuggestion3(data3.data.name);
            setPlotSuggestion4(data4.data.name);

        } catch (error) {
            console.error('Error generating plot:', error);
            setPlotSuggestion('Could not generate plot. Please try again later.');
        }
        setLoading(false);
    };

    useEffect(() => {
        generatePlot();
    }, []); // Empty dependency array to run only once

    if(username == null || username == undefined) return(<h1> Hii </h1>); 

    return (
        <>
            <Navbar2 />
        <div className="write-story-container">
            <div className='write-story-background'></div>
            <h1 className="write-story-title">Craft Your Tale</h1>
            <div className='write-story-divs'>

                <div className='write-story-div1'>

                    <label htmlFor="genre-select" className="genre-label">Choose Genre:</label>
                    <select id="genre-select" value={selectedGenre} onChange={handleGenreChange} className="genre-dropdown">
                        <option value="fantasy">Fantasy</option>
                        <option value="sci-fi">Sci-Fi</option>
                        <option value="mystery">Mystery</option>
                        <option value="romance">Romance</option>
                        <option value="horror">Horror</option>
                        <option value="thriller">Thriller</option>
                        <option value="historical">Historical</option>
                        <option value="adventure">Adventure</option>
                        <option value="comedy">Comedy</option>
                        <option value="drama">Drama</option>
                        <option value="dystopian">Dystopian</option>
                        <option value="paranormal">Paranormal</option>
                        <option value="urban-fantasy">Urban Fantasy</option>
                        <option value="cyberpunk">Cyberpunk</option>
                        <option value="steampunk">Steampunk</option>
                        <option value="post-apocalyptic">Post-Apocalyptic</option>
                        <option value="crime">Crime</option>
                        <option value="young-adult">Young Adult</option>
                        <option value="magical-realism">Magical Realism</option>
                        <option value="biography">Biography</option>
                        <option value="satire">Satire</option>
                        <option value="slice-of-life">Slice of Life</option>
                        <option value="western">Western</option>
                    </select>

                    <button onClick={generatePlot} className="generate-plot-button">
                        {loading ? 'Generating...' : 'Get Plot Suggestion'}
                    </button>

                    {plotSuggestion && (
                        <div className="plot-suggestion-box">
                            <h3>Plot Suggestion:</h3>
                            <div className='plots'>
                                <p>{plotSuggestion}</p>
                            </div>
                            <div className='plots'>
                                <p>{plotSuggestion2}</p>
                            </div>
                            <div className='plots'>
                                <p>{plotSuggestion3}</p>
                            </div>
                            <div className='plots'>
                                <p>{plotSuggestion4}</p>
                            </div>
                        </div>
                    )}
                </div>
                <div className='write-story-div2'>
                    <h2 className="story-form-heading">Write Your Story</h2>
                    <Write />
                </div>
            </div>
        </div>
    </>
    );
}

export default WriteStory;
