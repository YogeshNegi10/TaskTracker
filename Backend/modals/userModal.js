import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
    trim: true,
    minlength: [2, "Name must have at least 2 characters."]
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required."],
    minlength: [6, "Password must be at least 6 characters long."],
    select: false, 
  },
  country: {
    type: String,
    required: [true, "Country is required."],
    trim: true,
  },
  credits: {
    type: Number,
    default: 4, // By default, a new user will have 4 credits
    min: [0, "Credits cannot be negative."]
  },
  otp: {
    type: String,
    default: "",
  },
  otpExpiresAt: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true, 
});

const User = mongoose.model("User", userSchema);

export default User;
