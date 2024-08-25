import React,{ useState, useEffect } from 'react'
// import './Movies.css'
import { genreMap, genreColors } from "../../tools/geners";
import { fetchSeriesOptionFilter } from '../../Apis/ApiServices';
import { FaStar } from "react-icons/fa";
import { HiOutlineXMark } from "react-icons/hi2";
import { IoSearchSharp } from "react-icons/io5";
import { AiFillLike } from "react-icons/ai";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const selectTheme = createTheme({
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: 'black',
          '&.Mui-selected': {
            color: 'red', // Selected item text color
            backgroundColor: '#f5f5f5', // Selected item background color
          },
          '&.Mui-selected:hover': {
            backgroundColor: '#ffe6e6', // Hover color when the item is selected
          },
          '&:hover': {
            backgroundColor: '#ffe6e6', // Background color when hovering
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: 'red', // Selected text color
          fontWeight:'bold',
          backgroundColor: 'none', // Background color of the Select component
          '& .MuiSelect-icon': {
            color: 'red', // Dropdown arrow color
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'gray', // Default border color
            borderWidth: '2px',
          },

          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'red', // Border color when hovering
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'red', // Border color when focused
          },
          borderRadius: '20px',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: 'white', // Year label text color
          // fontWeight: '',
          '&.Mui-focused': {
            color: 'red', // Change label text color to red when focused
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#', // Background color of the dropdown list
        },
      },
    },
  },
});

function TvSeries() {

  const [filterByYear, setFilterByYear] = useState('');
  const [filterByStatus, setFilterByStatus] = useState('');
  const [filterBySort, setFilterBySort] = useState('');
  const [filterByLanguage, setFilterByLanguage] = useState('');
  const [filterByCountry, setFilterByCountry] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);


  const handleFilterByYear = (event) => setFilterByYear(event.target.value);
  const handleFilterByStatus = (event) => setFilterByStatus(event.target.value);
  const handleFilterBySort = (event) => setFilterBySort(event.target.value);
  const handleFilterByLanguage = (event) => setFilterByLanguage(event.target.value);
  const handleFilterByCountry = (event) => setFilterByCountry(event.target.value);
  const handlePageChange = (event, value) => {
    setCurrentPage(Math.max(1, Math.min(value, totalPages)));
  };

  useEffect(() => {
    const fetchFilteredData = async () => {
      const { movies, totalPages } = await fetchSeriesOptionFilter(
        searchQuery,
        filterByYear,
        currentPage,
        filterBySort,
        filterByLanguage,
        filterByCountry,
        filterByStatus,
        selectedGenres
      );
      console.log("seres",selectedGenres);
      
      setMovies(movies);
      setTotalPages(totalPages);
    };
  
    fetchFilteredData();
  }, [searchQuery, filterByYear, filterByStatus, filterBySort, filterByLanguage,filterByCountry, currentPage,selectedGenres]);
  
  


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

  const handleGenreSelect = (genreId) => {
    setSelectedGenres((prevSelectedGenres) => {
      if (prevSelectedGenres.includes(genreId)) {
        return prevSelectedGenres.filter((id) => id !== genreId);
      } else {
        return [...prevSelectedGenres, genreId]; 
      }
    });
  };


  const clearTags = () => {
    setSelectedGenres([]); 
  };

  
  const handleSearch = async (e) => {
    e.preventDefault();
    
  };
  
  const toggleSearchBar = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  
  return (
    <div className="main_container">
      
      <div className="top_search_bar">
        <div>
          {/* Sort Year */}
          
        <ThemeProvider theme={selectTheme}>
          <FormControl sx={{ m: 0,paddingRight: 1, minWidth: 90 }} size="small">
            <InputLabel sx={{ color: 'white' }} id="demo-select-small-label">Year</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={filterByYear}
              label="Year"
              onChange={handleFilterByYear}
            >
              {/* <MenuItem value="">
                <em>None</em>
              </MenuItem> */}
              <MenuItem value={2024}>2024</MenuItem>
              <MenuItem value={2023}>2023</MenuItem>
              <MenuItem value={2022}>2022</MenuItem>
            </Select>
          </FormControl>
        </ThemeProvider>
        
        {/* Sort Filter */}
        {/* Sort By */}
        <ThemeProvider theme={selectTheme}>
          <FormControl sx={{ m: 0, paddingRight: 1, minWidth: 110 }} size="small">
            <InputLabel sx={{ color: 'white' }}>Sort By</InputLabel>
            <Select
              value={filterBySort}
              label="Sort By"
              onChange={handleFilterBySort}
            >
              <MenuItem value="popularity.desc">Sort By</MenuItem>
              <MenuItem value="popularity.desc">Most Popular</MenuItem>
              <MenuItem value="vote_count.desc">Top Rated</MenuItem>
              <MenuItem value="vote_count.asc">Less Rated</MenuItem>
            </Select>
          </FormControl>
        </ThemeProvider>

        {/* Certification Filter */}
        <ThemeProvider theme={selectTheme}>
          <FormControl sx={{ m: 0, paddingRight: 1, minWidth: 100 }} size="small">
            <InputLabel sx={{ color: 'white' }}>Status</InputLabel>
            <Select
              value={filterByStatus}
              label="Status"
              onChange={handleFilterByStatus}
            >
              <MenuItem value="">Status</MenuItem>
              <MenuItem value="0">Returning Series</MenuItem>
              <MenuItem value="1">Planned</MenuItem>
              <MenuItem value="2">In Production</MenuItem>
              <MenuItem value="3">Ended</MenuItem>
              <MenuItem value="4">Canceled</MenuItem>
              <MenuItem value="5">Pilot</MenuItem>
            </Select>
          </FormControl>
        </ThemeProvider>

        {/* Language Filter */}
        <ThemeProvider theme={selectTheme}>
          <FormControl sx={{ m: 0, paddingRight: 1, minWidth: 130 }} size="small">
            <InputLabel sx={{ color: 'white' }}>Language</InputLabel>
            <Select
              value={filterByLanguage}
              label="Language"
              onChange={handleFilterByLanguage}
            >
              <MenuItem value="">Language</MenuItem>
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="ca">Canada</MenuItem>
              {/* <MenuItem value="en">United Kingdom</MenuItem> */}
              <MenuItem value="de">Germany</MenuItem>
              <MenuItem value="fr">French</MenuItem>
              <MenuItem value="es">Spanish</MenuItem>
              <MenuItem value="it">Italy</MenuItem>
              <MenuItem value="zh">China</MenuItem>
              <MenuItem value="ko">Korea</MenuItem>
              <MenuItem value="ja">Japan</MenuItem>
              <MenuItem value="ar">Arabic</MenuItem>
            </Select>
          </FormControl>
        </ThemeProvider>

        {/* Country Filter */}
        <ThemeProvider theme={selectTheme}>
          <FormControl sx={{ m: 0, paddingRight: 1, minWidth: 110 }} size="small">
            <InputLabel sx={{ color: 'white' }}>Country</InputLabel>
            <Select
              value={filterByCountry}
              label="Country"
              onChange={handleFilterByCountry}
            >
              <MenuItem value="">Country</MenuItem>
              <MenuItem value="US">USA</MenuItem>
              <MenuItem value="CA">Canada</MenuItem>
              <MenuItem value="GB">United Kingdom</MenuItem>
              <MenuItem value="DE">Germany</MenuItem>
              <MenuItem value="FR">France</MenuItem>
              <MenuItem value="IT">Italy</MenuItem>
              <MenuItem value="CN">China</MenuItem>
              <MenuItem value="KR">Korea</MenuItem>
              <MenuItem value="JP">Japan</MenuItem>
              <MenuItem value="AR">Arabic</MenuItem>
            </Select>
          </FormControl>
        </ThemeProvider>

        </div>

        <div className='btn_search_container'>
            <div className='Search_Bar_Container_movies'>
              <form className={`Search_Bar_Movies`} onSubmit={handleSearch}>
                {isSearchVisible ? (
                  <IoSearchSharp className='IoSearchSharp' onClick={toggleSearchBar} />
                ) : (
                  <IoSearchSharp className='toggle text-2xl cursor-pointer' onClick={toggleSearchBar} />
                )}
                {isSearchVisible && (
                  <input
                    placeholder='DeadPool...'
                    type="text"
                    className='Search_Input_Movies'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                )}
              </form>
            </div>
          <div className='btn_container'>
          <button onClick={clearTags}>
          <HiOutlineXMark className='HiOutlineXMark'/>
            Clear
          </button>
          </div>
          
        </div>

        
        

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
                    <h3 className='movie_title'>{movie.name}</h3>
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
              // className='tags'
              key={genre.id}
              className={`tags ${selectedGenres.includes(genre.id) ? 'selected ' : ''}`}
              onClick={() => handleGenreSelect(genre.id)}
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

export default TvSeries