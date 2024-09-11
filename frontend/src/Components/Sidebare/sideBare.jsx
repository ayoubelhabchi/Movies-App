import React, { useState, useEffect, useRef } from "react";
import "./Sidebare.css";
import { fetchSearching } from "../../Apis/ApiServices";
import { GoHomeFill } from "react-icons/go";
import { FaArrowTrendUp } from "react-icons/fa6";
import { IoSearchSharp, IoLogOut } from "react-icons/io5";
import { CiDark } from "react-icons/ci";
import { MdNewspaper, MdFavorite, MdBookmark} from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { CiCircleChevLeft, CiTextAlignLeft } from "react-icons/ci";
import { Link } from "react-router-dom";

import { MaterialUISwitch } from "../../tools/muiTheme";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import FavoritesList from "../Movies/Favorites/FavoritesList";
import Watchlist from "../Movies/Watchlist/Watchlist";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  height: "100%",
  outline: "none",
  p: 2,
};

function SideBar() {

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [open, setOpen] = useState(true);
  const [iconToggle, setIconToggle] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setResult] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeModalContent, setActiveModalContent] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const searchRef = useRef();


  const handleOpenModal = (content) => {
    setActiveModalContent(content);
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") {
      setResult([]);
      return;
    }
    setResult([]);
  };

  useEffect(() => {
    if (searchQuery.trim()) {
      const fetchResults = async () => {
        const results = await fetchSearching(searchQuery);
        setResult(results);
      };
      fetchResults();
    }
  }, [searchQuery]);

  const handleIconToggle = () => {
    setOpen(!open);
    setIconToggle(!iconToggle);
  };

  const handleToggle = (event) => {
    setIsDarkMode(event.target.checked);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`Container ${open ? "open" : "closed"}`}>
      <div className="Side_Bar_Icons" onClick={handleIconToggle}>
        {open ? (
          <CiCircleChevLeft className="CiCircleChevLeft" />
        ) : (
          <CiTextAlignLeft className="CiCircleChevRight" />
        )}
        {open && <h1>AYOUB</h1>}
      </div>
      <div className="SideBar_Elements">
        {open && (
          <div className="Search_Bar_Container" ref={searchRef}>
            <form className="Search_Bar" onSubmit={handleSearch}>
              <IoSearchSharp
                className="IoSearchSharp"
                onClick={() => setSearchOpen(true)}
              />
              <input
                placeholder="Movies, Series, People"
                type="text"
                className="Search_Input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchOpen(true)}
              />
            </form>

            {searchOpen && (
              <div className="Results_Field">
                {result.length > 0 ? (
                  result.map((item, index) => (
                    <div className="Results_Container" key={index}>
                      {/* Left Section: Post/Image */}
                      <div className="Results_Image">
                        <img
                          src={`https://image.tmdb.org/t/p/w500/${
                            item.poster_path || item.profile_path
                          }`}
                          key={item.poster_path}
                          alt={item.title}
                        />
                      </div>

                      {/* Right Section: Title and other details */}
                      <div className="Results_Details">
                        <h1 className="results_title">
                          {item.name || item.title}
                        </h1>
                        <div className="results_average_vote">
                          <div className="results_AiFillLike">
                            <AiFillLike className="AiFillLike_results" />
                            <h2 className="results_popularity">
                              {item.popularity}
                            </h2>
                          </div>

                          <div className="results_FaStar">
                            <FaStar className="FaStar_results" />
                            <h2 className="results_vote_average">
                              {item.vote_average}
                            </h2>
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

        <div className="Feeds_Icons">
          {open && <h1>News Feed</h1>}
          <Link to={"/"}>
            <button className="Feed_Container">
              <GoHomeFill className="icon" />
              {open && <h1 className="Feeds_Icons_Text">Home</h1>}
            </button>
          </Link>

          <button className="Feed_Container">
            <FaArrowTrendUp className="icon" />
            {open && <h1 className="Feeds_Icons_Text">Trending</h1>}
          </button>

          <button className="Feed_Container">
            <MdNewspaper className="icon" />
            {open && <h1 className="Feeds_Icons_Text">News</h1>}
          </button>

          <button className="Feed_Container" onClick={() => handleOpenModal("favorites")}>
            <MdFavorite className="icon" />
            {open && <h1 className="">Favorites</h1>}
          </button>

          <button className="Feed_Container" onClick={() => handleOpenModal("watchlist")}>
            <MdBookmark className="icon" />
            {open && <h1 className="">Watchlist</h1>}
          </button>

          <FormControlLabel
            className="Theme_Toggle"
            control={
              <MaterialUISwitch
                checked={isDarkMode}
                onChange={handleToggle}
                icon={
                  <LightModeIcon
                    sx={{
                      fontSize: 30,
                      backgroundColor: "white",
                      borderRadius: "15px",
                      color: "#960019",
                      padding: "2px",
                    }}
                  />
                }
                checkedIcon={
                  <DarkModeIcon
                    sx={{
                      fontSize: 30,
                      backgroundColor: "white",
                      borderRadius: "15px",
                      color: "#960019",
                      padding: "2px",
                    }}
                  />
                }
                sx={{ m: 0 }}
              />
            }
            label=""
          />
        </div>
      </div>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openModal}
          onClose={handleCloseModal}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
              sx: {
                backdropFilter: "blur(10px)",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              },
            },
          }}
        >
          <Fade in={openModal}>
          <Box sx={style}>
              {activeModalContent === "favorites" ? (
                <FavoritesList />
              ) : (
                <Watchlist />
              )}
            </Box>
          </Fade>
        </Modal>
      </div>
    </div>
  );
}

export default SideBar;
