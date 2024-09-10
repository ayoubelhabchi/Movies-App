import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { Link, NavLink, useParams } from "react-router-dom";
import "./MoviesDetailsPage.css";
import { fetchById } from "../../Apis/ApiServices";
import {
  favoriteMovies,
  checkFavoriteMovies,
  watchlistMovies,
  checkWatchlistMovies,
} from "../../Apis/ApiServer";
import { genreMapMovies, genreColors } from "../../tools/geners";
import { FaStar } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { LiaImdb } from "react-icons/lia";
import {
  MdFavorite,
  MdBookmarkAdd,
  MdBookmarkAdded,
  MdPlayCircle,
} from "react-icons/md";
import { GoHomeFill } from "react-icons/go";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import ActorsProfile from "../../Components/Actors Profile/ActorsProfile";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";

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
  const [isTrailerReady, setIsTrailerReady] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isAddWatchlist, setIsAddWatchlist] = useState(false);

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [Transition, setTransition] = useState(() => SlideTransition);

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

  const findtrailer = () => {
    const trailer = movieDetails.details.videos.results.find(
      (vid) => vid.name === "Official Trailer"
    );
    const key = trailer
      ? trailer.key
      : movieDetails.details.videos.results[0]?.key;

    // setPlayTrailer(playTrailer ? trailer : movieDetails.details.videos.results[0]?.key)

    return (
      <YouTube
        videoId={key}
        containerClassName={"youtube_container"}
        className="youtube_container"
        opts={{
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: 1,
            controls: 0,
            cc_load_policy: 0,
            fs: 0,
            iv_load_policy: 0,
            modestbranding: 0,
            rel: 0,
            showinfo: 0,
          },
        }}
        onReady={() => setIsTrailerReady(true)}
      />
    );
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
    
    setIsAddWatchlist(!isAddWatchlist);

    try {
      const response = await watchlistMovies(movieData);


      const successMessage = response.message;
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
      const details = await fetchById(id);
      setMovieDetails(details);
    }
    getMoviesDetails();
    checkFavoriteStatus(id);
    checkWatchlistStatus(id);
  }, [id]);

  if (!movieDetails)
    return <div className=" text-white text-3xl">Loading...</div>;

  const genreIds = movieDetails.details.genres.map((genre) => genre.id);
  const casts = movieDetails.details?.credits?.cast || [];
  const productionComanies = movieDetails.details?.production_companies || [];
  const compaines = productionComanies.map((company) => company);
  const actors = casts.map((actor) => actor);

  // console.log("compaines", compaines);

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
      <nav className="nav_container">
        <div className="icon_container">
          <img className="h-12 w-12" src="/popcorn-svgrepo-com.svg" />
          <h1>Fushaar</h1>
        </div>
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
      {movieDetails.details.videos && playTrailer ? findtrailer() : null}

      {playTrailer && isTrailerReady ? (
        <button onClick={handleTrailerClose} className="trailer_close">
          Close
        </button>
      ) : null}

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
    </div>
  );
}

export default DetailsPage;
