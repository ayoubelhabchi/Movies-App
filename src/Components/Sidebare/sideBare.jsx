import React, {useState} from 'react'
import './Sidebare.css'
import { fetchSearching } from '../../Apis/ApiServices';

import { GoHomeFill } from "react-icons/go";
import { FaArrowTrendUp } from "react-icons/fa6";
import { IoSearchSharp, IoLogOut } from "react-icons/io5";
import { MdNewspaper, MdFavorite } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { CiCircleChevLeft, CiLogout, CiTextAlignLeft } from "react-icons/ci";



function SideBar() {

  const [open, setOpen] = useState(true);
  const [iconToggle, setIconToggle] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');


  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const results = await fetchSearching(searchQuery); 
      console.log(results); 
    }
  };
  const handleIconToggle = () => {
    setOpen(!open);
    setIconToggle(!iconToggle);
  };


  return (
    <div className={`Container ${open ? 'open' : 'closed'}`}>
      <div className='Side_Bar_Icons' onClick={handleIconToggle}>
        {open ? <CiCircleChevLeft className='CiCircleChevLeft' /> : <CiTextAlignLeft className='CiCircleChevRight' />}
        {open && <h1>AYOUB</h1>}

      </div>
      <div className='SideBar_Elements'>
        {open && (
          <div className='Search_Bar_Container'>
            <form className='Search_Bar 'onSubmit={handleSearch}>
              <IoSearchSharp className='IoSearchSharp' />
              <input
               placeholder='DeadPool...'
               type="text" 
               className='Search_Input'
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
                />
            </form>
          </div>
        )}

        <div className='Feeds_Icons'>
          { open && <h1>News Feed</h1>}
          <button className='Feed_Container'>
            <GoHomeFill className="icon" />
            {open && <h1 className='Feeds_Icons_Text'>Home</h1>}
          </button>

          <button className='Feed_Container'>
            <FaArrowTrendUp className="icon" />
            {open && <h1 className='Feeds_Icons_Text'>Trending</h1>}
          </button>

          <button className='Feed_Container'>
            <MdNewspaper className="icon" />
            {open && <h1 className='Feeds_Icons_Text'>News</h1>}
          </button>

          <button className='Feed_Container'>
            <MdFavorite className="icon" />
            {open && <h1 className=''>Watchlist</h1>}
          </button>

          <button className='Logout_icon'>
            <IoLogOut className='CiLogout'/>
            {open && <h1 className='Feeds_Icons_Text'>LogOut</h1>}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SideBar