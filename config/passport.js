//We want to use the JSON Web Token Strategy for our authentication process. All of this is 
//standard boiler-plate code to implement this.

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User.js');
const opts = {};


opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

//This is a key that is used to verify the token's signature. 
opts.secretOrKey = 'herpy derp';

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            console.log(user);
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
