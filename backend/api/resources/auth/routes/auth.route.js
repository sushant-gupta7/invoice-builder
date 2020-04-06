const express = require('express') ;
const authController = require('../../auth/controller/auth.controller');
const passport = require('passport');
const router = express.Router();

// Invoices

router.get('/google' , passport.authenticate('google' , {scope:['profile','email']}));
router.get('/google/callback' , passport.authenticate('google' , {
    failureRedirect:'/failure'
}) , authController.sendJWTToken);

router.get('/github',
  passport.authenticate('github'));
 
  router.get('/github/callback',  
  passport.authenticate('github', { failureRedirect: '/failure' }) , authController.sendJWTToken);

  router.get('/authenticate' , passport.authenticate('jwt' , {session:false}) , authController.authenticate)
  router.get('/logout' , passport.authenticate('jwt' , {session:false}) , authController.logout)

module.exports = router;