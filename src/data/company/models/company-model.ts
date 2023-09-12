import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: { type: String, maxlength: [30, "Company name should have less than 30 charcters"],  minLength: [3, "Company name should have more than 3 character"],  required: [true, "please enter Company Name"], unique: true, trim: true},
  email: { type: String, unique: true, trim: true, required: true, lowercase: true },
  phone: { type: String, maxLength: [ 13, "Phone Number should have 13 charcters included country code", ], minLength: [ 13, "Phone Number should have 13 charcters included country code", ], required: [true, "please enter  name"], trim: true },
  gstNo: { type: String, maxlength: [15, "Company GST No should have 15 charcters are permitted"], minlength: [15, "Company GST No should have 15 character"], trim: true },
  companyLogo: { type: String, default: null },
  ownerName: { type: String, maxlength: [30, "Maximum 30 charcters are permitted"], minLength: [3, "Company name should have more than 3 character"], trim: true, required: [true, "please enter name"] },
  brand: {  type: String,  maxLength: [30, "Brand name should be under 30 Characters"],  trim: true },
  active: { type: Boolean,  default: true  },
  createdAt: { type: Date, default: Date.now() }
});

export const Company = mongoose.model("Company", companySchema);
