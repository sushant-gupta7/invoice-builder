import Invoices from "../../invoice/model/invoice.model";
import invoiceService from "../../invoice/service/invoice.service";
import jwt from 'jsonwebtoken';

import { devConfig } from "../../../config/env/development";
export default {
  sendJWTToken(req, res) {
    const token = jwt.sign({ id: req.user }, devConfig.jwt_secret, {
      expiresIn: "1d"
    });
    res.redirect(`${devConfig.fronEndUrl}/dashboard/invoices/?token=${token}`)
    // return res.status(200).json({message: "User Found",token:token , success:true});
  },
  authenticate(req,res) {
    res.status(200).json({message:'authenticated'});
  },
  logout(req,res) {
    req.logout();
    res.status(200).json({message:'Logout Successful'});
  }
};
