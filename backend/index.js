const express = require('express');
const app = express()

require('dotenv').config()

Port = process.env.Port

app.listen(Port,()=>
    console.log(`Server is running on ${Port}`))
    module.exports = app;