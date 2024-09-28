const getCarouselSettings = () => ({
    additionalTransfrom: 0,
    arrows: true,
    autoPlay: true,
    autoPlaySpeed: 2500,
    centerMode: false,
    className: " ",
    containerClass: "container-with-dots",
    dotListClass: "",
    draggable: true,
    focusOnSelect: false,
    infinite: true,
    itemClass: "",
    keyBoardControl: true,
    pauseOnHover: true,
    renderArrowsWhenDisabled: false,
    renderButtonGroupOutside: false,
    renderDotsOutside: false,
    responsive: {
      desktop: {
        breakpoint: {
          max: 3000,
          min: 1024,
        },
        items: 1,
        partialVisibilityGutter: 40,
      },
      mobile: {
        breakpoint: {
          max: 464,
          min: 0,
        },
        items: 1,
        partialVisibilityGutter: 30,
      },
      tablet: {
        breakpoint: {
          max: 1024,
          min: 464,
        },
        items: 1,
        partialVisibilityGutter: 30,
      },
    },
    rewind: false,
    rewindWithAnimation: false,
    rtl: false,
    shouldResetAutoplay: true,
    showDots: false,
    sliderClass: "",
    slidesToSlide: 1,
    swipeable: true,
  });
  
  const SliderArrow = ({ className, style, onClick, position }) => {
    const arrowStyle =
      position === "next"
        ? { ...style, right: "10px", zIndex: "1" }
        : { ...style, left: "10px", zIndex: "1" };

    return <div className={className} style={arrowStyle} onClick={onClick} />;
  };

  // const slidesSettings = (seasonsLength) => ({
  //   dots: false,
  //   infinite: seasonsLength > 1,
  //   slidesToShow: Math.min(seasonsLength, 4),
  //   slidesToScroll: 1,
  //   initialSlide: 0,
  //   centerMode: seasonsLength === 1,
  //   responsive: [
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 5,
  //         slidesToScroll: 1,
  //         infinite: true,
  //         dots: true,
  //       },
  //     },
  //     {
  //       breakpoint: 600,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 2,
  //         initialSlide: 2,
  //       },
  //     },
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //       },
  //     },
  //   ],
  //   autoplay: seasonsLength > 1,
  //   speed: 1000,
  //   autoplaySpeed: 3000,
  //   cssEase: "linear",
  //   nextArrow: <SliderArrow position="next" />,
  //   prevArrow: <SliderArrow position="prev" />,
  // });

  const slidesSettings = (seasonsCount) => ({
    dots: false,
    infinite: seasonsCount > 1,
    slidesToShow: seasonsCount > 1 ? Math.min(seasonsCount, 4) : 1,
    slidesToScroll: 1,
    initialSlide: 0,
    centerMode: seasonsCount === 1,
    centerPadding: seasonsCount === 1 ? "38%"  : "0px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: seasonsCount > 1 ? Math.min(seasonsCount, 4) : 1,
          slidesToScroll: 1,
          infinite: seasonsCount > 1,
          dots: true,
          centerMode: seasonsCount === 1,
          centerPadding: seasonsCount === 1 ? "20%" : "0px",
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: seasonsCount > 1 ? 2 : 1,
          slidesToScroll: 1,
          initialSlide: 0,
          centerMode: seasonsCount === 1,
          centerPadding: seasonsCount === 1 ? "15%" : "0px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: seasonsCount === 1,
          centerPadding: seasonsCount === 1 ? "10%" : "0px",
        },
      },
    ],
    autoplay: seasonsCount > 1,
    speed: 1000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    nextArrow: <SliderArrow position="next" />,
    prevArrow: <SliderArrow position="prev" />,
  });
  
  
  export {getCarouselSettings, slidesSettings};
  