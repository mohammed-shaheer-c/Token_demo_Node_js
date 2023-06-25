const btcontroller = require('../controllers/barrierToken.controller');
const verifyBody = require('../middlwares/requestValidator');
const verifyToken = require('../middlwares/tokenValidator');

module.exports = function(app) {
  // The below route is to generate a barrier token
  app.post('/horsecity/api/generatetoken', verifyBody.usernameAvailable, verifyBody.passwordAvailable, btcontroller.AddNewBToken);

  // The below route is to register an admin user with a generated token
  app.post('/horsecity/api/register/admin/token', verifyBody.usernameAvailable, verifyBody.passwordAvailable, verifyToken.checkBarrierToken, btcontroller.AddNewBTokenUser);

  // The below route is to register an admin user without generating a token
  app.post('/horsecity/api/register/admin', verifyBody.usernameAvailable, verifyBody.passwordAvailable, btcontroller.AddNewUserTokenNotGenerated);

  // The below route is for verifying a barrier token
  app.post('/horsecity/api/verify', verifyBody.usernameAvailable, verifyBody.passwordAvailable, verifyToken.checkBarrierToken, btcontroller.CheckBToken);

  // The below route is for changing a password
  app.post('/horsecity/api/forgotpassword', verifyBody.usernameAvailableForNewPassword, verifyBody.newPasswordAvailable, btcontroller.updatingNewPassword);
}
