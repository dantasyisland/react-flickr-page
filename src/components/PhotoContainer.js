import React from 'react';
import Photo from './Photo';
import loadingSpinner from '../loadingSpinner.gif'


export default function PhotoContainer({flickrData, isLoading, isError, query}) {
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
      <h2>Pictures of: {query}</h2>

      {isLoading ? <>
        <h1>Loading</h1>{' '}
        <img src={loadingSpinner} alt='Loading Screen Animation'></img>
      </> : <ul>{photos}</ul>}
      {!isError ? <h1>NO ERROR</h1> : <h1>BIG ERROR!</h1>}
    </div>
  );
}
