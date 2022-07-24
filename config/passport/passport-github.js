require("dotenv").config();
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../../models/user");

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "https://mysterious-springs-77605.herokuapp.com/auth/github/profile",
    },
    (accessToken, refreshToken, profile, cb) => {
      User.findOne({ githubId: profile.id }).then((user) => {
        if (user) {
          return cb(null, user);
        } else {
          new User({
            githubId: profile.id,
            picture: profile._json.avatar_url,
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
