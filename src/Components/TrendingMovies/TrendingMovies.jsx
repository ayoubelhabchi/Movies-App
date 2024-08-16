import React from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './TrendingMovies.css';
import deadpool2 from './../../assets/deadpool2.jpeg'

function TrendingMovies() {

  return (
    <div className="slider-container">
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
          {['first', 'second', 'third', 'fourth', 'fifth'].map((item, index) => (
          <div key={index} className="flex px-2 justify-center items-center">
            <img
              src={deadpool2}
              alt={item}
              className="h-[180px] w-[400px] object-cover rounded-3xl"
            />
          </div>
        ))}
         
    </Carousel>
    </div>
  );
}

export default TrendingMovies;
