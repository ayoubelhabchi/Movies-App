import './App.css'
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout/layout';
import Movies from './Pages/Movies/Movies';
import TvSeries from './Pages/Tv/TvSeries';
import Anime from './Pages/Animation/Anime';
import Home from './Pages/Home/Home';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DetailsPage from './Pages/Details Page/DetailsPage';
import TvPageDetails from './Pages/Tv Page/TvPageDetails';
import SeasonDetails from './Pages/Tv Page/Season Deatils/SeasonDetails';
import SignUp from './Pages/SignUp/SignUp';

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
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="movies" element={<Movies />} />
          <Route path="tv-shows" element={<TvSeries />} />
          <Route path="anime" element={<Anime />} />
        </Route>
        <Route path="/details/:id" element={<DetailsPage />} />
        <Route path="/tv/:id" element={<TvPageDetails />} />
        <Route path="/tv/:id/season/:seasonId_Number" element={<SeasonDetails />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      </ThemeProvider>
    </div>
  );
  
}

export default App
