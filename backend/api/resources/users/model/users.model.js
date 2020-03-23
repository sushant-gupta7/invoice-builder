import mongoose from "mongoose";
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
export default mongoose.model("Users", userSchema);
