import React from 'react'
import './topBar.css'
import { Link, NavLink } from 'react-router-dom'

function TopBar() {
  return (
    <div className='container'>
      <div className='Links_Container'>
        <ul className='Links'>
          <li className=''>
          <NavLink
            to="/movies"
            className={({ isActive }) =>
              `text-white  hover:opacity-100 leading-normal no-underline relative after:content-[''] after:absolute after:w-full after:h-[3px] after:bg-white after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:origin-bottom-right hover:after:origin-bottom-left after:transition-transform after:duration-300 ${isActive ? 'opacity-100 after:scale-x-100 after:bg-white font-semibold text-xl' : 'opacity-60 text-lg'}`
            }
          >
            Movies
          </NavLink>
          </li>
          <li>
          <NavLink
            to="/tv-shows"
            className={({ isActive }) =>
              `text-white  hover:opacity-100 leading-normal no-underline relative after:content-[''] after:absolute after:w-full after:h-[3px] after:bg-white after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:origin-bottom-right hover:after:origin-bottom-left after:transition-transform after:duration-300 ${isActive ? 'opacity-100 after:scale-x-100 after:bg-white font-semibold text-xl' : 'opacity-60 text-lg'}`
            }
          >
            Tv Shows
          </NavLink>
          </li>
          <li>
          <NavLink
            to="/anime"
            className={({ isActive }) =>
              `text-white  hover:opacity-100 leading-normal no-underline relative after:content-[''] after:absolute after:w-full after:h-[3px] after:bg-white after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:origin-bottom-right hover:after:origin-bottom-left after:transition-transform after:duration-300 ${isActive ? 'opacity-100 after:scale-x-100 after:bg-white font-semibold text-xl' : 'opacity-60 text-lg'}`
            }
          >
            Anime
          </NavLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default TopBar