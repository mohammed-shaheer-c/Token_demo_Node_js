const express = require('express');
const app = express();
// PORT = 8000; // Comment: This line sets the port number to 8000. It is currently commented out.
require('dotenv').config(); // Comment: Loads environment variables from a .env file if present.
const db = require("./configs/db.config"); // Comment: Imports the configuration for the database.
const createTable = require('./createtable'); // Comment: Imports a module responsible for creating database tables.


createTable();
app.use(express.json()); // Comment: Adds middleware to parse incoming request bodies with JSON payloads.
// This allows access to request data sent in JSON format through the `req.body` property in route handlers.

app.use(express.urlencoded({ extended: true })); // Comment: Adds middleware to parse URL-encoded form data.
   
/**
 * Below code is used for s tarting our server
 */
  
require('./routes/barrierToken.route')(app); // Comment: Imports the route handlers for barrier tokens and associates them with the Express application.


module.exports = app; // making the app variable for export