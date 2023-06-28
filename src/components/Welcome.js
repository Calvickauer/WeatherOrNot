import React from 'react';
import WeatherApi from './Weather';

const Welcome = () => {
    return (
        <div>
            <h1>Weather or Not</h1>
            <p>Lets check the weather!</p>
            < WeatherApi />
        </div>
    )
}

export default Welcome;