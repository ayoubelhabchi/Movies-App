import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';import './DetailsPage.css'
import { fetchById } from '../../Apis/ApiServices';
import { genreMapMovies, genreColors } from "../../tools/geners";
import { FaStar } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { MdFavorite,MdPlayCircle } from "react-icons/md";

const imageBaseUrl = "https://image.tmdb.org/t/p/w1280/"



function DetailsPage() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

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

  return (
    <div className='details_main_container' style={{backgroundImage: `url(${imageBaseUrl}${movieDetails.details.backdrop_path})`}}>
        
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
                    <button>
                    <MdPlayCircle className='MdPlayCircle'/>
                      Watch Trailer
                      </button>
                  </div>

                  <div className='whichlist'>
                    <MdFavorite className='MdFavorite'/>
                    <button className=''></button>
                  </div>
              </div>

            </div>

          <div className='poster_container'>
            <img className='img_poster' src={`${imageBaseUrl}${movieDetails.details.poster_path}`} alt="" />
          </div>

        </div>

    </div>
  )
}

export default DetailsPage