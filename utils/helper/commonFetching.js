const con = require("../../configs/db.config");  // importing the database details
const constant = require("../../utils/constant");
const constants = require('../../utils/constant'); // Importing the constants file. This file contains the constant details

module.exports = class fetching {
  // Fetch user details from barrierTokens table based on username
  static getUserDetailFromBTableOnUsername(username) {
    try {
      return new Promise((resolve, reject) => {
        let selQuery = `SELECT * FROM barrierTokens bt WHERE bt.username = '${username}'`;
        con.query(selQuery, (err, result) => {
          if (result.length != 0) {
            resolve(result);
          } else {
            resolve(result);
          }
        });
      });
    } catch (error) {
      console.log("Error while fetching the token detail based on the username. We are in the helper class common fetching function try-catch block.", error);
    }
  }

  // Fetch user details from barrierTokens table based on token
  static getUserDetailFromBTableOnToken(token) {
    try {
      return new Promise((resolve, reject) => {
        let selQuery = `SELECT * FROM barrierTokens bt WHERE bt.token = '${token}'`;
        con.query(selQuery, (err, result) => {
          if (result.length != 0) {
            resolve(result);
          } else {
            resolve(result);
          }
        });
      });
    } catch (error) {
      console.log("Error while fetching the token detail based on the username. We are in the helper class common fetching function try-catch block.", error);
    }
  }

  // Fetch user details from barrierTokens table based on password
  static getUserDetailFromBTableOnPassword(password) {
    try {
      return new Promise((resolve, reject) => {
        let selQuery = `SELECT * FROM barrierTokens bt WHERE bt.password = '${password}'`;
        con.query(selQuery, (err, result) => {
          if (result.length != 0) {
            resolve(result);
          } else {
            resolve(result);
          }
        });
      });
    } catch (error) {
      console.log("Error while fetching the token detail based on the username. We are in the helper class common fetching function try-catch block.", error);
    }
  }

  // Change token status to 'INACTIVE' based on username
  static changeTokenStatusInactive(username) {
    try {
      return new Promise(async (resolve, reject) => {
        let setInactiveQuery = `UPDATE barrierTokens bt SET bt.status = 'INACTIVE' WHERE bt.username = '${username}'`;
        con.query(setInactiveQuery, async (err, result) => {
          if (!err) {
            resolve(true);
          }
          resolve(false);
        });
      });
    } catch (error) {
      console.log("Error while changing the token status.", error);
    }
  }
}
