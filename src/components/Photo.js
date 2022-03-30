import React from 'react';
import PropTypes from 'prop-types';


export default function Photo({id, server, secret, title}) {
  return (
    <li className='picture-wrapper'>
      {/* fix alt  */}
      <img src={`https://live.staticflickr.com/${server}/${id}_${secret}_w.jpg`} alt={title} />;
    </li>
  );
}

Photo.propTypes = {
  server: PropTypes.string,
  id: PropTypes.string,
  secret: PropTypes.string,
  title: PropTypes.string
}