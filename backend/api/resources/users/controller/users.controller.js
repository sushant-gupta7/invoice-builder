import User from "../../users/model/users.model";
import userService from "../service/user.service";
import bycryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { devConfig } from "../../../config/env/development";
import {sendEmail} from '../../../modules/mail'
export default {
  async signup(req, res) {
    try {
      const { value, error } = userService.validateSignUpSchema(req.body);
      if (error && error.details) {
        return res.status(400).json({ error: error });
      }
      const existingUser = await User.findOne({'local.email':value.email});
      if(existingUser){
        return res.status(400).json({message: 'User Already Exists'});
      }
      console.log(user);
      const user = await new User();
      user.local.email = value.email;
      const salt = await bycryptjs.genSalt();
      const hash = await bycryptjs.hash(value.password, salt);
      user.local.password = hash;
      await user.save()
      .then(user => {
        return res
          .status(200)
          .json({ success: true, message: "User Created Successfully" });
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json({ message: "Error", error: err });
      });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: err });
    }
  },

  async login(req, res) {
    try {
      const { value, error } = userService.validateSignUpSchema(req.body);
      if (error && error.details) {
        return res.status(400).json({ error: error });
      }
      console.log(value);
      const user = await User.findOne({ 'local.email': value.email });
      if (!user) {
        return res.status(400).json({ message: "Invalid Email Or Password" });
      }
      const matched = bycryptjs.compare(value.password, user.local.password);
      if (!matched) {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const token = jwt.sign({ id: user._id }, devConfig.jwt_secret, {
          expiresIn: "1d"
        });
        return res
          .status(200)
          .json({ message: "User Found", token: token, success: true });
      }
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: err });
    }
  },
  async testaction(req, res) {
    return res.json(req.user);
  },

  async forgotPassword(req,res) {
    try {
      console.log(req.body);
      const { value, error } = userService.validateForgotPasswordSchema(req.body);
      if (error && error.details) {
        return res.status(400).json({ error: error });
      }

      const findUser = {
        $or:[
          {"google.email":value.email},
          {"github.email":value.email},
          {"local.email":value.email}
        ]
      }

      const user = await User.findOne(findUser).then(data=>{
        return data;
      }).catch(err=>{
        console.log(err);
      });

      
      console.log("USERRRRRRRRRRRRRRRRRRRRRRRRRRRR ISSSSSSSS",user);
      if(!user) {
        return res.status(400).json({message:'Could Not Find User'});
      }
      const token = jwt.sign({ id: user._id }, process.env.jwt_secret || devConfig.jwt_secret, {
        expiresIn: "1d"
      });
      const resetLink = `
      <h4>Please click on the rest link to reset the password</h4>
      <a href="${devConfig.fronEndUrl}reset-password?token=${token}">Reset Password</a>
      `
        await sendEmail({
          html:resetLink,
          subject: 'Forgot password',
          email: user.local.email
        }).then(results=>{
          return res.status(200).json(results)

        }).catch(err=>{
          console.log(err);
        })
      // return res.status(200).json({message:"Response here",data:resetLink});
    } catch(err) {
      console.log(err);
    }
  },
  async resetPassword(req,res) {
    try{
      let {password} = req.body;
      if(!password) {
        return res.status(400).json({message:'Password Is Required'});
      }
       await User.findById(req.user._id).then(data=>{
        console.log(data);
       }).catch(err=>{
         console.log(err);
       })
      

    } catch(err) {
      console.log(err);
    }
  }
};
