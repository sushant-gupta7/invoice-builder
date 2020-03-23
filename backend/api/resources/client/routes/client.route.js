import express from 'express' ;
import clientController from '../../client/controller/client.controller';
import passport from 'passport';
const router = express.Router();

// Invoices

router.get('/' , passport.authenticate('jwt' , {session:false})  , clientController.findAll);
router.get('/all' , passport.authenticate('jwt' , {session:false})  , clientController.findAllForOthers);
router.get('/:id' , passport.authenticate('jwt' , {session:false})  , clientController.findId);
router.delete('/delete/:id' , passport.authenticate('jwt' , {session:false})  , clientController.deleteId);
router.put('/update/:id' , passport.authenticate('jwt' , {session:false})  , clientController.update);
router.post('/' , passport.authenticate('jwt' , {session:false})  , clientController.create);
module.exports = router;