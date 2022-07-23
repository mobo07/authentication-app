const controller = require("../controllers/controller");
const express = require("express");
const router = express.Router();

const {
  getIndex,
  getRegister,
  postRegister,
  getLogin,
  postLogin,
  getProfile,
  postProfile,
  googleAuth,
  googleAuthRedirect,
  authRedirectCallBack,
  githubAuth,
  githubAuthRedirect,
  logout,
} = controller;

// Register/Login routes

router.get("/", getIndex);

router.route("/register").get(getRegister).post(postRegister);

router.route("/login").get(getLogin).post(postLogin);

// Google Register/Login routes

router.route("/auth/google").get(googleAuth);

router
  .route("/auth/google/profile")
  .get(googleAuthRedirect, authRedirectCallBack);

// GitHub Register/Login routes

router.route("/auth/github").get(githubAuth);

router
  .route("/auth/github/profile")
  .get(githubAuthRedirect, authRedirectCallBack);

// Profile route

router.route("/profile").get(getProfile).post(postProfile);

//Logout route
router.get("/logout", logout);

module.exports = router;
