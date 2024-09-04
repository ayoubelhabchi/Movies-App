const express = require("express");

const app = express();
const connectMongoDb = require("./Config/DataBase_Connection");
const authRoutes = require("./Routes/AuthRoutes");
const userRoutes = require("./Routes/UserRoutes");

const axios = require("axios");
const cors = require("cors");

require("dotenv").config();
app.use(express.json());
app.use(cors());
Port = process.env.Port;

connectMongoDb();

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.listen(Port, () => console.log(`Server is running on ${Port}`));
module.exports = app;
