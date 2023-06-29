import React, { useState, useRef, useEffect } from 'react';
import audioFile from '../audio/MainSong.mp3';
import WeatherApi from './Weather';

const Welcome = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    audioRef.current.play();
    setIsPlaying(true);
  }, []);

  return (
    <div>
      <div className='weatherApi__container'>
        <div>
          <h1>Weather or Not!</h1>
          <p>Lets check the weather!</p>
        </div>
        <WeatherApi />
      </div>

      <div>
        <button onClick={togglePlay}>{isPlaying ? 'Pause Music' : 'Play Music'}</button>
      </div>

      <audio ref={audioRef} src={audioFile} />
    </div>
  );
};

export default Welcome;
