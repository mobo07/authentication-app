const mongoose = require("mongoose");
// const findOrCreate = require("mongoose-findorcreate");
const { Schema } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  username: String,
  password: String,
  googleId: String,
  githubId: String,
  name: String,
  bio: String,
  phone: String,
  profilePhoto: {
    data: Buffer,
    contentType: String,
  },
  picture: String,
});

userSchema.plugin(passportLocalMongoose);
// userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema);
module.exports = User;
