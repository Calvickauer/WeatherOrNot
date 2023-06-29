import React from 'react';
import WeatherApi from './Weather';

const Welcome = () => {
    return (
        <div>
            <h1>Weather or Not!</h1>
            <p>Lets check the weather!</p>
            <div className='weatherApi__container'>
                < WeatherApi />
            </div>
        </div>
    )
}

export default Welcome;