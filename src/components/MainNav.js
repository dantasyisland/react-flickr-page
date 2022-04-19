import React from 'react';
import { NavLink } from 'react-router-dom';

export default function MainNav({
  searchCats,
  searchCoding,
  searchMeditation,
}) {
  return (
    <nav className='main-nav'>
      <ul>
        <li>
          <NavLink to='/results/cats' onClick={searchCats}>
            Cats
          </NavLink>
        </li>
        <li>
          <NavLink to='/results/coding' onClick={searchCoding}>
            Coding
          </NavLink>
        </li>
        <li>
          <NavLink to='/results/meditation' onClick={searchMeditation}>
            Meditation
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
