const express = require('express');
const mysql = require('mysql2');
const routes = require('./routes');
const cors = require('cors'); // Import the cors package

const app = express();

// Middleware to parse JSON data
app.use(express.json());

const dbConfig = {
  socketPath: '/var/run/mysqld/mysqld.sock',
  user: 'root',
  password: '',
  database: 'report_data'
};

const pool = mysql.createPool(dbConfig);


// Enable CORS for all routes
app.use(cors());

// Share the pool variable using app.locals
app.locals.pool = pool;

// Use the routes middleware
app.use('/api', routes); // You can prefix all your API endpoints with '/api', e.g., '/api/reports'

const port = 3000;
app.listen(port, () => {
  console.log(`Server started and listening on port ${port}`);
});
