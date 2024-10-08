import React, { useEffect, useState } from "react";
import { Navigate, NavLink, useNavigate, useParams } from "react-router-dom";
import "./TvPageDetails.css";

import { fetchSeriesById } from "../../Apis/ApiServices";
import {
  favoriteSeries,
  checkFavoriteSeries,
  addWatchlistSeries,
  checkWatchlistSeries,
} from "../../Apis/SeriesApis";

import { genreMapTv, genreColors } from "../../tools/geners";
import { slidesSettings } from "../../tools/carouselSettings";

import { FaStar } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { LiaImdb } from "react-icons/lia";
import {
  MdFavorite,
  MdBookmarkAdd,
  MdPlayCircle,
  MdBookmarkAdded,
} from "react-icons/md";
import { GoHomeFill } from "react-icons/go";
import { CiPlay1 } from "react-icons/ci";

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

function SlideTransition(props) {
  return <Slide {...props} direction="up" className=" bg-white" />;
}

import ActorsProfile from "../../Components/Actors Profile/ActorsProfile";
import TrailerPlayer from "../../tools/Youtube/youtubeTrailer";
import Loader from "../../Components/Loader/Loader";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const imageBaseUrl = "https://image.tmdb.org/t/p/w1280/";
const imageBaseUrlSeasons = "https://image.tmdb.org/t/p/w500/";
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

function TvPageDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [seriesDetails, setSeriesDetails] = useState(null);
  const [playTrailer, setPlayTrailer] = useState(false);

  const [isFavorited, setIsFavorited] = useState(false);
  const [isAddWatchlist, setIsAddWatchlist] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [Transition, setTransition] = useState(() => SlideTransition);

  const [open, setOpen] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  const handleTrailerPlay = () => {
    setPlayTrailer(true);
  };
  const handleTrailerClose = () => {
    setPlayTrailer(false);
  };

  const handleSeasonId_Number = (seasonId_Number) => {
    navigate(`/tv/${id}/season/${seasonId_Number}`);
  }; // console.log(seasonId_Number);

  const handleFavorite = async (dataSeries) => {
    try {
      const SeriesData = {
        id: dataSeries.id,
        name: dataSeries.name,
        first_air_date: dataSeries.first_air_date,
        poster_path: dataSeries.poster_path,
        popularity: dataSeries.popularity,
        vote_average: dataSeries.vote_average,
        vote_count: dataSeries.vote_count,
      };

      const response = await favoriteSeries(SeriesData);

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

  const handleAddWatchlist = async (dataSeries) => {
    const SeriesData = {
      id: dataSeries.id,
      name: dataSeries.name,
      first_air_date: dataSeries.first_air_date,
      poster_path: dataSeries.poster_path,
      popularity: dataSeries.popularity,
      vote_average: dataSeries.vote_average,
      vote_count: dataSeries.vote_count,
    };

    try {
      const response = await addWatchlistSeries(SeriesData);

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

  const checkWatchlistStatus = async (id) => {
    try {
      const response = await checkWatchlistSeries(id);
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

  const checkFavoriteStatus = async (id) => {
    try {
      const response = await checkFavoriteSeries(id);
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

  useEffect(() => {
    async function getSeriesDetails() {
      setLoading(true);
      const details = await fetchSeriesById(id);
      setSeriesDetails(details);

      setLoading(false);
    }
    getSeriesDetails();
    checkFavoriteStatus(id);
    checkWatchlistStatus(id);
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  const genreIds = seriesDetails.details.genres.map((genre) => genre.id);
  const casts = seriesDetails.details?.credits?.cast || [];
  const episodesRunTime = seriesDetails.details?.episode_run_time || [];
  const seasonsArray = seriesDetails.details.seasons || [];
  const seasonCreactors = seriesDetails.details.created_by || [];

  const seasonCreatedBy = seasonCreactors.map(
    (creator) => creator.original_name
  );
  const seasons = seasonsArray
    .filter((season) => season.season_number !== 0 && season.air_date !== null)
    .map((season) => season);
  const episodeTime = episodesRunTime.map((episode) => episode);
  const actors = casts.map((actor) => actor);

  const settings = slidesSettings(seasons.length);

  const getGenreNames = (genreIds) => {
    return genreIds.map((id) => {
      const genre = genreMapTv.find((g) => g.id === id);
      if (!genre) return null;

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
      className="tv_details_main_container"
      style={{
        backgroundImage: `url(${imageBaseUrl}${seriesDetails.details.backdrop_path})`,
      }}
    >
      <div className="tv_deatils_shadows"></div>

      <div className="tv_deatils_section">
        <div className="tv_poster_details_container">
          <div className="tv_poster_title">
            <h1>{seriesDetails.details.name}</h1>
          </div>
          <div className="tv_poster_ratings">
            <div>
              <LiaImdb className="LiaImdb" />
              <h2 className="tv_vote_average">
                {seriesDetails.details.vote_average} /10
              </h2>
            </div>
            <div>
              <AiFillLike className="AiFillLike" />
              <h2 className="tv_vote_count">
                {seriesDetails.details.vote_count}
              </h2>
            </div>

            <div>
              <h3>{getGenreNames(genreIds)}</h3>
            </div>
          </div>

          <div className="tv_poster_ratings">
            <div>
              <h3>{seriesDetails.details.origin_country}</h3>
            </div>

            <div>
              <h3>{seriesDetails.details.original_language}</h3>
            </div>

            <div>
              <h3 className=" bg-gray-400 rounded-full p0.5 px-1">
                {episodeTime.length > 0
                  ? `${episodeTime.join(", ")} min`
                  : "N/L"}
              </h3>
            </div>

            <div>
              <h3> {seriesDetails.details.status}</h3>
            </div>

            <div>
              <h3> {seriesDetails.details.first_air_date}</h3>
            </div>

            <div>
              <h3>Total Episodes {seriesDetails.details.number_of_episodes}</h3>
            </div>

            <div>
              <h3>Total Seasons {seriesDetails.details.number_of_seasons}</h3>
            </div>
          </div>

          <div className="tv_poster_overview">
            <p>{seriesDetails.details.overview}</p>
          </div>

          <div className="tv_poster_providers">
            <div className="watch_trailer">
              <button onClick={handleTrailerPlay}>
                <MdPlayCircle className="MdPlayCircle" />
                Watch Trailer
              </button>
            </div>

            <div className="officila_site">
              <a
                href={seriesDetails.details.homepage}
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
                onClick={() => handleFavorite(seriesDetails.details)}
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
                onClick={() => handleAddWatchlist(seriesDetails.details)}
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

          <div className="tv_actors_container">
            <div className="creators_container">
              <h2>
                Created By:{" "}
                <strong>
                  {seasonCreatedBy && seasonCreatedBy.length > 0
                    ? seasonCreatedBy.join(", ")
                    : "N/L"}
                </strong>
              </h2>
            </div>
            <h1>Top Cast</h1>
            <AvatarGroup
              max={4}
              onClick={handleOpen}
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
                  className="cursor-pointer"
                />
              ))}
            </AvatarGroup>
          </div>
        </div>

        <div className="tv_poster_container">
          <img
            className="img_poster"
            src={`${imageBaseUrl}${seriesDetails.details.poster_path}`}
            alt=""
          />
        </div>
      </div>

      <div className="seasons_container">
        <Slider {...settings}>
          {seasons.length > 0 ? (
            seasons.map((season, index) => (
              <div
                className="season-card"
                onClick={() => handleSeasonId_Number(season.season_number)}
                key={index}
              >
                <img
                  src={`${imageBaseUrlSeasons}${season.poster_path}`}
                  alt=""
                />
                <div className="blur-effect"></div>
                <div className="season-card-detail">
                  <div className="card-overlay">
                    <CiPlay1 className="play-icon" />
                  </div>
                  <div className="card-details">
                    <h4>{season.air_date}</h4>
                    <h4>Season {season.season_number}</h4>
                    <h4>Total Episodes {season.episode_count}</h4>
                    <div className="card-vote-average flex items-center gap-1">
                      <FaStar className="icon-star FaStar text-xs" />
                      <h2 className="text-xs text-yellow-200">
                        {season.vote_average}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="season_card">
              <p>No seasons available</p>
            </div>
          )}
        </Slider>
      </div>

      {/* Actors Details Section */}
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
        seriesDetails={seriesDetails}
        playTrailer={playTrailer}
        handleTrailerClose={handleTrailerClose}
      />
    </div>
  );
}

export default TvPageDetails;
