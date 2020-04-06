const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const passport = require("passport");
const path = require("path");
const { configureJWTStratergy } = require("./passport-jwt");
const { configureGoogleDtrategy } = require("./passport-google");
const { configureGithubStrategy } = require("./passport-github");
const { devConfig } = require("../config/env/development");
const session = require("express-session");
const User = require("../resources/users/model/users.model");
 module.exports.setGlobalMiddleware = app => {

  app.use(express.static(path.join(__dirname ,'dist')));


  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(logger("dev"));
  app.use(
    session({
      secret: process.env.jwt_secret || devConfig.jwt_secret,
      resave: true,
      saveUninitialized: true
    })
  );
  // app.use(express.static(path.join(__dirname, "public")));
  app.use(passport.initialize());
  app.use(passport.session());
  configureJWTStratergy();
  configureGoogleDtrategy();
  configureGithubStrategy();
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(null, user);
    });
  });
  app.use("/failure", (req, res) => {
    res.redirect("https://chat-app-proj.herokuapp.com/login");
  });
};
