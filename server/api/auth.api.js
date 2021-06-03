var express = require("express");
var  router = express.Router();
const passport = require('passport');
const authController = require('../controllers/auth.controller');

router.post("/login", authController.loginWithEmail);
router.post(
  '/facebook-login',
  passport.authenticate('facebook-token', { session: false }),
  authController.loginWithFacebookGoogle
);

router.post(
  '/google-login',
  passport.authenticate('google-token', { session: false }),
  authController.loginWithFacebookGoogle
);

module.exports = router;


 