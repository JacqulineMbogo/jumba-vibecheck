// server.js
const mongoose = require('mongoose');

const app = require('./app');

mongoose
  .connect(`${process.env.DB_CONNECTION_STRING}`)
  .then(() => {
    app.listen(5001, () => console.log('Server running on port 5001'));
  })
  .catch((err) => {
    console.error('DB connection failed', err);
  });

// Import cron jobs
require('./cron/emailShareJob');
