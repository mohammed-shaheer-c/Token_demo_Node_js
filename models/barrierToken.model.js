const con = require('../configs/db.config'); // importing the database detail and assigning the con variable 
const tokenGeneration = require('../utils/token');
const fetch = require('../utils/helper/commonFetching');
const date = require('../utils/helper/date');
const constant = require('../utils/constant');

module.exports = class barrierToken
{
    constructor(){}
        
    static async addnewbtoken(username, password)
    {
        try
        {
            return await new Promise(async(resolve, reject) =>
            {
                let tokenValue = await fetch.getUserDetailFromBTableOnUsername(username);
                if(tokenValue.length != 0)
                {
                    const checkPassword = await tokenGeneration.createCustomizePasswordToken(password);
                    if(checkPassword === tokenValue[0].password)
                    {
                        let checkTokenNotexp = `SELECT * FROM barriertokens bt WHERE bt.username = '${username}' AND bt.status = 'INACTIVE'`
                        con.query(checkTokenNotexp, async (err, result1)=> // Executing the above query
                        {
                            if(result1.length !=0)
                            {
                                const newtoken = await tokenGeneration.createCustomizeBarToken(username, password)
                                if(newtoken == "false")
                                {
                                    resolve('nottoken');
                                }
                                else
                                {
                                    const currentDate = new Date();
                                    let condate = date.convertDatePickerTimeToMySQLTime(currentDate);
                                  
                                    let upQuery = `UPDATE barriertokens SET token = '${newtoken}', token_expiry_date = '${date.convertDatePickerTimeToMySQLTime(date.DAYADD(constant.token.expiry_after))}', status = 'ACTIVE' ,updated_at = '${condate}' WHERE username = '${username}'`;
                                    con.query(upQuery, async (err, result1)=> // Executing the above query
                                    {
                                        if(result1.length != 0) // if inserion happend correctly then if block
                                        { 
                                            let tokenValue = await fetch.getUserDetailFromBTableOnUsername(username);
                                            resolve(tokenValue); 
                                        }
                                        else // if error happend then else block
                                        {
                                            resolve('notupdated'); 
                                        }
                                    });
                                }
                            }
                            else
                            {
                                resolve('tokenAllredyAvailable');
                            }
                        });
                    }
                    else
                    {
                        resolve('notpassword');
                    }
                }
                else
                {
                    resolve('notusername');
                }
            });
        }
        catch(error)
        {
            console.log("Error while creating the barrier token", error);
        }
    };
        
    static async checkbtoken(username, password) 
    {  
        try 
        {
            return await new Promise(async (resolve, reject)=>
            {
                let tokenValue = await fetch.getUserDetailFromBTableOnUsername(username);
                if(tokenValue.length == 0)
                {
                    resolve('notusername');   
                }

                if(tokenValue.length != 0) 
                {
                    const checkPassword = await tokenGeneration.createCustomizePasswordToken(password);
                    {
                        
                        if(tokenValue[0].password === checkPassword)  
                        {
                            console.log("Password is correct");
                            resolve(true);
                        }
                        else
                        {
                            console.log("Password is not correct");
                            resolve('notpassword')
                        } 
                    }     
                }
                else
                {
                    resolve('notusername')
                }            
            });
        }
        catch(error)
        {
            console.log("Error while verifying the barrier token", error ) 
        }
    };

    static async addnewbtokenuser(username , password)
    {
        try
        { 
            return await new Promise(async (resolve, reject)=>
            {
                let checkUser = await fetch.getUserDetailFromBTableOnUsername(username);
                if(checkUser.length == 0)
                { 
    
                    let insQuery = `INSERT INTO barriertokens(username, password, token, token_expiry_date) VALUES('${username}', '${await tokenGeneration.createCustomizePasswordToken(password)}', '${tokenGeneration.createCustomizeBarToken(username, password)}', '${date.convertDatePickerTimeToMySQLTime(date.DAYADD(constant.token.expiry_after))}')`;
                    con.query(insQuery, async (err, result1) =>
                    {
                        if(result1.length != 0)
                        {
                            let checkUser = await fetch.getUserDetailFromBTableOnUsername(username);
                            resolve(checkUser);                                
                        }
                        else
                        {
                            resolve('notinserted');
                        }
                    });
                }
                else
                {
                    resolve("useravailable");
                }
            });
        }
        catch(error)
        {
            console.log("Error while registering new user", error) 
        }
    };

    static async addnewusertokennotenerated(username , password)
    {
        try
        {
            return await new Promise(async (resolve, reject)=>
            {
                let checkUser = await fetch.getUserDetailFromBTableOnUsername(username);
                if(checkUser.length == 0)
                {
                    const passwordToken = await tokenGeneration.createCustomizePasswordToken(password);
                    let insQuery = `INSERT INTO barriertokens(username, password) VALUES('${username}', '${passwordToken}')`;
                    con.query(insQuery, async (err, result1) =>
                    {
                        if(result1.length != 0)
                        {
                            let checkUser = await fetch.getUserDetailFromBTableOnUsername(username);
                            resolve(checkUser);                                
                        }
                        else
                        {
                            resolve('notinserted')
                        }
                    });
                }
                else
                {
                    resolve("useravailable");
                }
            });
        }
        catch(error)
        {
            console.log("Error while registering new user", error) 
        }
    }

    static async updatingNewPassword(username,password)

    {

        try

        {

            return await new Promise(async (resolve, reject)=>

            {

             

                let checkUser = await fetch.getUserDetailFromBTableOnUsername(username);

                console.log(checkUser);

                if(checkUser.length != 0)
                {

                    const passwordToken = await tokenGeneration.createCustomizePasswordToken(password);

                    let updtQuery = `UPDATE barriertokens b  SET b.password = '${passwordToken}'  WHERE b.username = '${username}'`

                    con.query(updtQuery, async (err, result1) =>

                    {

                        if(result1.length != 0)

                        {

                   

                            resolve("passwordUpdated");                                

                        }

                        else

                        {

                   

                            resolve('passwordUpdationFaild')

                        }

                    });




                }else{

    
                    resolve("usernotavailable");
                }
            })

        }

        catch(error)

        {

            console.log("Error while updating new password", error)

        }      

    }



};

