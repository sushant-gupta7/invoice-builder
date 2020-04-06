const express = require('express') ;
const userController = require('../../users/controller/users.controller');
const passport = require('passport');
const router = express.Router();

// Invoices

router.post('/signup' , userController.signup);
router.post('/login' , userController.login);
router.post('/forgot-password' , userController.forgotPassword);
router.post('/reset-password' , passport.authenticate('jwt' , {session:false}) ,userController.resetPassword);
router.post('/test' , passport.authenticate('jwt' , {session:false}) ,userController.testaction);
module.exports = router;