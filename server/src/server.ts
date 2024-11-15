const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

import app from './app';

const DB = process.env.DATABASE_URL as string;

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.error(err);
  process.exit(1);
});

mongoose.connect(DB).then(() => console.log('DB Connection Successful!'));
const port: number = parseInt(process.env.PORT as string, 10) || 3000;

if (process.env.NODE_ENV === 'development') {
  const server = app.listen(port, () => {
    console.log(`Application is running on localhost:${port}`);
  });

  process.on('unhandledRejection', (err: Error) => {
    console.log('Unhandled Rejection, Shutting Down');
    console.log(err);
    server.close(() => {
      process.exit(1);
    });
  });
}

module.exports = app;
