const express = require("express");
const app = express();

require("./db/conn");

app.use(express.json());

const authRoute = require('./router/authroute');
app.use('/api',authRoute);

module.exports = app;