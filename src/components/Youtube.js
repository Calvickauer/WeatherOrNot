import React, { useState } from 'react';
import axios from 'axios';

const apiKey = 'AIzaSyCyjAiYZfbVa3FwnHb4CAFnmb3bT0hjIPU';

const Youtube = () => {
  const [videos, setVideos] = useState([]);

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
      setVideos(response.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className='yt__title'>YouTube Video Search</h1>
      <input type="text" onChange={(e) => searchVideos(e.target.value)} />

      <div className='youtube__list'>
        {videos.map((video) => (
          <div key={video.id.videoId}>
            <h3>{video.snippet.title}</h3>
            <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Youtube;
