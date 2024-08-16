import React from 'react'
import './Home.css'
import Hero from '../../Components/Hero/Hero'
import TrendingMovies from '../../Components/TrendingMovies/TrendingMovies'

function Home() {
  return (
    <div className='Components_Container'>
      <Hero/>
      <TrendingMovies/>
    </div>
  )
}

export default Home