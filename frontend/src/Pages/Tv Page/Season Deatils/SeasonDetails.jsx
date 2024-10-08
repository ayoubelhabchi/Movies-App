import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import "./SeasonDetails.css";
import { Navigate, NavLink, useParams, useNavigate } from "react-router-dom";
import { fetchSeasonsAndEpisodes } from "../../../Apis/ApiServices";
import { slidesSettings } from "../../../tools/carouselSettings";

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
import ActorsProfile from "../../../Components/Actors Profile/ActorsProfile";
import TvShowDetails from "../../../Components/TvShowDetails/TvShowDetails";

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

function SeasonDetails() {
  const { id, seasonId_Number } = useParams();

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
      const details = await fetchSeasonsAndEpisodes(id, seasonId_Number);
      setMovieDetails(details);
      console.log(details);
    }
    getMoviesDetails();
  }, [id, seasonId_Number]);

  if (!movieDetails)
    return <div className=" text-white text-3xl">Loading...</div>;

  const casts = movieDetails.details?.credits?.cast || [];
  const productionComanies = movieDetails.details?.production_companies || [];
  const episodesRunTime = movieDetails.details?.episode_run_time || [];
  const episodesArray = movieDetails.details.episodes || [];

  const episodes = episodesArray.map((season) => season);
  const episodeTime = episodesRunTime.map((episode) => episode);
  const compaines = productionComanies.map((company) => company);
  const actors = casts.map((actor) => actor);

  const settings = slidesSettings(episodes.length);

  return (
    <div
      className="season_details_main_container"
      style={{
        backgroundImage: `url(${imageBaseUrl}${movieDetails.details.poster_path})`,
      }}
    >
      <nav className="nav_container">
        <div className="icon_container">
          <img className="h-12 w-12" src="/popcorn-svgrepo-com.svg" />
          <h1>Fushaar</h1>
        </div>

      </nav>
      <div className="season_deatils_shadows"></div>

      <div className="season_deatils_section">
        <div className="season_poster_details_container">
          <div className="season_poster_title">
            <h1>{movieDetails.details.name}</h1>
          </div>
          <div className="season_poster_ratings">
            <div>
              <LiaImdb className="LiaImdb" />
              <FaStar className="FaStar" />
              <h2 className="season_vote_average">
                {movieDetails.details.vote_average} /10
              </h2>
            </div>
          </div>

          <div className="season_poster_ratings">
            <div>
              <h3>Published on: {movieDetails.details.air_date}</h3>
            </div>
          </div>

          <div className="season_poster_overview">
            <p>{movieDetails.details.overview}</p>
          </div>

          <div className="season_poster_providers">
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

            <div className="more_details">
              <button onClick={handleOpenDetails}>
                <CgDetailsMore className="GoHomeFill" />
                More Details
              </button>
            </div>

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
          <div className="season_actors_container cursor-pointer">
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
                />
              ))}
            </AvatarGroup>
          </div>
        </div>

        <div className="season_poster_container">
          <img
            className="img_poster"
            src={`${imageBaseUrl}${movieDetails.details.poster_path}`}
            alt=""
          />
        </div>
      </div>

      <div className="episodes_container">
        <Slider {...settings}>
          {episodes.length > 0 ? (
            episodes.map((episode, index) => (
              <div className="episode-card" key={index}>
                <img
                  src={`${imageBaseUrlSeasons}${episode.still_path}`}
                  alt=""
                />
                <div className="blur-effect"></div>
                <div className="season-card-detail">
                  <div className="card-overlay">
                    <CiPlay1 className="play-icon" />
                  </div>
                  <div className="card-details">
                    <h4>{episode.air_date}</h4>
                    <h4>episode {episode.season_number}</h4>
                    <h4>{episode.name}</h4>
                    <div className="card-vote-average flex items-center gap-1">
                      <FaStar className="icon-star FaStar text-xs" />
                      <h2 className="text-xs text-yellow-200">
                        {episode.vote_average}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="season_card">
              <p>No Episodes Available</p>
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
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openDetails}
          onClose={handleCloseDetails}
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
          <Fade in={openDetails}>
            <Box sx={style}>
              <TvShowDetails movieDetails={movieDetails} />
            </Box>
          </Fade>
        </Modal>
      </div>
    </div>
  );
}

export default SeasonDetails;
