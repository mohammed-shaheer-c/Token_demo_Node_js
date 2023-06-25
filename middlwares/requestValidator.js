/**
 * Middleware to check if the username is available.
 */
exports.usernameAvailable = (req, res, next) => {
    if (!req.body.username) {
      return res.status(403).send({
        code: 403,
        success: false,
        message: "Username is required. Token generation failed.",
      });
    } else {
      if (hasOnlyNonSpaces(req.body.username)) {
        return res.status(403).send({
          code: 401,
          success: false,
          message: "Username contains space. It is not allowed.",
        });
      } else {
        next();
      }
    }
  };
  
  /**
   * Middleware to check if the password is available.
   */
  exports.passwordAvailable = (req, res, next) => {
    if (!req.body.password) {
      return res.status(403).send({
        code: 403,
        success: false,
        message: "Password is required. Token generation failed.",
      });
    } else {
      if (hasOnlyNonSpaces(req.body.password)) {
        return res.status(403).send({
          code: 401,
          success: false,
          message: "Password contains space. It is not allowed.",
        });
      } else {
        next();
      }
    }
  };
  
  /**
   * Middleware to check if the new password is available.
   */
  exports.newPasswordAvailable = (req, res, next) => {
    if (!req.body.password) {
      return res.status(403).send({
        code: 403,
        success: false,
        message: "Password is required for updating the new password.",
      });
    } else {
      if (hasOnlyNonSpaces(req.body.password)) {
        return res.status(403).send({
          code: 401,
          success: false,
          message: "Password contains space. It is not allowed.",
        });
      } else {
        next();
      }
    }
  };
  
  /**
   * Middleware to check if the username is available for updating the password.
   */
  exports.usernameAvailableForNewPassword = (req, res, next) => {
    if (!req.body.username) {
      return res.status(403).send({
        code: 403,
        success: false,
        message: "Username is required for updating the password.",
      });
    } else {
      next();
    }
  };
  
  function hasOnlyNonSpaces(str) {
    if (str.includes(" ")) {
      return true;
    } else {
      return false;
    }
  }
  