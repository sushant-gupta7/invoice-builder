import passport from "passport";
import GithubStrategy from "passport-github";
import { devConfig } from "../config/env/development";
import User from "../resources/users/model/users.model";

export const configureGithubStrategy = () => {
  passport.use(
    new GithubStrategy.Strategy(
      {
        clientID: devConfig.github.clientID,
        clientSecret: devConfig.github.clientSecret,
        callbackURL: devConfig.github.callBackURL
      },
      async function(request, accessToken, refreshToken, profile, done) {
        try {
          //   console.log("accessToken", accessToken);
          //   console.log("refreshToken", refreshToken);
          //   console.log("profile", profile);
          //   done(null, profile);
          const user = await User.findOne({ "github.id": profile.id });
          if (user) {
            return done(null,user);
          }

          const newUser = new User();
          newUser.github.id = profile.id;
          newUser.github.token = accessToken;
          newUser.github.displayName = profile.displayName;
          newUser.github.email = profile.email;
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
