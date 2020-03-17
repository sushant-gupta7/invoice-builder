import express from 'express' ;
import invoiceController from '../api/controllers/invoice.controller'
export const router = express.Router();

// Invoices

router.get('/invoices' , invoiceController.findAll);
router.get('/invoices/:id' , invoiceController.findId);
router.delete('/invoices/delete/:id' , invoiceController.deleteId);
router.put('/invoices/update/:id' , invoiceController.update);
router.post('/invoices' , invoiceController.create);
