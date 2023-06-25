/**
 * This file establishes a connection with a MySQL database using the mysql2 library.
 */

const mysql = require('mysql2');

// Establishing the database connection
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "demo"
});

// Connecting to the database
con.connect(function(err) {
    if (err) {
        console.error("Error while connecting to the database:", err.message);
    } else {
        console.log("DB Connected!");
    }
});

// Exporting the connection object for use in other parts of the program
module.exports = con;
