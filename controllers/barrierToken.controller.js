const barrierToken = require("../models/barrierToken.model");

/** 
 *  The Below Function will be used for creating the token.
 *  We need a username and password for creating the token.
 */
exports.AddNewBToken = async (req, res, next) =>

{

    let nbt = await barrierToken.addnewbtoken(req.body.username, req.body.password);

    let token = nbt[0].token;

    console.log(nbt);

    if (nbt == "notusername")

    {

        return res.status(401).send

        ({

            success: false,

            code: 401,

            message: "Username incorrect, Token generation failed",

        });

    } else if (nbt == "nottoken") {

        return res.status(500).send({

            success: false,

            code: 500,

            message: "Internal server error, While generating the token",

        });

    } else if (nbt == "notpassword") {

        return res.status(401).send({

            success: false,

            code: 401,

            message: "Password incorrect, Token generation failed",

        });

    } else if (nbt == "notupdated") {

        return res.status(400).send({

            success: false,

            code: 401,

            message: "Error While updating the token",

        });

    } else if(nbt == 'tokenAllredyAvailable'){

        return res.status(409).send({

            code: 409,

            success: false,

            message: "Token allredy available, Token generation failed",

        });

    }

    else {

        return res.status(200).send({

            code: 200,

            success: true,

            message: "Barrier Token Generated Successfully",

            token: nbt[0].token

        });

    }

};

/**
 * The Below Function is used to check the validity of the token.
 * We need a username and password to verify the token.
 */
exports.CheckBToken = async (req, res, next) => 
{
    let nbt = await barrierToken.checkbtoken(req.body.username, req.body.password);
    // console.log("nbt: ", nbt);
    if (nbt == "notusername")
    {
        return res.status(401).send
        ({
            success: false,
            code: 401,
            message: "Username incorrect, Token generation failed",
        });
    }
    else if (nbt == "notpassword")
    {
        return res.status(400).send
        ({
            success: false,
            code: 401,
            message: "Password incorrect, Token generation failed",
        });
    }
    else
    {
        return res.status(200).send
        ({
            code: 200,
            success: true,
            message: "Barrier Token Verified Successfully",
        });
    }

};

/**
 * The Below Function is used for adding a new user and generating a token for the user.
 * We need a username and password to add the new user.
 */
exports.AddNewBTokenUser = async (req, res, next) => 
{
    let newuserbtoken = await barrierToken.addnewbtokenuser(req.body.username, req.body.password);
    if (newuserbtoken === "useravailable") 
    {
        return res.status(401).send
        ({
            success: false,
            code: 401,
            message: "Username is already available. Please enter a different username.",
        });
    } 
    else if (newuserbtoken === "notinserted")
    {
        return res.status(401).send
        ({
            success: false,
            code: 401,
            message: "Error while inserting into the database",
        });
    }
    else
    {
        return res.status(200).send
        ({
            success: true,
            code: 200,
            message: "Token generated and stored successfully in the database",
            token: newuserbtoken[0].token
        });
    }
};


exports.AddNewUserTokenNotGenerated = async (req, res, next) => 
{
    let newuserbtoken = await barrierToken.addnewusertokennotenerated(req.body.username, req.body.password);
    if (newuserbtoken === "useravailable") 
    {
        return res.status(401).send
        ({
            success: false,
            code: 401,
            message: "Username is already available. Please enter a different username.",
        });
    } 
    else if (newuserbtoken === "notinserted")
    {
        return res.status(401).send
        ({
            success: false,
            code: 401,
            message: "Internal server error while inserting into the database",
        });
    } 
    else
    {
        return res.status(200).send
        ({
            success: true, 
            code: 200,
            message: "username and password is inserted into the database. Token is not generated for this username"
        });
    }

};

exports.updatingNewPassword = async(req,res) =>{

   

    let updatenewpassword = await barrierToken.updatingNewPassword(req.body.username, req.body.password);

    console.log(updatenewpassword);

    if(updatenewpassword == 'passwordUpdated'){

        return res.status(200).send

        ({

            success: true,

            code: 200,

            message: "New password updated successfully",

        });

    }else if(updatenewpassword == 'passwordUpdationFaild'){

        return res.status(401).send

        ({

            success: false,

            code: 401,

            message: "Internal server error while Updating into the database",

        });

    }else if(updatenewpassword == 'usernotavailable'){

        return res.status(401).send

        ({

            success: false,

            code: 401,

            message: "Username incorrect, While updating new password",

        });

    }

}  