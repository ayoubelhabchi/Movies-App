import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { Navigate, NavLink, useNavigate, useParams } from "react-router-dom";
import "./TvPageDetails.css";
import { fetchSeriesById } from "../../Apis/ApiServices";
import { genreMapTv, genreColors } from "../../tools/geners";
import { slidesSettings } from "../../tools/carouselSettings";

import { FaStar } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { LiaImdb } from "react-icons/lia";
import { MdFavorite, MdBookmarkAdd, MdPlayCircle } from "react-icons/md";
import { GoHomeFill } from "react-icons/go";
import { CgDetailsMore } from "react-icons/cg";
import { CiPlay1 } from "react-icons/ci";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import ActorsProfile from "../../Components/Actors Profile/ActorsProfile";
import TvShowDetails from "../../Components/TvShowDetails/TvShowDetails";

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
  const navigate = useNavigate()

  const [movieDetails, setMovieDetails] = useState(null);
  const [playTrailer, setPlayTrailer] = useState(false);
  const [isTrailerReady, setIsTrailerReady] = useState(false);

  const [open, setOpen] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenDetails = () => setOpenDetails(true);
  const handleCloseDetails = () => setOpenDetails(false);

  const handleTrailerPlay = () => {
    setPlayTrailer(true);
  };
  const handleTrailerClose = () => {
    setPlayTrailer(false);
  };

  const handleSeasonId_Number = (seasonId_Number) => {
    navigate(`/tv/${id}/season/${seasonId_Number}`)
    console.log(seasonId_Number);
  }

  const findtrailer = () => {
    const trailer = movieDetails.details.videos.results.find(
      (vid) => vid.name === "Official Trailer"
    );
    const key = trailer
      ? trailer.key
      : movieDetails.details.videos.results[0]?.key;

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

  useEffect(() => {
    async function getMoviesDetails() {
      const details = await fetchSeriesById(id);
      setMovieDetails(details);
      console.log(details);
    }
    getMoviesDetails();
  }, [id]);

  if (!movieDetails)
    return <div className=" text-white text-3xl">Loading...</div>;

  const genreIds = movieDetails.details.genres.map((genre) => genre.id);
  const casts = movieDetails.details?.credits?.cast || [];
  const productionComanies = movieDetails.details?.production_companies || [];
  const episodesRunTime = movieDetails.details?.episode_run_time || [];
  const seasonsArray = movieDetails.details.seasons || [];
  const seasonCreactors = movieDetails.details.created_by || [];

  const seasonCreatedBy = seasonCreactors.map((creator) => creator.original_name)
  const seasons = seasonsArray.filter((season) => season.season_number !== 0 && season.air_date !== null).map((season) => season);
  const episodeTime = episodesRunTime.map((episode) => episode);
  const compaines = productionComanies.map((company) => company);
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
      <div className="tv_deatils_shadows"></div>

      <div className="tv_deatils_section">
        <div className="tv_poster_details_container">
          <div className="tv_poster_title">
            <h1>{movieDetails.details.name}</h1>
          </div>
          <div className="tv_poster_ratings">
            <div>
              <LiaImdb className="LiaImdb" />
              <h2 className="tv_vote_average">
                {movieDetails.details.vote_average} /10
              </h2>
            </div>
            <div>
              <AiFillLike className="AiFillLike" />
              <h2 className="tv_vote_count">
                {movieDetails.details.vote_count}
              </h2>
            </div>

            <div>
              <h3>{getGenreNames(genreIds)}</h3>
            </div>
          </div>

          <div className="tv_poster_ratings">
            <div>
              <h3>{movieDetails.details.origin_country}</h3>
            </div>

            <div>
              <h3>{movieDetails.details.original_language}</h3>
            </div>

            <div>
              <h3 className=" bg-gray-400 rounded-full p0.5 px-1">
                {episodeTime.length > 0
                  ? `${episodeTime.join(", ")} min`
                  : "N/L"}
              </h3>
            </div>

            <div>
              <h3> {movieDetails.details.status}</h3>
            </div>

            <div>
              <h3> {movieDetails.details.first_air_date}</h3>
            </div>

            <div>
              <h3>Total Episodes {movieDetails.details.number_of_episodes}</h3>
            </div>

            <div>
              <h3>Total Seasons {movieDetails.details.number_of_seasons}</h3>
            </div>
          </div>


          <div className="tv_poster_overview">
            <p>{movieDetails.details.overview}</p>
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
                href={movieDetails.details.homepage}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GoHomeFill className="GoHomeFill" />
                Official WebSite
              </a>
            </div>

            {/* <div className="more_details">
              <button onClick={handleOpenDetails}>
                <CgDetailsMore className="GoHomeFill" />
                More Details
              </button>
            </div> */}

            <div className="whichlist">
              <button className="tooltip">
                <MdFavorite className="MdFavorite" />
                <span className="tooltiptext">Add Favorite</span>
              </button>
            </div>

            <div className="whichlist">
              <button className="tooltip">
                <MdBookmarkAdd className="MdFavorite" />
                <span className="tooltiptext">Add To Watchlist</span>
              </button>
            </div>
          </div>


          <div className="tv_actors_container">
          <div className="creators_container">
              <h2>Created By: <strong>{seasonCreatedBy.join(',')}</strong></h2>
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
            src={`${imageBaseUrl}${movieDetails.details.poster_path}`}
            alt=""
          />
        </div>
      </div>

      <div className="seasons_container" >
        <Slider {...settings} >
          {seasons.length > 0 ? (
            seasons.map((season, index) => (
              <div className="season-card" onClick={() => handleSeasonId_Number(season.season_number)} key={index} >
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

      {movieDetails.details.videos && playTrailer ? findtrailer() : null}

      {playTrailer && isTrailerReady ? (
        <button onClick={handleTrailerClose} className="trailer_close">
          Close
        </button>
      ) : null}

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

      {/* More Details Section */}
      
    </div>
  );
}

export default TvPageDetails;
