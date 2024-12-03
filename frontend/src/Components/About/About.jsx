import React from 'react';
import './About.css'; 
import collageImage from '../../Assets/about2.jpg'; 

const About = () => {
    return (
        <section className="about-section" id="about">
            <div className="about-container">
                <div className="about-text">
                    <h2>About PlotPlus</h2>
                    <p>
                        PlotPlus is where stories come to life. Our platform empowers storytellers to share their imagination and connect with a supportive community. Whether you’re writing your first story or crafting an epic novel, PlotPlus is the home for your creativity.
                    </p>
                    <div className="features">
                        <h3>Why PlotPlus?</h3>
                        <ul>
                            <li>Effortlessly upload and showcase your stories</li>
                            <li>Receive valuable feedback from a supportive community</li>
                            <li>Easily organize your stories into chapters and series</li>
                            <li>Access powerful tools to enhance your storytelling craft</li>
                            <li>Explore diverse genres and storytelling styles</li>

                        </ul>
                    </div>
                </div>

                <div className="about-image">
                    <img src={collageImage} alt="About PlotPlus" className="about-collage" />
                </div>
            </div>
        </section>
    );
};

export default About;
