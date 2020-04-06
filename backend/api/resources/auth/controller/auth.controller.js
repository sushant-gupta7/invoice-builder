const jwt = require('jsonwebtoken');
const { devConfig } = require("../../../config/env/development");
module.exports = {
  sendJWTToken(req, res) {
    const token = jwt.sign({ id: req.user }, process.env.jwt_secret || devConfig.jwt_secret, {
      expiresIn: "1d"
    });
    res.redirect(`${process.env.frontEndUrl || devConfig.fronEndUrl}/dashboard/invoices/?token=${token}`)
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
