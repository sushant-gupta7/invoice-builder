
import JwtStratergy from 'passport-jwt';
import {devConfig} from '../config/env/development';
import User from '../resources/users/model/users.model';
import passport from 'passport';

export const configureJWTStratergy = () =>{
let opts = {}
opts.jwtFromRequest = JwtStratergy.ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.jwt_secret || devConfig.jwt_secret;
passport.use(new JwtStratergy.Strategy(opts, function(payload, done) {
    User.findOne({_id: payload.id}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));
}