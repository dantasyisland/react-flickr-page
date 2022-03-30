import React from 'react';
import Photo from './Photo';

export default function PhotoContainer({ flickrData }) {
  let photos = flickrData.map((flickrPic, i) => {
    <Photo data={flickrData} />;
    console.log(flickrPic);
  });

  return (
    <div className='photo-container'>
      <h2>Results - Change this to reflect name</h2>
      <ul>{photos}</ul>
      <Photo />
    </div>
  );
}
