import React from "react";
import "./DetailsDropDown.css";

import { GoHome, GoHeart, GoBookmark } from "react-icons/go";
import { RxPerson } from "react-icons/rx";
import { HiOutlineHome } from "react-icons/hi2";
import { Navigate, NavLink } from "react-router-dom";

function DetailsDropDown({ handleOpenModal}) {
  return (
    <div className="drop_container">
      <div className="drop_main">
        <NavLink to={"/"}>

        <HiOutlineHome className="drop_icon" />
        </NavLink>
        <RxPerson className="drop_icon " />
        <GoHeart className="drop_icon" onClick={() => handleOpenModal("favorites")}/>
        <GoBookmark className="drop_icon" onClick={() => handleOpenModal("watchlist")}/>
      </div>
    </div>
  );
}

export default DetailsDropDown;
