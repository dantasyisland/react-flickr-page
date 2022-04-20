import React from 'react';
import Photo from './Photo';
import loadingSpinner from '../loadingSpinner.gif';

export default function PhotoContainer({ flickrData, isLoading, query }) {
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
      {isLoading ? (
        <>
          <h1>Loading</h1>{' '}
          <img src={loadingSpinner} alt='Loading Screen Animation'></img>
        </>
      ) : (
        <>
          <h2>Pictures of: {`${query}`}</h2>
          <ul>{photos}</ul>
        </>
      )}
    </div>
  );
}
