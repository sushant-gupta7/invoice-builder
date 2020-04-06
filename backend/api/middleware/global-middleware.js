import express from "express";
import logger from "morgan";
import cors from "cors";
import passport from "passport";
import { configureJWTStratergy } from "./passport-jwt";
import { configureGoogleDtrategy } from "./passport-google";
import { configureGithubStrategy } from "./passport-github";
import { devConfig } from "../config/env/development";
import session from "express-session";
import User from "../resources/users/model/users.model";
export const setGlobalMiddleware = app => {
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
    res.redirect("http://localhost:4200/login");
  });
};
