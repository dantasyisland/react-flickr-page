import React from 'react';
import Photo from './Photo';
import loadingSpinner from '../loadingSpinner.gif';
import { withRouter } from 'react-router-dom';

function PhotoContainer({
  flickrData,
  isLoading,
  isError,
  match,
  location,
  history,
  query,
}) {
  console.log('---Match from photocontainer---');
  console.log(match);
  console.log('---Location from photocotainer---');
  console.log(location);
  console.log('---History from photocotainer---');
  console.log(history);
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
      <h2>Pictures of: {`${query}`}</h2>

      {isLoading ? (
        <>
          <h1>Loading</h1>{' '}
          <img src={loadingSpinner} alt='Loading Screen Animation'></img>
        </>
      ) : (
        <ul>{photos}</ul>
      )}

      {!isError ? <h1>NO ERROR</h1> : <h1>BIG ERROR!</h1>}
    </div>
  );
}

export default withRouter(PhotoContainer);
