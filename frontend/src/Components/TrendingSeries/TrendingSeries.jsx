import React, { useEffect, useState } from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { FaStar } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import './../TrendingMovies/TrendingMovies.css';
import { fetchTrendingSeries } from '../../Apis/ApiServices';

function TrendingSeries() {
  const [trendingSeries, settrendingSeries] = useState([]);

  useEffect(() => {
    fetchTrendingSeries()
      .then((movies) => {
        settrendingSeries(movies);
      });
  }, []);

  console.log(trendingSeries);
  
  return (
    <div className="slider-container">
      <h1 className="text">Tv Shows Of The Week</h1>
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlay
        autoPlaySpeed={2000}
        centerMode={true}
        className=" "
        containerClass="container-with-dots"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
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
        
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
    
       >
        {trendingSeries.map((movie, index) => (
          <div key={index} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              className="movie-image"
              alt={movie.title}
            />
            <div className="blur-background">
              <div className="blur-overlay">
                <div className="card-info-container">
                  <div className="card-info title-trend-movie">
                    <h1>{movie.name}</h1>
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

export default TrendingSeries;
