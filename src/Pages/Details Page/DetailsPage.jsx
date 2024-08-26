import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import { Link, NavLink, useParams} from 'react-router-dom'
import './DetailsPage.css'
import { fetchById } from '../../Apis/ApiServices';
import { genreMapMovies, genreColors } from "../../tools/geners";
import { FaStar } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { MdFavorite,MdPlayCircle } from "react-icons/md";
import { GoHomeFill } from "react-icons/go";


const imageBaseUrl = "https://image.tmdb.org/t/p/w1280/"



function DetailsPage() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [playTrailer, setPlayTrailer] = useState(false)

  const handleTrailerPlay = () =>{
    setPlayTrailer(true)
  }

  useEffect(() => {
    async function getMoviesDetails() {
      const details = await fetchById(id)
      setMovieDetails(details);
      console.log(details);
      
    }
    getMoviesDetails()
  },[id])


  if (!movieDetails) return <div className=' text-white text-3xl'>Loading...</div>
  
  const genreIds = movieDetails.details.genres.map(genre => genre.id);

  // Function to get genre names and apply color styles
  const getGenreNames = (genreIds) => {
    return genreIds.map(id => {
      // Find the genre details using the genreMapMovies or similar mapping
      const genre = genreMapMovies.find(g => g.id === id);
      if (!genre) return null;

      // Get the background color for the genre
      const backgroundColor = genreColors[id] || "#ccc";

      return (
        <span
          key={id}
          style={{
            backgroundColor: backgroundColor,
            color: "#fff",
            padding: "4px 5px 4px",
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

  // console.log("movieDetails.details.videos[0]?.results.key",movieDetails.details.videos.results[0]?.key);

  return (
    <div className='details_main_container' style={{backgroundImage: `url(${imageBaseUrl}${movieDetails.details.backdrop_path})`}}>
        <nav className='nav_container'>
          <div className='icon_container'>
            <img className='h-12 w-12' src="/popcorn-svgrepo-com.svg" />
            <h1>Fushaar</h1>
          </div>
          <ul className='nav_links'>
            <li className=''>
            <NavLink
              to="/movies"
              className={({ isActive }) =>
                `text-white  hover:opacity-100 leading-normal no-underline relative after:content-[''] after:absolute after:w-full after:h-[3px] after:bg-white after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:origin-bottom-right hover:after:origin-bottom-left after:transition-transform after:duration-300 ${isActive ? 'opacity-100 after:scale-x-100 after:bg-white font-semibold text-xl' : 'opacity-60 text-lg'}`
              }
            >
              Movies
            </NavLink>
            </li>
            <li>
            <NavLink
              to="/tv-shows"
              className={({ isActive }) =>
                `text-white  hover:opacity-100 leading-normal no-underline relative after:content-[''] after:absolute after:w-full after:h-[3px] after:bg-white after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:origin-bottom-right hover:after:origin-bottom-left after:transition-transform after:duration-300 ${isActive ? 'opacity-100 after:scale-x-100 after:bg-white font-semibold text-xl' : 'opacity-60 text-lg'}`
              }
            >
              Tv Shows
            </NavLink>
            </li>
            <li>
            <NavLink
              to="/anime"
              className={({ isActive }) =>
                `text-white  hover:opacity-100 leading-normal no-underline relative after:content-[''] after:absolute after:w-full after:h-[3px] after:bg-white after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:origin-bottom-right hover:after:origin-bottom-left after:transition-transform after:duration-300 ${isActive ? 'opacity-100 after:scale-x-100 after:bg-white font-semibold text-xl' : 'opacity-60 text-lg'}`
              }
            >
              Anime
            </NavLink>
            </li>
          </ul>
        </nav>
      <div className='deatils_shadows'></div>

        <div className='deatils_section'>
           
            <div className='poster_details_container'>
              <div className='poster_title'>
                  <h1>{movieDetails.details.title}</h1>
              </div>
              <div className='poster_ratings'>
                  <div>
                    <FaStar className='FaStar'/>
                    <h2 className='vote_average'>{movieDetails.details.vote_average} /10</h2>
                  </div>
                  <div>
                    <AiFillLike className='AiFillLike'/>
                    <h2 className='vote_count'>{movieDetails.details.vote_count}</h2>
                  </div>

                  <div>
                    <h3>{getGenreNames(genreIds)}</h3>
                  </div>

                  <div>
                    <h3>{movieDetails.details.origin_country}</h3>
                  </div>

                  <div>
                    <h3>{movieDetails.details.original_language}</h3>
                  </div>

                  <div>
                    <h3 className=' bg-gray-400 rounded-full p-0.5 px-1'>{movieDetails.details.runtime} min</h3>
                  </div>
                  <div>
                    <h3>{movieDetails.details.status}</h3>
                  </div>

              </div>

              <div className='poster_overview'>
                <p>{movieDetails.details.overview}</p>
              </div>

              <div className='poster_providers'>

                  <div className='watch_trailer'>
                    <button onClick={handleTrailerPlay}>
                    <MdPlayCircle className='MdPlayCircle'/>
                      Watch Trailer
                    </button>
                  </div>

                  <div className='whichlist'>
                    <MdFavorite className='MdFavorite'/>
                    <button></button>
                  </div>

                  <div className='officila_site'>
                    <a href={movieDetails.details.homepage} target="_blank" rel="noopener noreferrer">
                    <GoHomeFill className='GoHomeFill'/>
                    Official WebSite
                    </a>
                  </div>
              </div>

            </div>

          <div className='poster_container'>
            <img className='img_poster' src={`${imageBaseUrl}${movieDetails.details.poster_path}`} alt="" />
          </div>

        </div>

              {playTrailer &&

             <YouTube
             videoId={movieDetails.details.videos.results[38]?.key}
             />
              }

    </div>
  )
}

export default DetailsPage