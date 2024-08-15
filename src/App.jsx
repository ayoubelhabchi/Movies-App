import './App.css'
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout/layout';
import Movies from './Pages/Movies/Movies';
import TvSeries from './Pages/TvSeries';
import Anime from './Pages/Anime';
import Home from './Pages/Home/Home';



function App() {

  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tv-shows" element={<TvSeries />} />
          <Route path="/anime" element={<Anime />} />
        </Routes>
      </Layout>
    </div>
  )
}

export default App
