import React, { useState } from 'react';
import axios from 'axios';

const apiKey = 'AIzaSyCyjAiYZfbVa3FwnHb4CAFnmb3bT0hjIPU';

const Youtube = () => {
  const [videos, setVideos] = useState([]);
  const [inputUsed, setInputUsed] = useState(false);

  const searchVideos = async (query) => {
    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          key: apiKey,
          q: query,
          type: 'video',
          part: 'snippet',
        },
      });
      if (response.data.items.length > 0) {
        setVideos(response.data.items);
        setInputUsed(true);
      } else {
        setVideos([]);
        setInputUsed(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      searchVideos(e.target.value);
    }
  };

  return (
    <div>
      <h1 className='yt__title'>YouTube Video Search</h1>
      <input type="text" onKeyUp={handleKeyUp} placeholder='Type Video Name' />

      {inputUsed && videos.length > 0 && (
        <div className='youtube__list'>
          {videos.map((video) => (
            <div key={video.id.videoId}>
              <h3>{video.snippet.title}</h3>
              <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Youtube;
