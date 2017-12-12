const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//must specify all of these fields, so that it is pulled out from passport.js

const userSchema = new Schema({
  googleId: String,
  name: String,
  imageUrl: String
});

//telling mongoose that we want to create a new collection called users
//will make this new collection, using the userSchema.
//mongoose will not overwrite existing collections.
//can freely add in and remove properties to the userSchema.
mongoose.model("users", userSchema);
