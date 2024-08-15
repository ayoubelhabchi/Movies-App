import React from 'react'
import './Sidebare.css'

import { GoHomeFill } from "react-icons/go";
import { FaArrowTrendUp } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";
import { MdNewspaper, MdFavorite } from "react-icons/md";
import { FaUser } from "react-icons/fa";


function SideBar() {
  return (
    <div className='Container'>
      <div className='SideBar_Elements'>

        <div className='Account'>
          <FaUser className='FaUser' />
          <h1>User</h1>
        </div>

        <div className='Search_Bar_Container'>
          <div className='Search_Bar'>
          <IoSearchSharp className='IoSearchSharp' />
          <input placeholder='DeadPool...' type="text" className='Search_Input' />
          </div>
        </div>

        <div className='Feeds_Icons'>
          <h1>News Feed</h1>
          <button className='Feed_Container'>
            <GoHomeFill className="icon" />
            <h1>Home</h1>
          </button>

          <button className='Feed_Container'>
            <FaArrowTrendUp className="icon" />
            <h1>Trending</h1>
          </button>

          <button className='Feed_Container'>
            <MdNewspaper className="icon" />
            <h1>News</h1>
          </button>

          <button className='Feed_Container'>
            <MdFavorite className="icon" />
            <h1>Whichlist</h1>
          </button>
        </div>
      </div>
    </div>
  )
}

export default SideBar