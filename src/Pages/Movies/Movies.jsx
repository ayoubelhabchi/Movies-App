import React,{ useState, useEffect } from 'react'
import './Movies.css'
import { genreMap, genreColors } from "../../tools/geners";
import { fetchOptionFilter } from '../../Apis/ApiServices';

function Movies() {

  const [filterByYear, setFilterByYear] = useState('');
  const [filterByCertification, setFilterByCertification] = useState('');
  const [filterBySort, setFilterBySort] = useState('');
  const [filterByLanguage, setFilterByLanguage] = useState('');
  const [movies, setMovies] = useState([]);

  const handleFilterByYear = (event) => setFilterByYear(event.target.value);
  const handleFilterByCertification = (event) => setFilterByCertification(event.target.value);
  const handleFilterBySort = (event) => setFilterBySort(event.target.value);
  const handleFilterByLanguage = (event) => setFilterByLanguage(event.target.value);


  useEffect(() => {
    const fetchFilteredData = async () => {
      const results = await fetchOptionFilter(
        filterByYear,   // year
        1,              // page (default to 1)
        filterBySort,   // highScore (sort option)
        filterByLanguage, // language
        filterByCertification // certification
      );
      setMovies(results);
      console.log("results", results);
    };

    // Trigger fetch only if any filter is selected
    if (
      filterByYear ||
      filterByCertification ||
      filterBySort ||
      filterByLanguage
    ) {
      fetchFilteredData();
    }
  }, [filterByYear, filterByCertification, filterBySort, filterByLanguage]);

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

        <div className='main_content'>

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

    </div>
  )
}

export default Movies