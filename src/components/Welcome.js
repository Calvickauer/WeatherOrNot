import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import audioFile from '../audio/MainSong1.mp3';
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
        <button onClick={togglePlay}>
          {isPlaying ? (
            <h5>Pause <FontAwesomeIcon icon={faPause} /></h5>
          ) : (
            <h5>Play <FontAwesomeIcon icon={faPlay} /></h5>
          )}
        </button>
      </div>

      <audio ref={audioRef} src={audioFile} />
    </div>
  );
};

export default Welcome;
