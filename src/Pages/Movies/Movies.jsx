import React from 'react'
import './Movies.css'
import { genreMap, genreColors } from "../../tools/geners";

function Movies() {
  return (
    <div className="main_container">
      
      <div className="top_search_bar">

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
            padding: '4px 8px',
            borderRadius: '20px',
            margin: '5px',
            display: 'inline-block',
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