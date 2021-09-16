const express = require('express');
require('dotenv').config();

const app = express();

/*** ROUTERS ***/
const bartRouter = require('./routes/bart.router');

const PORT = process.env.PORT || 5000;

app.use(express.static('build'));

app.use(express.json());

/**
 * now listing the server on port number 3000 :)
 * */
app.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
});
