import React from 'react';

export default function Photo(props) {
  console.log(props);
  const url = `https://live.staticflickr.com/${props.server}/${props.id}_${props.secret}_w.jpg`;
  return (
    <li className='picture-wrapper'>asdf
      <img src={url} alt='' />
    </li>
  );
}
