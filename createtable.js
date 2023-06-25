// Importing the required modules and files
const con = require('./configs/db.config'); // Importing the database details
const constants = require('./utils/constant'); // Importing the constants file
const insertData = require('./init');
const date = require('./utils/helper/date');

// Exporting the initialization function
module.exports = async function() {
  try {
    // Connect to the database 
    con.connect(function(err) {
      // Define the create table query for the barrierTokens table
      let createTableQuery = `CREATE TABLE barriertokens 
                              (
                                id INT PRIMARY KEY AUTO_INCREMENT,
                                username VARCHAR(50) NOT NULL,
                                password VARCHAR(550) NOT NULL,
                                token VARCHAR(550),
                                status ENUM('${constants.status.active}', '${constants.status.inactive}') DEFAULT '${constants.status.active}',
                                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                                token_expiry_date DATETIME DEFAULT (DATE_ADD(NOW(), INTERVAL '${constants.token.expiry_after}' DAY)),
                                updated_at DATETIME DEFAULT NULL,
                                deleted_at DATETIME DEFAULT NULL
                              )`;

      // Execute the create table query
      con.query(createTableQuery, function(err, result) {
        if (result) {
          if (result.length != 0) {
            console.log('#### barrierTokens table successfully created ####');
            insertData();
            // Uncomment the following code if you want to enable the event scheduler and create an event
            /*
            let seteventOn = `SET GLOBAL event_scheduler = 'ON' `;
            con.query(seteventOn, (err, result2) => {
              if (result2.length != 0) {
                console.log('#### Event scheduler status have been set to ON. It is required. Otherwise our event will not work #### ');
                let eventCre1 = `CREATE EVENT checkticketexpire
                                  ON SCHEDULE EVERY 5 SECOND
                                  ON COMPLETION PRESERVE  
                                  DO 
                                  BEGIN
                                    UPDATE barriertokens
                                    SET status = '${constants.status.inactive}', deleted_at = '${date.convertDatePickerTimeToMySQLTime(date.DAYADD(constants.token.expiry_after))}'
                                    WHERE DATEDIFF( CURRENT_TIME() , token_expiry_date) > '0'
                                    AND status = '${constants.status.active}';
                                  END`;
                con.query(eventCre1, (err, result3) => {
                  if (result3.length != 0) {
                    console.log('#### Check token expire event is successfully created ####');
                  } else {
                    console.log(' #### Error While Creating token expire event ####');
                  }
                });
              } else {
                console.log(' #### Error while setting the event scheduler status to ON. #### ');
              }
            });
            */
          } else {
            console.log('Error While creating barrierTokens table');
          }
        } else {
          console.log('#### Table is already present #### ');
          insertData();
        }
      });
    });
  } catch (error) {
    console.error('#### Error while creating the table ####', error);
  }
};
