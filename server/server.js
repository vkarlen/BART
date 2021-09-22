const express = require('express');
require('dotenv').config();

const app = express();

// Route imports
const bartRouter = require('./routes/bart.router');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*** ROUTES ***/
app.use('/api/bart', bartRouter);

app.use(express.static('build'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
});
