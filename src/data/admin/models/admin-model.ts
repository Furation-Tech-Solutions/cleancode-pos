import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const validateEmail = function (email: string) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: [53, "name should be under 53 Characters"],
    trim: true,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  phone: {
    type: Number,
    required: true,
    maxLength: [13, "Phone number should be under 13 Number"],
  },
  brand: {
    type: String,
    maxLength: [30, "Brand name should be under 30 Characters"],
    trim: true,
  },
  jobTitle: {
    type: String,
    maxLength: [30, "Job Title name should be under 30 Characters"],
    trim: true,
  },
  superAdmin: {
    type: Boolean,
    default: false,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  permissions: {
    type: [Number],
  },
  password: {
    type: String,
    minLength: [6, "Password should have more than 6 character"],
    required: [true, "please enter password"],
    trim: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  outlet: {
    type: String,
    ref: "Outlet",
  },
  del_status: { 
    type: Boolean, 
    default: true 
  },
});

adminSchema.pre("save", async function (next) {
  if (this.isModified("password") && this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

adminSchema.methods.matchPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};
adminSchema.methods.generateToken = function () {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in your environment variables");
  }
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
};
export const Admin = mongoose.model("Admin", adminSchema);
