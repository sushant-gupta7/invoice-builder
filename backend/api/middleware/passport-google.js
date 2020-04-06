const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2");
const { devConfig } = require("../config/env/development");
const User = require("../resources/users/model/users.model");

module.exports.configureGoogleDtrategy = () => {
  passport.use(
    new GoogleStrategy.Strategy(
      {
        clientID: devConfig.google.clientID,
        clientSecret: devConfig.google.clientSecret,
        callbackURL: devConfig.google.callBackURL,
        passReqToCallback: true
      },
      async function(request, accessToken, refreshToken, profile, done) {
        try {
          //   console.log("accessToken", accessToken);
          //   console.log("refreshToken", refreshToken);
          //   console.log("profile", profile);
          //   done(null, profile);
          const user = await User.findOne({ "google.id": profile.id });
          if (user) {
            return done(null,user);
          }

          const newUser = new User();
          newUser.google.id = profile.id;
          newUser.google.token = accessToken;
          newUser.google.displayName = profile.displayName;
          newUser.google.email = profile.email;
          await newUser.save()
          done(null,newUser);
        } catch (err) {
          console.log(err);
          return done(err);
        }
      }
    )
  );
};
