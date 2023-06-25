require('dotenv').config();

const tokenGeneration = require('../utils/token');
const fetch = require('../utils/helper/commonFetching');
const date = require('../utils/helper/date');
const constants = require('../utils/constant');

/**
 * Middleware to check the validity of the barrier token.
 */

exports.checkBarrierToken = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  console.log("Submitted Token: ", authorizationHeader);

  if (!authorizationHeader) {
    return res.status(401).send({
      success: false,
      code: 401,
      message: "Barrier Token is not provided! Please check once again.",
    });
  }

  const str = authorizationHeader.replace(/\s/g, "");
  if (authorizationHeader.length - str.length > 1) {
    return res.status(401).send({
      success: false,
      code: 401,
      message: "Barrier Token contains spaces, which is not allowed.",
    });
  }

  let index = str.indexOf("G");
  const beforeG = str.substring(0, index);
  if (beforeG.length !== 0) {
    if (beforeG.startsWith("Bearer")) {
      // Perform the desired action if the condition is true
    } else {
      console.log(
        `This is not a bearer token. It is a ${beforeG} token as per your input.`
      );
      return res.status(401).send({
        success: false,
        code: 401,
        message: "This is not a bearer token.",
      });
    }
  } else {
    console.log(
      "'G' not found in the string. It is a bearer token because it does not meet your conditions."
    );
    return res.status(401).send({
      success: false,
      code: 401,
      message: "This is not a bearer token. It does not meet our token specification.",
    });
  }

  const token = str.substring(str.indexOf("G"));

  if (token.length < constants.token.length) {
    return res.status(401).send({
      success: false,
      code: 401,
      message: "Barrier Token is not correct! Token length is less than 45. It must be exactly 45 characters. Please check once again.",
    });
  }

  if (token.length > constants.token.length) {
    return res.status(401).send({
      success: false,
      code: 401,
      message: "Barrier Token is not correct! Token length is more than 45. It must be exactly 45 characters. Please check once again.",
    });
  }

  const regex = new RegExp(`(?<=[A-Z])(${constants.token.purpose.bearertoken})(?=[A-Z])`, 'g');
  const matches = token.match(regex);
  if (matches === null) {
    return res.status(401).send({
      success: false,
      code: 401,
      message: "The token provided is not associated with a barrier token.",
    });
  }

  const checkTokenValuePresent = await fetch.getUserDetailFromBTableOnToken(token);

  if (checkTokenValuePresent !== 0) {
    let createdDate = new Date(checkTokenValuePresent[0].created_at).getTime();
    const expiryDate = new Date(checkTokenValuePresent[0].token_expiry_date).getTime();

    if (checkTokenValuePresent[0].updated_at !== null) {
      console.log("haii");
      createdDate = checkTokenValuePresent[0].updated_at;
    }

    if (createdDate > expiryDate) {
      let username = checkTokenValuePresent[0].username;
      const changeTokenStatus = await fetch.changeTokenStatusInactive(username);
      console.log("change", changeTokenStatus);
      if (changeTokenStatus) {
        // checks if token is more than a certain time old
       // if token is expired, a new token is sent to email-Id
        return res.status(401).send({
          success: false,
          code: 401,
          message: "Token has expired!",
        });
      }
    } else {
      console.log("hello");
      next();
    }
  } else {
    console.log("Invalid Token");
    return res.status(401).send({
      success: false,
      code: 401,
      message: "The token provided is not associated with any user in the database.",
    });
  }
};

function hasOnlyNonSpaces(str) {
  if (str.includes(" ")) {
    return true;
  } else {
    return false;
  }
}
