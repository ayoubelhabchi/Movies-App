const express = require("express");

const app = express();
const connectMongoDb = require("./Config/DataBase_Connection");
const authRoutes = require("./Routes/AuthRoutes");
const userRoutes = require("./Routes/UserRoutes");
const moviesRoutes = require('./Routes/MoviesRoutes')
const seriesRoutes = require('./Routes/SeriesRoutes')

const axios = require("axios");
const cors = require("cors");

require("dotenv").config();
app.use(express.json());
app.use(cors());
Port = process.env.Port;

connectMongoDb();

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/movies", moviesRoutes);
app.use("/series", seriesRoutes);

app.listen(Port, () => console.log(`Server is running on ${Port}`));
module.exports = app;
