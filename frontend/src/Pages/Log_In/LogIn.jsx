import React, { useEffect, useState } from "react";
// import "./SignUp.css";
import { sigIn } from "../../Apis/Auth Apis/AuthApis";
import { fetchTrending } from "../../Apis/ApiServices";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

function LognIn() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  const handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
  };

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
  };

  useEffect(() => {
    const getPosters = async () => {
      const movies = await fetchTrending();
      setMovies(movies);
    };
    getPosters();

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (movies.length - 11));
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await sigIn(formData);
      const successMessage = response.message;
      setSuccess(successMessage);
      setOpenSuccess(true);
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.error;
        setError(errorMessage);
        setOpenError(true);
      } else {
        setError("Something went wrong. Please try again.");
        setOpenError(true);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signup_main_container">
      <div className="signup_container">
        <div className="signup_text">
          <h2>Welcome to Fushaar</h2>
          <div className="singin_link">
            <h3>New to Fushaar ?</h3>
            <a className="text-[#ae021f] font-medium" href="/signup">
              Create an account
            </a>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          
          <div>
            <input
              placeholder="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              placeholder="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          

          <div className="button_container">
            <button type="submit">Log In</button>
          </div>
        </form>

        <div className="networks_container"></div>
      </div>

      <div className="image_container rounded3xl overflowhidden">
        <Box sx={{ width: 640, overflowY: "hidden" }}>
          <TransitionGroup
            component={ImageList}
            variant="masonry"
            cols={4}
            gap={16}
          >
            {movies
              .slice(currentIndex, currentIndex + 12)
              .map((item, index) => (
                <CSSTransition
                  key={item.poster_path}
                  timeout={1000}
                  classNames="fade"
                >
                  <ImageListItem>
                    <img
                      src={`${imageBaseUrl}${item.poster_path}`}
                      alt={item.title}
                      loading="lazy"
                      style={{
                        // borderRadius: '15px',
                        width: "100%",
                        height: `${160 + index * 20}px`,
                        objectFit: "cover",
                      }}
                    />
                  </ImageListItem>
                </CSSTransition>
              ))}
          </TransitionGroup>
        </Box>
      </div>
      <div>
        {success && (
          <Snackbar
            open={openSuccess}
            autoHideDuration={6000}
            onClose={handleCloseSuccess}
          >
            <Alert
              onClose={handleCloseSuccess}
              severity="success"
              variant="filled"
              sx={{ width: "100%" }}
            >
              {success}
            </Alert>
          </Snackbar>
        )}

        {error && (
          <Snackbar
            open={openError}
            autoHideDuration={6000}
            onClose={handleCloseError}
          >
            <Alert
              onClose={handleCloseError}
              severity="error"
              variant="filled"
              sx={{ width: "100%" }}
            >
              {error}
            </Alert>
          </Snackbar>
        )}
      </div>
    </div>
  );
}

export default LognIn;
