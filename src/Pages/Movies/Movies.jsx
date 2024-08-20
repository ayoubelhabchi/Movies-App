import React,{ useState, useEffect } from 'react'
import './Movies.css'
import { genreMap, genreColors } from "../../tools/geners";
import { fetchOptionFilter } from '../../Apis/ApiServices';

function Movies() {

  const [filterByYear, setFilterByYear] = useState('')
  const [filterByCertification, setFilterByCertification] = useState('')

  const handleFilterByYear = async (event) => {
    const year = event.target.value;
    setFilterByYear(year);

    if (year && year !== 'Year') { 
      const results = await fetchOptionFilter(year);
      console.log(results);
    }
  };
  const handleFilterByCertification = async (event) => {
    const certification = event.target.value;
    setFilterByCertification(certification);

    if (certification && certification !== 'Certification') {
      await fetchAndFilterData(filterByYear, certification);
    }
  };

  const fetchAndFilterData = async (year, certification) => {
    // Example fetch logic that uses both filters
    if (year || certification) {
      const query = new URLSearchParams();
      if (year && year !== 'Year') query.append('year', year);
      if (certification && certification !== 'Certification') query.append('certification', certification);
      
      const results = await fetchOptionFilter(query.toString());
      console.log(results);
      // Dispatch or update the results as needed
    }
  };

  return (
    <div className="main_container">
      
      <div className="top_search_bar">
        <select 
        onChange={handleFilterByYear}
        value={filterByYear}
        className='custom_select textblack'
         name="" 
         id="">

          <option value="Year">Year</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
        </select>
        <select className='custom_select textblack' name="" id="">
          <option value="Sort By">Sort By</option>
          <option value="vote_count.desc">Most Popular</option>
          <option value="revenue.desc">Revenue Movies</option>
          <option value="primary_release_date.desc">Upcoming Movies</option>
          <option value="primary_release_date.asc">Oldest Movies</option>
        </select>
        <select onChange={handleFilterByCertification}
        value={filterByCertification} className='custom_select textblack' name="" id="">
          <option value="Certification">Certification</option>
          <option value="certification=G&certification_country=US">G</option>
          <option value="certification=PG&certification_country=US">PG</option>
          <option value="certification=PG-13&certification_country=US">PG-13</option>
          <option value="certification=R&certification_country=US">R</option>
          <option value="certification=NC-17&certification_country=US">NC-17</option>
        </select>

        <select className='custom_select textblack' name="" id="">
          <option value="Language">Language</option>
          <option value="US">USA</option>
          <option value="CA">Canada</option>
          <option value="GB">United Kingdom</option>
          <option value="DE">Germany</option>
          <option value="FR">French</option>
          <option value="IT">Germany</option>
          <option value="CN">CN</option>
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
                backgroundColor: genreColors[genre.id], // Assigning the color based on genre ID
                color: '#fff', // Optional: Set text color to white for better contrast
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