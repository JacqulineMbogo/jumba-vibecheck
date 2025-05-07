const express = require('express');
const bodyParser = require('body-parser');

const journalsRoutes = require('./routes/journal-routes');
const usersRoutes = require('./routes/user-routes');
const HttpError = require('./models/http-error');

const app = express();
app.use(express.json());

//apply cors middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

app.use('/api/journals', journalsRoutes);
app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  next(error);
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  const status = typeof error.code === 'number' ? error.code : 500;
  res
    .status(status)
    .json({ message: error.message || 'An unknown error occurred!' });
});

module.exports = app;
