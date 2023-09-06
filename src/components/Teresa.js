import React from 'react';

const teresaContent = {
  title: "Sexiest Woman Alive Landing Page!",
  description: `Teresa, the sexiest woman alive, is a captivating and intelligent brunette with 
    a magnetic charm that leaves a lasting impression. 
    Her alluring presence and impeccable style make her irresistible and unforgettable if you ever get the opportunity to tear that sweet ass the fuck up!!`,
};

const Teresa = () => {
  return (
    <div className='t__body'>
      <div className='t__main'>
        <h1>{teresaContent.title}</h1>
      </div>
      <div className='t__desc'>
        <p>{teresaContent.description}</p>
      </div>
    </div>
  );
}

export default Teresa;
