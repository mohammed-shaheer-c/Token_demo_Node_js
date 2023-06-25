// Importing the required libraries and modules
require('dotenv').config();  // Importing the dotenv library
const constants = require("./constant"); // Importing the constant module
const fetch = require('./helper/commonFetching'); // Importing the commonFetching module

// Exporting the function for creating a customized bearer token
exports.createCustomizeBarToken = (username, password) => {
  // Check the length of the username and password
  var uLength = username.length;
  var pLength = password.length;

  // Check if the username length is odd and add 'x' to make it even
  if (uLength % 2 == 1) {
    username += 'x';
    uLength++;
  }

  // Check if the password length is odd and add 'y' to make it even
  if (pLength % 2 == 1) {
    password += 'y';
    pLength++;
  }

  // Function to remove spaces from a string
  function removeSpaces(str) {
    return str.replace(/\s/g, "");
  }

  // Extract the first half of the username
  const usernamePart1 = username.substring(0, uLength / 2);
  const asciiValuesPart1 = [];
  const usernameTokenSidePart1 = [];

  // Iterate over the characters in the first half of the username
  for (let i = 0; i < usernamePart1.length; i++) {
    const charCode = usernamePart1.charCodeAt(i);
    const firstDigit = parseInt(charCode.toString()[0]);
    asciiValuesPart1.push(firstDigit);
    usernameTokenSidePart1.push(usernamePart1[i] + firstDigit);
  }

  // Extract the second half of the username
  const usernamePart2 = username.substring(uLength / 2);
  const asciiValuesPart2 = [];
  const usernameTokenSidePart2 = [];

  // Iterate over the characters in the second half of the username
  for (let i = 0; i < usernamePart2.length; i++) {
    const charCode = usernamePart2.charCodeAt(i);
    const lastDigit = parseInt(charCode.toString().slice(-1));
    asciiValuesPart2.push(lastDigit);
    usernameTokenSidePart2.push(usernamePart2[i] + lastDigit);
  }

  // Extract the first half of the password
  const passwordPart1 = password.substring(0, pLength / 2);
  const asciiValuesPart3 = [];
  const passwordTokenSidePart1 = [];

  // Iterate over the characters in the first half of the password
  for (let i = 0; i < passwordPart1.length; i++) {
    const charCode = passwordPart1.charCodeAt(i);
    const lastDigit = parseInt(charCode.toString().slice(-1));
    // Exclude symbols from passwordTokenSidePart1
    if (/[a-zA-Z0-9]/.test(passwordPart1[i])) {
      passwordTokenSidePart1.push(passwordPart1[i] + lastDigit);
    }
  }

  // Extract the second half of the password
  const passwordPart2 = password.substring(pLength / 2);
  const asciiValuesPart4 = [];
  const passwordTokenSidePart2 = [];

  // Iterate over the characters in the second half of the password
  for (let i = 0; i < passwordPart2.length; i++) {
    const charCode = passwordPart2.charCodeAt(i);
    const firstDigit = parseInt(charCode.toString()[0]);
    // Exclude symbols from passwordTokenSidePart2
    if (/[a-zA-Z0-9]/.test(passwordPart2[i])) {
      passwordTokenSidePart2.push(passwordPart2[i] + firstDigit);
    }
  }

  // Generate the customized token
  const customizeToken = `G${Math.floor(1000 + Math.random() * 9000)}L${removeSpaces(constants.token.purpose.bearertoken)}P${removeSpaces(usernameTokenSidePart2.join(''))}V${removeSpaces(passwordTokenSidePart2.join(''))}M${removeSpaces(usernameTokenSidePart1.join(''))}Y${removeSpaces(passwordTokenSidePart1.join(''))}`;

  // Output the customized bearer token and its length
  console.log("Customize Bearer Token: ", customizeToken);
  console.log("Customize Token Length: ", customizeToken.length);

  // Check if the customized token length exceeds the maximum length defined in the constants
  if (customizeToken.length > constants.token.length) {
    let value = customizeToken.length - constants.token.length;
    var newToken = customizeToken.slice(0, -value);
  } else {
    let value = constants.token.length - customizeToken.length;
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var randomChars = "";
    for (var i = 0; i < value; i++) {
      var randomIndex = Math.floor(Math.random() * characters.length);
      randomChars += characters.charAt(randomIndex);
    }
    var newToken = customizeToken + randomChars;
    //console.log("new token :",newToken.length);
  }

  // Output the new token and its length
  console.log("New Token:              ", newToken);
  console.log("New Token Length: ", newToken.length);

  return newToken;
};






























































exports.createCustomizePasswordToken = async (password) => 
{
    var pLength = password.length;
    if (pLength % 2 == 1) 
    {
        password += 'y';
        pLength++;
    }

    function removeSpaces(str) {
        return str.replace(/\s/g, "");
    }


    const passwordPart1 = password.substring(0, pLength / 2);
    const asciiValuesPart3 = [];
    const passwordTokenSidePart1 = [];
    for (let i = 0; i < passwordPart1.length; i++) 
    {
        const charCode = passwordPart1.charCodeAt(i);
        const lastDigit = parseInt(charCode.toString().slice(-1));    
        // Exclude symbols from passwordTokenSidePart1
        if (/[a-zA-Z0-9]/.test(passwordPart1[i]))
        {
            passwordTokenSidePart1.push(passwordPart1[i] + lastDigit);
        }
    }

    const passwordPart2 = password.substring(pLength / 2);
    const asciiValuesPart4 = [];
    const passwordTokenSidePart2 = [];    
    for (let i = 0; i < passwordPart2.length; i++) 
    {
        const charCode = passwordPart2.charCodeAt(i);
        const firstDigit = parseInt(charCode.toString()[0]);
        // Exclude symbols from passwordTokenSidePart2
        if (/[a-zA-Z0-9]/.test(passwordPart2[i]))  
        {
            passwordTokenSidePart2.push(passwordPart2[i] + firstDigit); 
        }
    }

    const customizepasswordToken = `${removeSpaces(passwordTokenSidePart2.join(''))}A${removeSpaces(passwordTokenSidePart2.join(''))}S4D${removeSpaces(passwordTokenSidePart1.join(''))}F${removeSpaces(passwordTokenSidePart2.join(''))}G${removeSpaces(passwordTokenSidePart1.join(''))}`;
    return customizepasswordToken;
};




































































































































































































































































































































































// exports.debugCustomizeBarToken = (token, username, password) => 
// {
//     // console.log(username);
//     // console.log(password);
//     var uLength = username.length;
//     var pLength = password.length;
//     if (uLength % 2 == 1) 
//     {
//         username += 'x';
//         uLength++;
//     }

//     if (pLength % 2 == 1) 
//     {
//         password += 'y';
//         pLength++;
//     }

//     // console.log("Username Length:", uLength);
//     // console.log("Password Length:", pLength);

//     const usernamePart1 = username.substring(0, uLength / 2);
//     const asciiValuesPart1 = [];
//     const usernameTokenSidePart1 = [];
//     for (let i = 0; i < usernamePart1.length; i++) 
//     {
//         const charCode = usernamePart1.charCodeAt(i);
//         const firstDigit = parseInt(charCode.toString()[0]);
//         asciiValuesPart1.push(firstDigit);
//         usernameTokenSidePart1.push(usernamePart1[i] + firstDigit);
//     }

//     // console.log("Username Part 1:", usernamePart1);
//     // console.log("First Digits of ASCII Values (Part 1):", asciiValuesPart1);
//     // console.log("Username Token Side (Part 1):", usernameTokenSidePart1.join(''));
    
//     const usernamePart2 = username.substring(uLength / 2);
//     const asciiValuesPart2 = [];
//     const usernameTokenSidePart2 = [];
    
//     for (let i = 0; i < usernamePart2.length; i++)
//     {
//         const charCode = usernamePart2.charCodeAt(i);
//         const lastDigit = parseInt(charCode.toString().slice(-1));
//         asciiValuesPart2.push(lastDigit);
//         usernameTokenSidePart2.push(usernamePart2[i] + lastDigit);
//     }  

//     // console.log("Username Part 2:", usernamePart2);
//     // console.log("Last Digits of ASCII Values (Part 2):", asciiValuesPart2);
//     // console.log("Username Token Side (Part 2):", usernameTokenSidePart2.join(''));

//     const passwordPart1 = password.substring(0, pLength / 2);  
//     const asciiValuesPart3 = [];
//     const passwordTokenSidePart1 = [];
//     for (let i = 0; i < passwordPart1.length; i++) 
//     {
//         const charCode = passwordPart1.charCodeAt(i);
//         const lastDigit = parseInt(charCode.toString().slice(-1));
    
//         // Exclude symbols from passwordTokenSidePart1
//         if (/[a-zA-Z0-9]/.test(passwordPart1[i]))
//         {
//             passwordTokenSidePart1.push(passwordPart1[i] + lastDigit);
//         }
//     }

//     // console.log("Password Part 1:", passwordPart1);
//     // console.log("Last Digits of ASCII Values (Part 3):", asciiValuesPart3);
//     // console.log("Password Token Side (Part 1):", passwordTokenSidePart1.join(''));
    
//     const passwordPart2 = password.substring(pLength / 2);
//     const asciiValuesPart4 = [];
//     const passwordTokenSidePart2 = [];
    
//     for (let i = 0; i < passwordPart2.length; i++) 
//     {
//         const charCode = passwordPart2.charCodeAt(i);
//         const firstDigit = parseInt(charCode.toString()[0]); 
    
//         // Exclude symbols from passwordTokenSidePart2
//         if (/[a-zA-Z0-9]/.test(passwordPart2[i]))
//         {
//             passwordTokenSidePart2.push(passwordPart2[i] + firstDigit);
//         }
//     }

//     // console.log("Password Part 2:", passwordPart2);
//     // console.log("First Digits of ASCII Values (Part 4):", asciiValuesPart4);
//     // console.log("Password Token Side (Part 2):", passwordTokenSidePart2.join(''));
//     const customizeToken = `${passwordTokenSidePart2.join('')}A${usernameTokenSidePart2.join('')}S${usernameTokenSidePart1.join('')}D${passwordTokenSidePart1.join('')}`;
//     // const cutomizeToken = `${passwordTokenSidePart2}A${usernameTokenSidePart2}S${usernameTokenSidePart2}D${passwordTokenSidePart1}`;
//     // console.log("cutomizeToken:-", customizeToken);
//     // return customizeToken;

//     console.log(customizeToken.length);
    
//     const inputString = token;
//     const parts = inputString.split(/[ASD]/);
//     // console.log(parts);
    
    // if(parts[0] === passwordTokenSidePart2.join('') && parts[1] === usernameTokenSidePart2.join('') && parts[2] === usernameTokenSidePart1.join('') && parts[3] === passwordTokenSidePart1.join(''))
    // {
    //     console.log("Token is Successfully checked and it is correct");
    // }
    // else
    // {
    //     console.log("Token is Successfully checked and it is not correct");
    // }

// };

  
