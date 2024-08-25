import React, {useState, useEffect, useRef} from 'react'
import './Sidebare.css'
import { fetchSearching } from '../../Apis/ApiServices';
import { GoHomeFill } from "react-icons/go";
import { FaArrowTrendUp } from "react-icons/fa6";
import { IoSearchSharp, IoLogOut } from "react-icons/io5";
import { MdNewspaper, MdFavorite } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { CiCircleChevLeft, CiTextAlignLeft } from "react-icons/ci";
import { Link } from 'react-router-dom';

import { MaterialUISwitch } from '../../tools/muiTheme';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';





function SideBar() {

  const [open, setOpen] = useState(true);
  const [iconToggle, setIconToggle] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [result, setResult] = useState([])
  const [searchOpen, setSearchOpen] = useState(false);

  const searchRef = useRef();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      setResult([]);
      return;
    }
    setResult([]); 
    // const results = await fetchSearching(searchQuery);
    // setResult(results);
  };

  useEffect(() => {
    if (searchQuery.trim()) {
      const fetchResults = async () => {
        const results = await fetchSearching(searchQuery)
        setResult(results)
      }
      fetchResults()
    }
  },[searchQuery])

  const handleIconToggle = () => {
    setOpen(!open);
    setIconToggle(!iconToggle);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`Container ${open ? 'open' : 'closed'}`}>
      <div className='Side_Bar_Icons' onClick={handleIconToggle}>
        {open ? <CiCircleChevLeft className='CiCircleChevLeft' /> : <CiTextAlignLeft className='CiCircleChevRight' />}
        {open && <h1>AYOUB</h1>}

      </div>
      <div className='SideBar_Elements'>
      {open && (
          <div className='Search_Bar_Container' ref={searchRef}>
            <form className='Search_Bar' onSubmit={handleSearch}>
              <IoSearchSharp className='IoSearchSharp' onClick={() => setSearchOpen(true)} />
              <input
                placeholder='Movies, Series, People'
                type="text"
                className='Search_Input'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchOpen(true)} // Open the search field when input is focused
              />
            </form>

            {searchOpen && (
              <div className="Results_Field">
                {result.length > 0 ? (
                  result.map((item, index) => (
                    <div className="Results_Container"key={index} >
                      {/* Left Section: Post/Image */}
                      <div className="Results_Image">
                        <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path || item.profile_path}`} key={item.poster_path} alt={item.title} />
                      </div>

                      {/* Right Section: Title and other details */}
                      <div className="Results_Details">
                        <h1 className='results_title'>{item.name || item.title}</h1>
                        <div className="results_average_vote">
                          <div className='results_AiFillLike'>
                            <AiFillLike className="AiFillLike_results" />
                            <h2 className='results_popularity'>{item.popularity}</h2>
                          </div>

                          <div className='results_FaStar'>
                            <FaStar className='FaStar_results' />
                            <h2 className='results_vote_average'>{item.vote_average}</h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No results found.</p>
                )}
              </div>
            )}
          </div>
        )}

        <div className='Feeds_Icons'>
          { open && <h1>News Feed</h1>}
          <Link to={'/'}>
          <button className='Feed_Container'>
            <GoHomeFill className="icon" />
            {open && <h1 className='Feeds_Icons_Text'>Home</h1>}
          </button>
          </Link>

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

            <FormControlLabel className='Logout_icon'
              control={<MaterialUISwitch sx={{ m: 0 }} defaultChecked />}
              label=""
            />

          
        </div>
      </div>
    </div>
  )
}

export default SideBar