import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Movies.css";
import { genreMapMovies, genreColors } from "../../tools/geners";
import { fetchMoviesOptionFilter } from "../../Apis/ApiServices";
import { FaStar } from "react-icons/fa";
import { HiOutlineXMark } from "react-icons/hi2";
import { AiFillLike } from "react-icons/ai";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { IoSearchSharp } from "react-icons/io5";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { selectTheme } from "../../tools/muiTheme";
import { ThemeProvider } from "@mui/material/styles";
import { useMediaQuery, useTheme } from "@mui/material";

function Movies() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  const [filterByYear, setFilterByYear] = useState("");
  const [filterByCertification, setFilterByCertification] = useState("");
  const [filterBySort, setFilterBySort] = useState("");
  const [filterByProvider, setFilterByProvider] = useState("");
  const [filterByLanguage, setFilterByLanguage] = useState("");
  const [filterByCountry, setFilterByCountry] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const handleFilterByYear = (event) => setFilterByYear(event.target.value);
  const handleFilterByCertification = (event) =>
    setFilterByCertification(event.target.value);
  const handleFilterBySort = (event) => setFilterBySort(event.target.value);
  const handleFilterByProvider = (event) => setFilterByProvider(event.target.value);
  const handleFilterByLanguage = (event) =>
    setFilterByLanguage(event.target.value);
  const handleFilterByCountry = (event) =>
    setFilterByCountry(event.target.value);
  const handlePageChange = (event, value) => {
    setCurrentPage(Math.max(1, Math.min(value, totalPages)));
  };

  useEffect(() => {
    const fetchFilteredData = async () => {
      const { movies, totalPages } = await fetchMoviesOptionFilter(
        searchQuery,
        filterByYear,
        currentPage,
        filterBySort,
        filterByProvider,
        filterByLanguage,
        filterByCountry,
        filterByCertification,
        selectedGenres
      );

      setMovies(movies);
      setTotalPages(totalPages);
    };

    fetchFilteredData();
  }, [
    searchQuery,
    filterByYear,
    filterByCertification,
    filterBySort,
    filterByProvider,
    filterByLanguage,
    filterByCountry,
    currentPage,
    selectedGenres,
  ]);

  const handleGetById = (id) => {
    navigate(`/details/${id}`);
  };

  const getGenreNames = (genreIds) => {
    return genreIds.map((id) => {
      const genre = genreMapMovies.find((g) => g.id === id);
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
        return [...prevSelectedGenres, genreId]; // Add the genre if not selected
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
        <div className="filter_bar">
          <ThemeProvider theme={selectTheme}>
            <FormControl
              sx={{ m: 0, paddingRight: 0 }}
              size="small"
            >
              <InputLabel id="filter-year-label">Year</InputLabel>
              <Select
                labelId="filter-year-label"
                id="filter-year"
                value={filterByYear}
                label="Year"
                onChange={handleFilterByYear}
              >
                <MenuItem value="">Year</MenuItem>
                <MenuItem value={2024}>2024</MenuItem>
                <MenuItem value={2023}>2023</MenuItem>
                <MenuItem value={2022}>2022</MenuItem>
                <MenuItem value={2021}>2021</MenuItem>
              </Select>
            </FormControl>

            <FormControl
              sx={{ m: 0, paddingRight: 0 }}
              size="small"
            >
              <InputLabel id="filter-sort-label">Sort By</InputLabel>
              <Select
                labelId="filter-sort-label"
                id="filter-sort"
                value={filterBySort}
                label="Sort By"
                onChange={handleFilterBySort}
              >
                <MenuItem value="">Sort By</MenuItem>
                <MenuItem value="vote_count.desc">Most Popular</MenuItem>
                <MenuItem value="revenue.desc">Revenue Movies</MenuItem>
                <MenuItem value="primary_release_date.desc">
                  Upcoming Movies
                </MenuItem>
                <MenuItem value="primary_release_date.asc">
                  Oldest Movies
                </MenuItem>
              </Select>
            </FormControl>

            <FormControl
              sx={{ m: 0, paddingRight: 0 }}
              size="small"
            >
              <InputLabel id="filter-sort-label">Providers</InputLabel>
              <Select
                labelId="filter-provider-label"
                id="filter-provider"
                value={filterByProvider}
                label="Provider"
                onChange={handleFilterByProvider}
              >
                <MenuItem value="">Provider</MenuItem>
                <MenuItem value="8">Netflix</MenuItem>
                <MenuItem value="337">Disney Plus</MenuItem>
                <MenuItem value="9">
                Amazon Prime Video
                </MenuItem>
                <MenuItem value="350">
                Apple TV
                </MenuItem>
                <MenuItem value="15">Hulu</MenuItem>
                <MenuItem value="283">Crunchyroll</MenuItem>
              </Select>
            </FormControl>

            <FormControl
              sx={{ m: 0, paddingRight: 0 }}
              size="small"
            >
              <InputLabel id="filter-certification-label">
                Certification
              </InputLabel>
              <Select
                labelId="filter-certification-label"
                id="filter-certification"
                value={filterByCertification}
                label="Certification"
                onChange={handleFilterByCertification}
              >
                <MenuItem value="">Certification</MenuItem>
                <MenuItem value="certification=G&certification_country=US">
                  G
                </MenuItem>
                <MenuItem value="certification=PG&certification_country=US">
                  PG
                </MenuItem>
                <MenuItem value="certification=PG-13&certification_country=US">
                  PG-13
                </MenuItem>
                <MenuItem value="certification=R&certification_country=US">
                  R
                </MenuItem>
                <MenuItem value="certification=NC-17&certification_country=US">
                  NC-17
                </MenuItem>
              </Select>
            </FormControl>

            <FormControl
              sx={{ m: 0, paddingRight: 0 }}
              size="small"
            >
              <InputLabel id="filter-language-label">Language</InputLabel>
              <Select
                labelId="filter-language-label"
                id="filter-language"
                value={filterByLanguage}
                label="Language"
                onChange={handleFilterByLanguage}
              >
                <MenuItem value="">Language</MenuItem>
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="ca">Canada</MenuItem>
                <MenuItem value="en">United Kingdom</MenuItem>
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

            <FormControl
              sx={{ m: 0, paddingRight: 0 }}
              size="small"
            >
              <InputLabel id="filter-country-label">Country</InputLabel>
              <Select
                labelId="filter-country-label"
                id="filter-country"
                value={filterByCountry}
                label="Country"
                onChange={handleFilterByCountry}
              >
                <MenuItem value="">Country</MenuItem>
                <MenuItem value="US">USA</MenuItem>
                <MenuItem value="CA">Canada</MenuItem>
                <MenuItem value="GB">United Kingdom</MenuItem>
                <MenuItem value="DE">Germany</MenuItem>
                <MenuItem value="FR">French</MenuItem>
                <MenuItem value="IT">Italy</MenuItem>
                <MenuItem value="CN">China</MenuItem>
                <MenuItem value="KR">Korea</MenuItem>
                <MenuItem value="JP">Japan</MenuItem>
                <MenuItem value="AR">Arabic</MenuItem>
              </Select>
            </FormControl>
          </ThemeProvider>
        </div>

        <div className="btn_search_container">
          <div className="Search_Bar_Container_movies">
            <form className={`Search_Bar_Movies`} onSubmit={handleSearch}>
              {isSearchVisible ? (
                <IoSearchSharp
                  className="IoSearchSharp"
                  onClick={toggleSearchBar}
                />
              ) : (
                <IoSearchSharp
                  className="toggle text-2xl cursor-pointer"
                  onClick={toggleSearchBar}
                />
              )}
              {isSearchVisible && (
                <input
                  placeholder="DeadPool..."
                  type="text"
                  className="Search_Input_Movies"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              )}
            </form>
          </div>
          <div className="btn_container">
            <button onClick={clearTags}>
              <HiOutlineXMark className="HiOutlineXMark" />
              Clear
            </button>
          </div>
        </div>
      </div>

      <div className="container_main_tags">
        <div className="main_container">
          {movies && movies.length > 0 ? (
            <div className="movies_grid">
              {movies.map((movie) => (
                <div
                  className="movie_card"
                  onClick={() => handleGetById(movie.id)}
                  key={movie.id}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    className="movie_poster"
                  />
                  <div className="movie_hover_details">
                    <h3 className="movie_title">{movie.title}</h3>
                    <div className="ratings_movies_container">
                      <div className="rating_movie">
                        <FaStar className="FaStar" />
                        <h2>{movie.vote_average}</h2>
                      </div>
                      <div className="vots_movie">
                        <AiFillLike className="AiFillLike" />
                        <h2>{movie.vote_count}</h2>
                      </div>
                    </div>
                    <div className="genres_movie_page">
                      <p className="gener_movie_page">
                        {getGenreNames(movie.genre_ids)}
                      </p>
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
          {genreMapMovies.map((genre) => (
            <div
              key={genre.id}
              className={`tags ${
                selectedGenres.includes(genre.id) ? "selected " : ""
              }`}
              onClick={() => handleGenreSelect(genre.id)}
              style={{
                backgroundColor: genreColors[genre.id],
                color: "#fff",
                borderRadius: "20px",
                margin: "5px",
              }}
            >
              {genre.name}
            </div>
          ))}
        </div>
      </div>

      <div className="pagination_container">
        <Stack
          spacing={2}
          sx={{
            alignItems: "center",
            flexWrap: "nowrap",
            paddingBottom: "20px",
          }}
        >
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            showFirstButton
            showLastButton
            color="primary"
            siblingCount={0}
            boundaryCount={isLargeScreen ? 1 : 0}
          />
        </Stack>
      </div>
    </div>
  );
}

export default Movies;
