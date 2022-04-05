import React from 'react';
import Photo from './Photo';

export default function PhotoContainer({flickrData}) {
  let photos = flickrData.map((flickrPic) => {
    return (
      <Photo
        id={flickrPic.id}
        server={flickrPic.server}
        secret={flickrPic.secret}
        title={flickrPic.title}
        key={flickrPic.id}
      />
    );
  });

  return (
    <div className='photo-container'>
      <h2>Results - Change this to reflect name</h2>
      <ul>{photos}</ul>
    </div>
  );
}
