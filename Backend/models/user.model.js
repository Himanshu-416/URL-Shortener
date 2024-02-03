import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

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

UserSchema.pre("save", async function (next) {
  const password = this.password
  if(this.isModified("password")){
    this.password = await bcrypt.hash(password, 10)
  }
  next()
})

UserSchema.methods.isPasswordMatch = async function (password) {
  return await bcrypt.compare(password, this.password);
}

UserSchema.methods.generateToken = function (){
  const token = jwt.sign({ _id: this._id, username: this.username, email: this.email }, process.env.JWT_SECRET)
  return token;
}

const User = model("User", UserSchema);

export default User;
