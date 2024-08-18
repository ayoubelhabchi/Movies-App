import React, { useEffect, useState } from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { FaStar } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import './TrendingMovies.css';
import { fetchTrendingMovies } from '../../Apis/ApiServices';

function TrendingMovies() {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies().then((movies) => {
      setPopularMovies(movies);
    });
  }, []);

  return (
    <div className="slider-container-trend-movie">
      <h1 className="text-trend-movie">Trending Movies</h1>
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlay
        autoPlaySpeed={3000}
        centerMode={true}
        containerClass="container-with-dots"
        draggable
        focusOnSelect={false}
        infinite
        keyBoardControl
        pauseOnHover
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024
            },
            items: 3,
            partialVisibilityGutter: 40
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0
            },
            items: 1,
            partialVisibilityGutter: 30
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464
            },
            items: 2,
            partialVisibilityGutter: 30
          }
        }}
      >
        {popularMovies.map((movie, index) => (
          <div key={index} className="movie-card-trend-movie">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              className="movie-image-trend-movie"
              alt={movie.title}
            />
            <div className="blur-background-trend-movie">
              <div className="blur-overlay-trend-movie">
                <div className="card-info-container-trend-movie">
                  <div className="card-info-trend-movie">
                    <h1 className="title-trend-movie">{movie.title}</h1>
                    <div className="ratings-votes-container">
                      <div className="rating-trend-movie">
                        <FaStar />
                        <h2>{movie.vote_average}</h2>
                      </div>
                      <div className="vots-trend-movie">
                        <AiFillLike className="AiFillLike" />
                        <h2>{movie.vote_count}</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default TrendingMovies;
