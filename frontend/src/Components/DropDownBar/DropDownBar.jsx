import React, { useState, useEffect } from "react";
import "./DropDownBar.css";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import { GoHomeFill } from "react-icons/go";
import { FaArrowTrendUp } from "react-icons/fa6";
import { MdNewspaper, MdFavorite, MdBookmarkAdd } from "react-icons/md";
import { useNavigate,useLocation } from "react-router-dom";

function DropDownBar() {
  const [value, setValue] = useState("home");
  const navigate = useNavigate();
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/') {
      setValue('home');
    } else if (location.pathname === '/trending') {
      setValue('trending');
    } else {
      setValue(null);
    }
  }, [location.pathname]);


  const handleChange = (event, newValue) => {
    setValue(newValue);

    if (newValue === 'home') {
      navigate('/');
    }
  };

  return (
    <div className="DropDownBar">
      <BottomNavigation value={value} onChange={handleChange} style={{ backgroundColor: '#121212' }}>
        <BottomNavigationAction
          label="Home"
          value="home"
          icon={<GoHomeFill className="icon" />}
        />
        <BottomNavigationAction
          label="Trending"
          value="trending"
          icon={<FaArrowTrendUp className="icon" />}
        />
        <BottomNavigationAction
          label="News"
          value="news"
          icon={<MdNewspaper className="icon" />}
        />
        <BottomNavigationAction
          label="Favorites"
          value="favorites"
          icon={<MdFavorite className="icon" />}
        />
        <BottomNavigationAction
          label="Watchlist"
          value="watchlist"
          icon={<MdBookmarkAdd className="icon" />}
        />
      </BottomNavigation>
    </div>
  );
}

export default DropDownBar;
