import React from 'react'
import {NavLink} from 'react-router-dom'

export default function MainNav({data}) {
  console.log(data)
  return (
    <nav className='main-nav'>
      <ul>
        <li>
          <NavLink to={'/cats'}>Cats</NavLink>
        </li>
        <li>
          <NavLink to={'/zen'}>Zen</NavLink>
        </li>
        <li>
          <NavLink to={'/coding'}>Coding</NavLink>
        </li>
      </ul >
    </nav >
  )
}
