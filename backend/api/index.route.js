const express = require('express');
const invoiceRoute = require('./resources/invoice/routes/invoice.route');
const clientRoute = require('./resources/client/routes/client.route');
const userRoute = require('./resources/users/routes/users.route');
const authRoute = require('./resources/auth/routes/auth.route');

const router = express.Router();
router.use('/invoices' , invoiceRoute);
router.use('/clients' , clientRoute);
router.use('/users' , userRoute);
router.use('/auth' , authRoute);
module.exports = router;
