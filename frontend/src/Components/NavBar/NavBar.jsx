import React from "react";
import { NavLink } from "react-router-dom";
import './NavBar.css'

function NavBar() {
  return (
    <div>
      <nav className="nav_container">
        <NavLink to="/">
          <div className="icon_container">
            <img className="h-10 w-10" src="/popcorn-svgrepo-com.svg" />
            <h1>Fushaar</h1>
          </div>
        </NavLink>
        <ul className="nav_links">
          <li className="">
            <NavLink
              to="/movies"
              className={({ isActive }) =>
                `text-white  hover:opacity-100 leading-normal no-underline relative after:content-[''] after:absolute after:w-full after:h-[3px] after:bg-white after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:origin-bottom-right hover:after:origin-bottom-left after:transition-transform after:duration-300 ${
                  isActive
                    ? "opacity-100 after:scale-x-100 after:bg-white font-semibold text-xl"
                    : "opacity-60 text-lg"
                }`
              }
            >
              Movies
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tv-shows"
              className={({ isActive }) =>
                `text-white  hover:opacity-100 leading-normal no-underline relative after:content-[''] after:absolute after:w-full after:h-[3px] after:bg-white after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:origin-bottom-right hover:after:origin-bottom-left after:transition-transform after:duration-300 ${
                  isActive
                    ? "opacity-100 after:scale-x-100 after:bg-white font-semibold text-xl"
                    : "opacity-60 text-lg"
                }`
              }
            >
              Tv Shows
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/anime"
              className={({ isActive }) =>
                `text-white  hover:opacity-100 leading-normal no-underline relative after:content-[''] after:absolute after:w-full after:h-[3px] after:bg-white after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:origin-bottom-right hover:after:origin-bottom-left after:transition-transform after:duration-300 ${
                  isActive
                    ? "opacity-100 after:scale-x-100 after:bg-white font-semibold text-xl"
                    : "opacity-60 text-lg"
                }`
              }
            >
              Anime
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
