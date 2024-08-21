import React,{ useState, useEffect } from 'react'
import './Movies.css'
import { genreMap, genreColors } from "../../tools/geners";
import { fetchOptionFilter } from '../../Apis/ApiServices';
import { FaStar } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


function Movies() {

  const [filterByYear, setFilterByYear] = useState('');
  const [filterByCertification, setFilterByCertification] = useState('');
  const [filterBySort, setFilterBySort] = useState('');
  const [filterByLanguage, setFilterByLanguage] = useState('');
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  const handleFilterByYear = (event) => setFilterByYear(event.target.value);
  const handleFilterByCertification = (event) => setFilterByCertification(event.target.value);
  const handleFilterBySort = (event) => setFilterBySort(event.target.value);
  const handleFilterByLanguage = (event) => setFilterByLanguage(event.target.value);
  const handlePageChange = (event, value) => {
    setCurrentPage(Math.max(1, Math.min(value, totalPages)));
  };

  useEffect(() => {
    const fetchFilteredData = async () => {
      const { movies, totalPages } = await fetchOptionFilter(
        filterByYear,
        currentPage,
        filterBySort,
        filterByLanguage,
        filterByCertification
      );
      setMovies(movies);
      setTotalPages(totalPages);
    };
  
    fetchFilteredData();
  }, [filterByYear, filterByCertification, filterBySort, filterByLanguage, currentPage]);
  
  


  const getGenreNames = (genreIds) => {
    return genreIds.map(id => {
      const genre = genreMap.find(g => g.id === id);
      if (!genre) return null;
  
      const backgroundColor = genreColors[id] || "#ccc";
      return (
        <span
          key={id}
          style={{
            backgroundColor: backgroundColor,
            color: "#fff",
            padding: "0px 5px 0px",
            borderRadius: "30px",
            margin: "1.5px 1px 4px",
            display: "inline-block",
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
    <div className="main_container">
      
      <div className="top_search_bar">
        <select onChange={handleFilterByYear} value={filterByYear} className='custom_select textblack' name="" id="">
          <option value="Year">Year</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
        </select>
        {/* Sort Filter */}
        <select onChange={handleFilterBySort} value={filterBySort} className="custom_select textblack">
          <option value="">Sort By</option>
          <option value="vote_count.desc">Most Popular</option>
          <option value="revenue.desc">Revenue Movies</option>
          <option value="primary_release_date.desc">Upcoming Movies</option>
          <option value="primary_release_date.asc">Oldest Movies</option>
        </select>

        {/* Certification Filter */}
        <select onChange={handleFilterByCertification} value={filterByCertification} className="custom_select textblack">
          <option value="">Certification</option>
          <option value="certification=G&certification_country=US">G</option>
          <option value="certification=PG&certification_country=US">PG</option>
          <option value="certification=PG-13&certification_country=US">PG-13</option>
          <option value="certification=R&certification_country=US">R</option>
          <option value="certification=NC-17&certification_country=US">NC-17</option>
        </select>

        {/* Language Filter */}
        <select onChange={handleFilterByLanguage} value={filterByLanguage} className="custom_select textblack">
          <option value="">Language</option>
          <option value="US">USA</option>
          <option value="CA">Canada</option>
          <option value="GB">United Kingdom</option>
          <option value="DE">Germany</option>
          <option value="FR">French</option>
          <option value="IT">Italy</option>
          <option value="CN">China</option>
          <option value="AR">Arabic</option>
        </select>
      </div>

      <div className="container_main_tags">

        <div className='main_container'>
          {movies && movies.length > 0 ? (
            <div className='movies_grid'>
              {movies.map((movie) => (
                <div className='movie_card' key={movie.id}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    className='movie_poster'
                  />
                  <div className='movie_hover_details'>
                    <h3 className='movie_title'>{movie.title}</h3>
                    <div className="ratings_movies_container">
                      <div className="rating_movie">
                        <FaStar className='FaStar' />
                        <h2>{movie.vote_average}</h2>
                      </div>
                      <div className="vots_movie">
                        <AiFillLike className="AiFillLike" />
                        <h2>{movie.vote_count}</h2>
                      </div>
                    </div>
                      <div className="genres_movie_page">
                        <p className="gener_movie_page">{getGenreNames(movie.genre_ids)}</p>
                      </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No movies found.</p>
          )}
        </div>


        <div className="side_tags">
        
            {genreMap.map((genre) => (
            <div
              className='tags'
              key={genre.id}
              style={{
                backgroundColor: genreColors[genre.id],
                color: '#fff',
                // padding: '6px',
                borderRadius: '20px',
                margin: '5px',
                // display: 'inline-block',
              }}
            >
              {genre.name}
            </div>
          ))}

        </div>

      </div>


      <div className="pagination_container">
      <Stack spacing={2} sx={{ marginTop: '20px', alignItems: 'center' }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          showFirstButton
          showLastButton
          color="primary"
        />
      </Stack>
      </div>
        
  </div>
  )
}

export default Movies