const User = require("../models/user");
const passport = require("passport");
const fs = require("fs");
const upload = require("../config/multerConfig");
// const jwt = require("jsonwebtoken");
// require("dotenv").config();

module.exports = {
  getIndex: (req, res) => {
    res.redirect("/register");
  },

  getRegister: (req, res) => {
    res.render("register");
  },

  postRegister: (req, res) => {
    const { username, password } = req.body;
    User.register(new User({ username }), password, (err, user) => {
      // console.log(req.body);
      if (err) {
        console.log(err.message);
        req.flash("error", err.message);
        res.redirect("back");
      } else {
        passport.authenticate("local")(req, res, () => {
          req.flash("success", "Login Successful");
          res.redirect("/profile");
        });
      }
    });
  },

  getLogin: (req, res) => {
    res.render("login");
  },

  postLogin: (req, res) => {
    const { username, password } = req.body;
    const user = new User({
      username,
      password,
    });

    req.login(user, (err) => {
      if (err) {
        req.flash("error", err.message);
        res.redirect("/login");
      } else {
        passport.authenticate("local", {
          failureRedirect: "/login",
          failureFlash: true,
          successFlash: true,
        })(req, res, () => {
          req.flash("success", "Welcome back!");
          res.redirect("/profile");
        });
      }
    });
  },

  googleAuth: passport.authenticate("google", { scope: ["profile"] }),

  googleAuthRedirect: passport.authenticate("google", {
    failureRedirect: "/login",
  }),

  authRedirectCallBack: (req, res) => {
    req.flash("success", `Welcome back!`);
    res.redirect("/profile");
  },

  githubAuth: passport.authenticate("github", { scope: ["user:email"] }),

  githubAuthRedirect: passport.authenticate("github", {
    failureRedirect: "/login",
  }),

  getProfile: (req, res) => {
    if (req.isAuthenticated()) {
      const {
        name,
        bio,
        username: email,
        phone,
        profilePhoto,
        picture,
      } = req.user;
      res.render("profile", { name, bio, email, phone, profilePhoto, picture });
    } else {
      req.flash("error", "Please login first");
      res.redirect("/login");
    }
  },

  postProfile: (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        req.flash("error", err.message);
        res.redirect("back");
        return;
      }
      let profilePhoto;
      if (req.file)
        profilePhoto = {
          data: fs.readFileSync(req.file.path),
          contentType: req.file.mimetype,
        };
      const {
        name,
        bio,
        phone,
        email: username,
        oldPassword,
        newPassword,
      } = req.body;
      await User.findOneAndUpdate(
        { _id: req.user["_id"] },
        {
          name,
          bio,
          phone,
          profilePhoto,
          username,
        }
      )
        .then((foundUser) => {
          if (oldPassword.length > 0 && newPassword.length > 0) {
            foundUser.changePassword(
              oldPassword,
              newPassword,
              (error, user) => {
                if (error) {
                  req.flash("error", "Incorrect password");
                  res.redirect("back");
                  return;
                } else {
                  req.flash("success", "Profile updated successfully");
                  res.redirect("/profile");
                }
              }
            );
          } else {
            req.flash("success", "Profile updated successfully");
            res.redirect("/profile");
          }
        })
        .catch((err) => console.log(err));
    });
  },

  logout: (req, res) => {
    req.logout((err) => {
      if (err) {
        req.flash("failure", "Failed to logout");
        res.redirect("/profile");
        return;
      }
    });
    res.redirect("/");
  },
};
