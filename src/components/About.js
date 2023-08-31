import React from 'react';

const About = () => {
    return (
        <div className="about-container">
            <h1>About Weather or Not!</h1>
            <p className="intro-text">Welcome to <span className="highlight">Weather or Not!</span>, your all-in-one weather hub.</p>
            <p className="features-text">Get Ready to Explore:</p>
            <ul className="features-list">
                <li>Stay Informed: Check the current weather for your current location. Our weather updates are accurate and up-to-date, so you're always prepared for the day ahead.</li>
                <li>Discover New Places: Use our location search feature to explore weather conditions in different cities around the world. Plan your trips with confidence, whether it's a vacation or a business trip.</li>
                <li>Entertainment at Your Fingertips: Watch YouTube videos directly from our platform. Whether you're looking for travel inspiration or just want to relax, we've got a selection of videos to suit your interests.</li>
                <li>Connect with Others: Our messaging feature lets you reach out to other users who share your interests. Share your travel plans, weather updates, and more with the Weather or Not! community.</li>
            </ul>
            <p className="closing-text">At <span className="highlight">Weather or Not!</span>, we believe in providing you with the tools you need to make informed decisions and stay connected. Join us today and experience weather like never before.</p>
        </div>
    )
}

export default About;
