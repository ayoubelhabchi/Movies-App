import React, {useEffect,useState} from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './TrendingMovies.css';
import deadpool2 from './../../assets/deadpool2.jpeg'
import { fetchPopularMovies } from '../../Apis/ApiServices';

function TrendingMovies() {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    fetchPopularMovies()
    .then((movies) => {
      setPopularMovies(movies);
    });
  }, []);

  console.log(popularMovies);
  

  return (
    <div className="slider-container ">
        <h1>Popular Movies</h1>
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
          {popularMovies.map((movie,index) =>(
            <img key={index} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            // className="Image_Card h-[230px] w-[1000px] px-2 ob objectcover rounded-3xl"
            className="Image_Card h-[330px] w[400px] px2 object-contain objectcover rounded-3xl"
             alt="" />
          ))}
    </Carousel>
    </div>
  );
}

export default TrendingMovies;
