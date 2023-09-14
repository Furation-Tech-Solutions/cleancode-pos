import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const staffSchema = new mongoose.Schema({
  outletCode_byId: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Outlet", required: true },
  ],
  username: {
    type: String,
    maxlength: [50, "Maximum 50 charcters are permitted"],
    minLength: [5, "name should have more than 5 character"],
    required: [true, "please enter name"],
    trim: true,
    default: null,
  },
  phone: {
    type: Number,
    min: [1000000000, "phone number should be equal 10 digit"],
    max: [9999999999, "phone number should be equal 10 digit"],
    required: [true, "Please enter phone"],
    default: null,
  },
  email_address: {
    type: String,
    unique: true,
    required: [true, "please enter email"],
  },
  jobTitle: {
    type: String,
    maxLength: [30, "Job Title name should be under 30 Characters"],
    trim: true,
  },
  permissions: { type: [Number] },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  password: {
    type: String,
    minLength: [6, "Password should have more than 6 character"],
    required: [true, "please enter password"],
    trim: true,
  },
  securityQuestion: { type: String },
  del_status: { type: Boolean, default: true },
});

staffSchema.pre("save", async function (next) {
  if (this.isModified("password") && this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

staffSchema.methods.matchPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};
staffSchema.methods.generateToken = function () {
   if (!process.env.JWT_SECRET) {
     throw new Error("JWT_SECRET is not defined in your environment variables");
   }
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
};

export const Staff = mongoose.model("Staff", staffSchema);

