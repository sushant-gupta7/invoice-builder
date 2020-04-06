const express = require('express');
const invoiceController = require('../../invoice/controller/invoice.controller');
const passport = require('passport');
const router = express.Router();

// Invoices

router.get('/' , passport.authenticate('jwt' , {session:false})  , invoiceController.findAll);
router.get('/:id' , passport.authenticate('jwt' , {session:false})  , invoiceController.findId);
router.delete('/delete/:id' , passport.authenticate('jwt' , {session:false})  , invoiceController.deleteId);
router.put('/update/:id' , passport.authenticate('jwt' , {session:false})  ,invoiceController.update);
router.post('/' ,  passport.authenticate('jwt' , {session:false}),invoiceController.create);
module.exports = router;