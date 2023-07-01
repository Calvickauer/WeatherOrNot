import React, { useState } from 'react';
import axios from 'axios';

const Youtube = () => {
  const [videos, setVideos] = useState([]);

  const searchVideos = async (query) => {
    try {
      const response = await axios.get('/search-videos', {
        params: {
          query: query,
        },
      });
      setVideos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>YouTube Video Search</h1>
      <input type="text" onChange={(e) => searchVideos(e.target.value)} />

      <div>
        {videos.map((video) => (
          <div key={video.id}>
            <h3>{video.title}</h3>
            <img src={video.thumbnail} alt={video.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Youtube;
