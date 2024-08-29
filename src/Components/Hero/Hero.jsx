import React, { useEffect, useState } from "react";
import { fetchPopularMovies } from "../../Apis/ApiServices";
import "./Hero.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaStar } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import getCarouselSettings from "../../tools/carouselSettings";
import { genreMapMovies, genreColors } from "../../tools/geners";

function Hero() {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    fetchPopularMovies().then((popularMovies) => {
      setPopularMovies(popularMovies);
    });
  }, []);

  console.log(popularMovies);

  const getGenreNames = (genreIds) => {
    return genreIds.map((id) => {
      const genre = genreMapMovies.find((g) => g.id === id);
      if (!genre) return null;

      const backgroundColor = genreColors[id] || "#ccc";
      return (
        <span
          key={id}
          className={`genre-badge`}
          style={{
            backgroundColor: backgroundColor,
            // color: "#fff",
            // padding: "0.5px 5px",
            // borderRadius: "30px",
            // margin: "1px 3px",
            // display: "inline-block"
          }}
        >
          {genre.name}
        </span>
      );
    });
  };

  const settings = getCarouselSettings();

  return (
    <div className="Cards_Conainer-Hero">
      <div className="Main_card-Hero">
        <Carousel {...settings}>
          {popularMovies.map((movie, index) => (
            <div key={index}>
              <img
                className="img"
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
              />
              <div className="shadow-background-Hero">
                <div className="shadow-overlay-Hero"></div>
              </div>
              {/* Card Info Container */}
              <div className="card-info-container-Hero">
                <div className="card-info-Hero">
                  <h1 className="Movie_Title-Hero">{movie.title}</h1>
                  <div className="ratings-votes-container-Hero">
                    <div className="rating-Hero">
                      <FaStar />
                      <h2>{movie.vote_average}</h2>
                    </div>
                    <span className="dot-separator-Hero">•</span>
                    <div className="vots-Hero">
                      <AiFillLike className="AiFillLike" />
                      <h2>{movie.vote_count}</h2>
                    </div>
                    <span className="dot-separator-Hero">•</span>
                    <div className="data-Hero">
                      <h2>{movie.release_date.substring(0, 4)}</h2>
                    </div>
                  </div>
                  <div className="genres-Hero">
                    {movie.genre_ids.map((id) => (
                      <span key={id} className="genre-badge">
                        {getGenreNames([id])}
                      </span>
                    ))}
                  </div>
                  <div className="overview-Hero">
                    <p className="text-overview">{movie.overview}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default Hero;
