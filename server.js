const EventEmitter = require('events');
EventEmitter.defaultMaxListeners = 30;

const express = require('express');
// const mysql = require('mysql');
const routes = require('./routes');
const cors = require('cors'); // Import the cors package
require('dotenv').config();
const mongoose = require('mongoose'); // Use the mongoose library for MongoDB
const app = express();
// const { Pool } = require('pg'); // Use the pg library for PostgreSQL
// ip: 154.72.167.117/32

/*
database: report_data
username: jf1agrf113mq0cknbtul
host: aws.connect.psdb.cloud
password: pscale_pw_wyR6osiLjc1NghELMZb7DjFEBj2ZfdJKZk0gUca8I3K
*/

/* const dbUrl = process.env.DATABASE_URL;

// // Middleware to parse JSON data
// app.use(express.json());

// const dbConfig = {
//   socketPath: '/var/run/mysqld/mysqld.sock',
//   user: 'root',
//   password: '',
//   database: 'report_data'
// };

/*
YugabyteDB
user: admin
password: ib5V-RKhmEnFYnAwDiLcNG-B_MUkqp

postgresql://admin:ib5V-RKhmEnFYnAwDiLcNG-B_MUkqp@us-east-1.bf7b8210-7938-42f2-a8b5-c172da5edc14.aws.ybdb.io:5433/ 
yugabyte?ssl=true&sslmode=verify-full&sslrootcert=/home/root004/Downloads

*/

/*
// const pool = mysql.createPool(dbConfig);


// // Enable CORS for all routes
// app.use(cors());

// // Share the pool variable using app.locals
// app.locals.pool = pool;

// // Use the routes middleware
// app.use('/api', routes); // You can prefix all your API endpoints with '/api', e.g., '/api/reports'

// const port = 3000;
// app.listen(port, () => {
//   console.log(`Server started and listening on port ${port}`);
// });
*/

/* New comment for planet scale

// const dbUrl = process.env.DATABASE_URL;

// // Middleware to parse JSON data
// app.use(express.json());

// // Enable CORS for all routes
// app.use(cors());

// // Create a MySQL pool using the DATABASE_URL from the environment variables
// const pool = mysql.createPool(dbUrl);

// // Share the pool variable using app.locals
// app.locals.pool = pool;

// // Use the routes middleware
// app.use('/api', routes); // You can prefix all your API endpoints with '/api', e.g., '/api/reports'

// const port = 3000;
// app.listen(port, () => {
//   console.log(`Server started and listening on port ${port}`);
// });
*/

const dbUrl = process.env.DATABASE_URL;

// Middleware to parse JSON data
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Connect to MongoDB Atlas using the DATABASE_URL from the environment variables
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check if the MongoDB connection was successful
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas!');
});

// Use the routes middleware
app.use('/api', routes); // You can prefix all your API endpoints with '/api', e.g., '/api/reports'


const port = 3000;
app.listen(port, () => {
  console.log(`Server started and listening on port ${port}`);
});
