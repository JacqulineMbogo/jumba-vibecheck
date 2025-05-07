// server.js
const mongoose = require('mongoose');

const app = require('./app');

mongoose
  .connect(
    'mongodb+srv://admin:admin@sandbox.0n9cihx.mongodb.net/?retryWrites=true&w=majority&appName=Sandbox'
  )
  .then(() => {
    app.listen(5001, () => console.log('Server running on port 5001'));
  })
  .catch((err) => {
    console.error('DB connection failed', err);
  });

// Import cron jobs
require('./cron/emailShareJob');
