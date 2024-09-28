import React, { useEffect, useState } from "react";
// import "./FavoritesList.css";
import {
  getWatchlistMoviesList,
  deleteMovieWatchlist,
} from "../../Apis/MoviesAps";

import {
  getWatchlistSeries,
  deleteWatchlistSeries,
} from "../../Apis/SeriesApis";

import Loader from "../Loader/Loader";

import { FaStar } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
  padding: "8px",
}));

const posterBaseUrl = "https://image.tmdb.org/t/p/w500/";

function Watchlist() {
  const [favortedList, setFavoritedList] = useState([]);
  const [showMovies, setShowMovies] = useState(true);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
    async function getFavorites() {
      try {
        if (showMovies) {
          setLoading(true)
          const movieResponse = await getWatchlistMoviesList();
          setFavoritedList(movieResponse);
          setLoading(false)
        } else {
          setLoading(true)
          const seriesResponse = await getWatchlistSeries();
          setFavoritedList(seriesResponse);
          setLoading(false)
        }
      } catch (error) {
        console.error("Failed to fetch watchlist series", error);
      }
    }

    getFavorites();
  }, [showMovies]);

  const handleDelete = async (id) => {
    try {
      if (showMovies) {
        await deleteMovieWatchlist(id);
      } else {
        await deleteWatchlistSeries(id);
      }
      setFavoritedList((prevList) => prevList.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to delete favorite:", error);
    }
  };

  return (
    <div className="list_main_container">
      <div className="headline">
        <h1>Watchlist</h1>
        <div className="section-toggle">
          <button
            className={showMovies ? "active" : ""}
            onClick={() => setShowMovies(true)}
          >
            Movies
          </button>
          <button
            className={!showMovies ? "active" : ""}
            onClick={() => setShowMovies(false)}
          >
            TV Series
          </button>
        </div>
      </div>
      <div>
        <Box sx={{ width: "100%" }}>
        {loading && (
          <div className="loader-container">
            <Loader />
          </div>
        )}
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {favortedList.map((item, index) => (
            <Grid key={index}>
              <Item className="item-container">
                <div className="item-card-container">
                  <div className="delete-container">
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDelete(item.id)}>
                        <MdDelete className="MdOutlineDeleteForever" />
                      </IconButton>
                    </Tooltip>
                  </div>
                  <img src={`${posterBaseUrl}${item.poster_path}`} alt="" />
                  <div className="item-cards-info-container">
                    <h1>{item.title || item.name}</h1>
                    <div>
                      <FaStar className="FaStar-FaStar" />
                      <h2>{item.vote_average}</h2>
                    </div>
                  </div>
                </div>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
      </div>
    </div>
  );
}

export default Watchlist;
