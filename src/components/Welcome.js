import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import audioFile from '../audio/MainSong1.mp3';
import WeatherApi from './Weather';
import Youtube from './Youtube';

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

  const handleSongEnd = () => {
    setIsPlaying(false);
    audioRef.current.currentTime = 0;
    const currentAudioRef = audioRef.current;
    currentAudioRef.play();
    setIsPlaying(true);
  };

  useEffect(() => {
    const currentAudioRef = audioRef.current;
    currentAudioRef.addEventListener('ended', handleSongEnd);
    currentAudioRef.play();
    setIsPlaying(true);

    return () => {
      currentAudioRef.removeEventListener('ended', handleSongEnd);
    };
  }, []);

  return (
    <div>
      <div className='weatherApi__container'>
        <div>
          <h1>Weather or Not!</h1>
          <p>Lets check the weather!</p>
        </div>
        <WeatherApi />
        <Youtube />
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
