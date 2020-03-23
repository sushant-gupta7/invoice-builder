import express from 'express';
import invoiceRoute from './resources/invoice/routes/invoice.route';
import clientRoute from './resources/client/routes/client.route';
import userRoute from './resources/users/routes/users.route';
import authRoute from './resources/auth/routes/auth.route';

const router = express.Router();
router.use('/invoices' , invoiceRoute);
router.use('/clients' , clientRoute);
router.use('/users' , userRoute);
router.use('/auth' , authRoute);
module.exports = router;
