import React, { useEffect, useState } from "react";
// import "./FavoritesList.css";
import {
  getWatchlistMoviesList,
  deleteMovieWatchlist,
} from "../../../Apis/ApiServer";
import { FaStar } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
  padding: "8px",
}));

const posterBaseUrl = "https://image.tmdb.org/t/p/w500/";

function Watchlist() {
  const [favortedList, setFavoritedList] = useState([]);

  useEffect(() => {
    async function getMoviesList() {
      try {
        const response = await getWatchlistMoviesList();
        setFavoritedList(response);
        console.log(response);
      } catch (error) {
        console.error("Failed to fetch favorite movies:", error);
      }
    }

    getMoviesList();
  }, [favortedList]);

  const handleMovieDelete = async (id) => {
    const response = await deleteMovieWatchlist(id);
    // console.log(response);
  };

  return (
    <div className="list_main_container">
      <div className="headline">
        <h1>Watchlist</h1>
      </div>
      <div>
        <Box sx={{ width: "100%" }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {favortedList.map((movie, index) => (
              <Grid>
                <Item className="item-container">
                  <div className="item-card-container">
                    <div className="delete-container">
                      <Tooltip title="Delete">
                        <IconButton onClick={() => handleMovieDelete(movie.id)}>
                          <MdDelete className="MdOutlineDeleteForever" />
                        </IconButton>
                      </Tooltip>
                    </div>
                    <img src={`${posterBaseUrl}${movie.poster_path}`} alt="" />

                    <div className="item-cards-info-container">
                      <h1>{movie.title}</h1>
                      <div>
                        <FaStar className="FaStar-FaStar" />
                        <h2>{movie.vote_average}</h2>
                      </div>
                    </div>
                  </div>
                </Item>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </div>
  );
}

export default Watchlist;
