require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = require("./routes/routes");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const globalVariables = require("./config/globalVariables");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");
require("./config/passport/passport");
require("./config/passport/passport-google");
require("./config/passport/passport-github");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.use(
  session({
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);

mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.use(flash());
app.use(globalVariables);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", router);

app.listen(3000, () => console.log("listening on port 3000"));
