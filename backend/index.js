const express = require("express");
const app = express();
const connectMongoDb = require('./Config/DataBase_Connection')
const authRoute = require('./Routes/User')

require("dotenv").config();
app.use(express.json());
Port = process.env.Port;

connectMongoDb()

app.use('/auth',authRoute)

app.listen(Port, () => console.log(`Server is running on ${Port}`));
module.exports = app;
