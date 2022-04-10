import React from 'react'
import {NavLink} from 'react-router-dom'

export default function MainNav() {
  return (
    <nav className='main-nav'>
      <ul>
        <li>
          <NavLink to="results/cats">Cats</NavLink>
        </li>
        <li>
          <NavLink to="results/coding">Coding</NavLink>
        </li>
        <li>
          <NavLink to="results/zen">Zen</NavLink>
        </li>
      </ul >
    </nav >
  )
}
