import React from 'react'
import './Home.css'
import Hero from '../../Components/Hero/Hero'
import Trending from '../../Components/Trending/Trending'
import TrendingMovies from '../../Components/TrendingMovies/TrendingMovies'
import TrendingSeries from '../../Components/TrendingSeries/TrendingSeries'

function Home() {
  return (
    <div className='Components_Container'>
      <Hero/>
      {/* <Trending/>
      <TrendingMovies/>
      <TrendingSeries/> */}
    </div>
  )
}

export default Home