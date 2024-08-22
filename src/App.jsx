import './App.css'
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout/layout';
import Movies from './Pages/Movies/Movies';
import TvSeries from './Pages/Tv/TvSeries';
import Anime from './Pages/Anime';
import Home from './Pages/Home/Home';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#e74848',
      main: '#960019d2',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
    text: {
      primary: '#cacaca', 
      secondary: '#bbbbbb',
    },
  },
});


function App() {

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/tv-shows" element={<TvSeries />} />
            <Route path="/anime" element={<Anime />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </div>
  );
  
}

export default App
