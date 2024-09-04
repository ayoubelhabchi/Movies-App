import React, { useState } from "react";
import "./SignUp.css";
import { signUp } from "../../Apis/ApiServer";

import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1549388604-817d15aa0110",
    title: "Bed",
  },
  {
    img: "https://images.unsplash.com/photo-1525097487452-6278ff080c31",
    title: "Books",
  },
  {
    img: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6",
    title: "Sink",
  },
  {
    img: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3",
    title: "Kitchen",
  },
  {
    img: "https://images.unsplash.com/photo-1588436706487-9d55d73a39e3",
    title: "Blinds",
  },
  {
    img: "https://images.unsplash.com/photo-1574180045827-681f8a1a9622",
    title: "Chairs",
  },
  {
    img: "https://images.unsplash.com/photo-1530731141654-5993c3016c77",
    title: "Laptop",
  },
  {
    img: "https://images.unsplash.com/photo-1481277542470-605612bd2d61",
    title: "Doors",
  },
  {
    img: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee",
    title: "Storage",
  },
  {
    img: "https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62",
    title: "Candle",
  },
  {
    img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
    title: "Coffee table",
  },
];

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

      <div className="image_container overflow-hidden">
        <Box sx={{ width: 650, height: 560 ,overflowY: "hidden" }}>
          <ImageList variant="masonry" cols={3} gap={16}>
            {itemData.slice(0, 12).map((item) => (
              <ImageListItem key={item.img}>
                <img
                  srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.img}?w=248&fit=crop&auto=format`}
                  alt={item.title}
                  loading="lazy"
                  style={{ width: '100%', height: 'auto' }} // Ensures images fit within their containers

                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </div>
    </div>
  );
}

export default SignUp;
