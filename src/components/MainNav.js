import React from 'react'
import {NavLink} from 'react-router-dom'

export default function MainNav({searchCats, searchCoding, searchZen}) {
  return (
    <nav className='main-nav'>
      <ul>
        <li>
          <NavLink to="/cats" onClick={searchCats}>Cats</NavLink>
        </li>
        <li>
          <NavLink to="/results/coding" onClick={searchCoding}>Coding</NavLink>
        </li>
        <li>
          <NavLink to="/results/zen" onClick={searchZen}>Zen</NavLink>
        </li>

      </ul >
    </nav >
  )
}
