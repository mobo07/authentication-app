require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../../models/user");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: " https://mysterious-springs-77605.herokuapp.com/auth/google/profile",
    },
    (accessToken, refreshToken, profile, cb) => {
      User.findOne({ googleId: profile.id }).then((user) => {
        if (user) {
          return cb(null, user);
        } else {
          new User({
            googleId: profile.id,
            name: profile._json.name,
            picture: profile._json.picture,
          })
            .save()
            .then((savedUser) => {
              return cb(null, savedUser);
            });
        }
      });
    }
  )
);
