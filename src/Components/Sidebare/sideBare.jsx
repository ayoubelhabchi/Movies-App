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
        <div className='Search_Bar'>
          <IoSearchSharp className='IoSearchSharp' />
          <input placeholder='DeadPool...' type="text" className='Search_Input' />
        </div>
        <div className='Feeds_Icons'>
          <h1>News Feed</h1>
            <GoHomeFill className="icon" />
            <FaArrowTrendUp className="icon" />
            <MdNewspaper className="icon" />
            <MdFavorite className="icon" />
        </div>
      </div>
    </div>
  )
}

export default SideBar