import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  { timestamps: true }
);

mongoose.pre("save", async function (next) {
  const password = this.password
  if(isModified("password")){
    this.password = await bcrypt.hash(password, 10)
  }
  next()
})

mongoose.methods.isPasswordMatch = async function (password) {
  return await bcrypt.compare(password, this.password);
}


const User = model("User", UserSchema);

export default User;
