const express = require('express');
const mysql = require('mysql');
const routes = require('./routes');
const cors = require('cors'); // Import the cors package
require('dotenv').config();
const { Pool } = require('pg'); // Use the pg library for PostgreSQL



const app = express();

//Fauna key:  fnAFKD_UJiAAUeeHSxWimZ_zneJ8sBiNe7qZ3rV_

// PlanetScale info
// username: ixm064s012t67fchtjvt
//password: pscale_pw_ORdV8uVzLeIsMhE7Cb15hg3Q3OUtj2PL2cOXCezMzh6

/*
database: report_data
username: jf1agrf113mq0cknbtul
host: aws.connect.psdb.cloud
password: pscale_pw_wyR6osiLjc1NghELMZb7DjFEBj2ZfdJKZk0gUca8I3K

*/

/* Cockroach DB:
SQL user: ulrich
 password: -7Frwl4bnLV7MYO4iQXSWg
 
connection String: postgresql://ulrich:-7Frwl4bnLV7MYO4iQXSWg@song-hermit-9381.8nj.cockroachlabs.cloud:26257/report_data?sslmode=verify-full

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


// New comment for planet scale

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

// console.log("Server listaning to YugaByte DB")

//YUGABYTE CONNECTION

const dbUrl = process.env.DATABASE_URL;

// Middleware to parse JSON data
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Create a PostgreSQL pool using the DATABASE_URL from the environment variables
const pool = new Pool({
  connectionString: dbUrl,
});

// Share the pool variable using app.locals
app.locals.pool = pool;

// Use the routes middleware
app.use('/api', routes); // You can prefix all your API endpoints with '/api', e.g., '/api/reports'

const port = 3000;
app.listen(port, () => {
  console.log(`Server started and listening on port ${port}`);
});

console.log("Server listening to Yugabyte DB");
