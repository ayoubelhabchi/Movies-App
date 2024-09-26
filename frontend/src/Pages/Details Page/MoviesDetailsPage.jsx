import React, { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import "./MoviesDetailsPage.css";

import { fetchById } from "../../Apis/ApiServices";
import {
  favoriteMovies,
  checkFavoriteMovies,
  watchlistMovies,
  checkWatchlistMovies,
} from "../../Apis/MoviesAps";
import { genreMapMovies, genreColors } from "../../tools/geners";

import { FaStar } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { LiaImdb } from "react-icons/lia";
import { MdFavorite, MdBookmarkAdd, MdBookmarkAdded, MdPlayCircle } from "react-icons/md";
import { GoHomeFill } from "react-icons/go";

import {
  Modal,
  Snackbar,
  Alert,
  Slide,
  AvatarGroup,
  Avatar,
  Backdrop,
  Box,
  Fade,
} from "@mui/material";

import ActorsProfile from "../../Components/Actors Profile/ActorsProfile";
import TrailerPlayer from "../../tools/Youtube/youtubeTrailer";
import Loader from "../../Components/Loader/Loader";

function SlideTransition(props) {
  return <Slide {...props} direction="up" className=" bg-white" />;
}

const imageBaseUrl = "https://image.tmdb.org/t/p/w1280/";
const profileImageBaseUrl = "https://image.tmdb.org/t/p/w500/";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "100%",
  outline: "none",
  p: 2,
};


function DetailsPage() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [playTrailer, setPlayTrailer] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isAddWatchlist, setIsAddWatchlist] = useState(false);

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [Transition, setTransition] = useState(() => SlideTransition);
  const [loading, setLoading] = useState(true);
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleTrailerPlay = () => {
    setPlayTrailer(true);
  };
  const handleTrailerClose = () => {
    setPlayTrailer(false);
  };

  const handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
  };

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
  };

  const handleFavorite = async (dataMovies) => {
    try {
      const movieData = {
        id: dataMovies.id,
        title: dataMovies.title,
        release_date: dataMovies.release_date,
        poster_path: dataMovies.poster_path,
        popularity: dataMovies.popularity,
        vote_average: dataMovies.vote_average,
        vote_count: dataMovies.vote_count,
      };

      const response = await favoriteMovies(movieData);

      const { isFavorited } = response;

      const successMessage = response.message;
      setIsFavorited(!isFavorited);
      setSuccess(successMessage);
      setOpenSuccess(true);
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.error;
        setError(errorMessage);
        setOpenError(true);
      } else {
        setError("Something went wrong. Please try again.");
        setOpenError(true);
      }
    }
  };

  const handleWatchlist = async (dataMovies) => {
    const movieData = {
      id: dataMovies.id,
      title: dataMovies.title,
      release_date: dataMovies.release_date,
      poster_path: dataMovies.poster_path,
      popularity: dataMovies.popularity,
      vote_average: dataMovies.vote_average,
      vote_count: dataMovies.vote_count,
    };

    try {
      const response = await watchlistMovies(movieData);

      const successMessage = response.message;
      setSuccess(successMessage);
      setIsAddWatchlist(!isAddWatchlist);
      setOpenSuccess(true);
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.error;
        setError(errorMessage);
        setOpenError(true);
      } else {
        setError("Something went wrong. Please try again.");
        setOpenError(true);
      }
    }
  };

  const checkFavoriteStatus = async (id) => {
    try {
      const response = await checkFavoriteMovies(id);
      const { isFavorited } = response;
      setIsFavorited(isFavorited);
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.error;
        setError(errorMessage);
        setOpenError(true);
      } else {
        setError("Something went wrong. Please try again.");
        setOpenError(true);
      }
    }
  };

  const checkWatchlistStatus = async (id) => {
    try {
      const response = await checkWatchlistMovies(id);
      const { isAddWatchlist } = response;
      setIsAddWatchlist(isAddWatchlist);
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.error;
        setError(errorMessage);
        setOpenError(true);
      } else {
        setError("Something went wrong. Please try again.");
        setOpenError(true);
      }
    }
  };

  useEffect(() => {
    async function getMoviesDetails() {
      setLoading(true);
      const details = await fetchById(id);
      setMovieDetails(details);
      setLoading(false);
    }
    getMoviesDetails();
    checkFavoriteStatus(id);
    checkWatchlistStatus(id);
  }, [id]);

  if (loading) {
    return <Loader />
  }

  const genreIds = movieDetails.details.genres.map((genre) => genre.id);
  const casts = movieDetails.details?.credits?.cast || [];
  const actors = casts.map((actor) => actor);

  // Function to get genre names and apply color styles
  const getGenreNames = (genreIds) => {
    return genreIds.map((id) => {
      // Find the genre details using the genreMapMovies or similar mapping
      const genre = genreMapMovies.find((g) => g.id === id);
      if (!genre) return null;

      // Get the background color for the genre
      const backgroundColor = genreColors[id] || "#ccc";

      return (
        <span
          key={id}
          style={{
            backgroundColor: backgroundColor,
            color: "#fff",
            padding: "1px 2px 1px",
            borderRadius: "30px",
            margin: "0px 3px 4px",
            display: "inline-flex",
            fontWeight: "500",
            fontSize: "14px",
          }}
        >
          {genre.name}
        </span>
      );
    });
  };

  return (
    <div
      className="details_main_container"
      style={{
        backgroundImage: `url(${imageBaseUrl}${movieDetails.details.backdrop_path})`,
      }}
    >
      
      <div className="deatils_shadows"></div>

      <div className="deatils_section">
        <div className="poster_details_container">
          <div className="poster_title">
            <h1>{movieDetails.details.title}</h1>
          </div>
          <div className="poster_ratings">
            <div>
              <LiaImdb className="LiaImdb" />
              <FaStar className="FaStar" />
              <h2 className="vote_average">
                {movieDetails.details.vote_average} /10
              </h2>
            </div>
            <div>
              <AiFillLike className="AiFillLike" />
              <h2 className="vote_count">{movieDetails.details.vote_count}</h2>
            </div>

            <div>
              <h3>{getGenreNames(genreIds)}</h3>
            </div>
          </div>

          <div className="poster_ratings">
            <div>
              <h3>{movieDetails.details.origin_country}</h3>
            </div>

            <div>
              <h3>{movieDetails.details.original_language}</h3>
            </div>

            <div>
              <h3 className=" bg-gray-400 rounded-full p0.5 px-0.5">
                {movieDetails.details.runtime} min
              </h3>
            </div>

            <div>
              <h3> {movieDetails.details.status}</h3>
            </div>

            <div>
              <h3> {movieDetails.details.release_date}</h3>
            </div>
          </div>

          <div className="poster_overview">
            <p>{movieDetails.details.overview}</p>
          </div>

          <div className="poster_providers">
            <div className="watch_trailer">
              <button onClick={handleTrailerPlay}>
                <MdPlayCircle className="MdPlayCircle" />
                Watch Trailer
              </button>
            </div>

            <div className="officila_site">
              <a
                href={movieDetails.details.homepage}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GoHomeFill className="GoHomeFill" />
                Official WebSite
              </a>
            </div>

            <div className="whichlist">
              <button
                className="tooltip"
                onClick={() => handleFavorite(movieDetails.details)}
              >
                <MdFavorite
                  className="MdFavorite"
                  style={{ color: isFavorited ? "red" : "white" }}
                />
                <span className="tooltiptext">
                  {isFavorited ? "Remove Favorite" : "Add Favorite"}
                </span>
              </button>
            </div>

            <div className="whichlist">
              <button
                className="tooltip"
                onClick={() => handleWatchlist(movieDetails.details)}
              >
                {isAddWatchlist ? (
                  <MdBookmarkAdded
                    className="MdFavorite"
                    style={{ color: "#4CAF50" }}
                  />
                ) : (
                  <MdBookmarkAdd
                    className="MdFavorite"
                    style={{ color: "white" }}
                  />
                )}
                <span className="tooltiptext">
                  {isAddWatchlist ? "Remove Watchlist" : "Add To Watchlist"}
                </span>
              </button>
            </div>
          </div>
          <div className="actors_container">
            <h1>Top Cast</h1>
            <AvatarGroup
              max={6}
              renderSurplus={(surplus) => (
                <span
                  onClick={handleOpen}
                  className=" cursor-pointer text-xs flex m-4 p8"
                >
                  +{surplus} more
                </span>
              )}
            >
              {actors.map((actor, index) => (
                <Avatar
                  key={index}
                  alt={actor.name}
                  src={`${profileImageBaseUrl}${actor.profile_path}`}
                />
              ))}
            </AvatarGroup>
          </div>
        </div>

        <div className="poster_container">
          <img
            className="img_poster"
            src={`${imageBaseUrl}${movieDetails.details.poster_path}`}
            alt=""
          />
        </div>
      </div>

      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
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
          <Fade in={open}>
            <Box sx={style}>
              <ActorsProfile actors={actors} />
            </Box>
          </Fade>
        </Modal>
      </div>
      <div>
        {success && (
          <Snackbar
            open={openSuccess}
            autoHideDuration={3000}
            onClose={handleCloseSuccess}
            TransitionComponent={Transition}
            message={success}
            key={Transition.name}
            sx={{
              "& .MuiSnackbarContent-root": {
                backgroundColor: "white",
                color: "black",
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.15)",
              },
            }}
          />
        )}

        {error && (
          <Snackbar
            open={openError}
            autoHideDuration={6000}
            onClose={handleCloseError}
          >
            <Alert
              onClose={handleCloseError}
              severity="error"
              variant="filled"
              sx={{ width: "100%" }}
            >
              {error}
            </Alert>
          </Snackbar>
        )}
      </div>
      <TrailerPlayer
        movieDetails={movieDetails}
        playTrailer={playTrailer}
        handleTrailerClose={handleTrailerClose}
      />
    </div>
  );
}

export default DetailsPage;
