
const JwtStratergy = require('passport-jwt');
const {devConfig} = require('../config/env/development');
const User = require('../resources/users/model/users.model');
const passport = require('passport');

module.exports.configureJWTStratergy = () =>{
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