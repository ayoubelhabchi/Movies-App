import React, { useEffect, useState } from "react";
import "./SignUp.css";
import { signUp } from "../../Apis/ApiServer";
import { fetchTrending } from "../../Apis/ApiServices";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    country: "",
    city: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const getPosters = async () => {
      const movies = await fetchTrending();
      setMovies(movies);
    };
    getPosters();

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (movies.length - 6));
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  console.log("movies", movies);

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
      const response = await signUp(formData);
      setSuccess("Registration successful!");
    } catch (error) {
      setError("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="main_container">
      <div className="signup_container">
        <div className="signup_text">
          <h2>Create An Account</h2>
          <div className="singin_link">
            <h3>Already have an account ?</h3>
            <a className="text-[#ae021f] font-medium" href="/signup">Log in</a>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="name">
              {/* <label htmlFor="firstName">First Name</label> */}
              <input
                placeholder="First name"
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="name">
              {/* <label htmlFor="lastName">Last Name</label> */}
              <input
                placeholder="Last name"
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            {/* <label>Email</label> */}
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
            {/* <label>Password</label> */}
            <input
              placeholder="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            {/* <label>Country</label> */}
            <input
              placeholder="Country"
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            {/* <label>City</label> */}
            <input
              placeholder="City"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>

          <div className="button_container">
            <button type="submit">Sign Up</button>
          </div>
        </form>
      </div>

      <div className="image_container rounded3xl overflow-hidden">
        <Box sx={{ width: 640, overflowY: "hidden" }}>
          <TransitionGroup
            component={ImageList}
            variant="masonry"
            cols={3}
            gap={16}
          >
            {movies.slice(currentIndex, currentIndex + 7).map((item, index) => (
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
                      height: `${170 + index * 40}px`,
                      objectFit: "cover",
                    }}
                  />
                </ImageListItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </Box>
      </div>
    </div>
  );
}

export default SignUp;
