import React, { useState } from "react";
import "./DropDownBar.css";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import { GoHomeFill } from "react-icons/go";
import { FaArrowTrendUp } from "react-icons/fa6";
import { MdNewspaper, MdFavorite, MdBookmarkAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function DropDownBar() {
  const [value, setValue] = useState("home");
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);

    // Use navigate to change the path
    if (newValue === 'home') {
      navigate('/');
    // } else if (newValue === 'favorites') {
    //   navigate('/');
    // } else if (newValue === 'trending') {
    //   navigate('/');
    // } else if (newValue === 'news') {
    //   navigate('/');
    // } else if (newValue === 'watchlist') {
    //   navigate('/');
    }
  };

  return (
    <div>
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
