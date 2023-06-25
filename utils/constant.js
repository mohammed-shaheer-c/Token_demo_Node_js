// This module exports an object that defines constants related to status and tokens.

// Exporting the object
module.exports = {
    // Constants related to status
    status: {
      active: "ACTIVE",       // Status constant for active
      inactive: "INACTIVE",   // Status constant for inactive
    },
    
    // Constants related to tokens
    token: {
      length: 45,             // Length of the token
      expiry_after: 10,       // Expiry duration of the token
      purpose: {
        bearertoken: "3",     // Purpose of the token (in this case, bearer token with ID 3)
      },
    },
  };
  