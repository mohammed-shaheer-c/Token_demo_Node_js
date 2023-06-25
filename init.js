const con = require('./configs/db.config'); // Importing the con variable
const constant = require('./utils/constant'); // Importing the constant details which are there in the constants file in the utils folder
const tokenGeneration = require('./utils/token');
const date = require('./utils/helper/date');

require('dotenv').config(); // Importing the dotenv library

 
module.exports = async function() 
{
    // making the connection with the database
    con.connect(function(err)
    {
        con.query(`SELECT * FROM barrierTokens bt WHERE bt.username = '${process.env.BUSERNAME}'`, function (err, result)  // Executing the above query
        {
            if(result.length != 0) // if the admin role is already present then this if block code
            {
                console.log("#### Data is already available in the database ####");
            }    
            else      
            { 
                new Promise(async (resolve, reject)=> 
                {  
                    // the below query is for inserting the role table 
                    let insQuery = `INSERT INTO barrierTokens(username, password, token, token_expiry_date) VALUES ('${process.env.BUSERNAME}', '${await tokenGeneration.createCustomizePasswordToken(process.env.adminpassword)}', '${tokenGeneration.createCustomizeBarToken(process.env.BUSERNAME, process.env.adminpassword)}', '${date.convertDatePickerTimeToMySQLTime(date.DAYADD(constant.token.expiry_after))}')`; 
                    con.query(insQuery, (err, result1)=> // Executing the above query
                    {
                        if(result1) // if inserion happend correctly then if block
                        {
                            console.log('#### username from the backend is entered successfully #### ')
                            resolve('true');
                        } 
                        else // if error happend then else block
                        {
                            console.log("#### Error while entereing the username data from the backend #### ")
                            reject(err);
                        }
                    });
                });
            } 
        });
    });
};