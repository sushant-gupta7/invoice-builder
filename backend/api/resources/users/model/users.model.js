const mongoose = require("mongoose");
const schema = mongoose.Schema;
const userSchema = new schema(
  {
    local: {
    email: String,
    password: String,
    },
    google: {
      email:String,
      id:String,
      displayName:String,
      token:String
    },
    github: {
      email:String,
      id:String,
      displayName:String,
      token:String
    }
  },
  { strict: false }
);
module.exports = mongoose.model("Users", userSchema);
