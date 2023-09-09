import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
  companyId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Company", required: [true, "Please enter companyId"] }], 
  contact: { type: Number, required: true, maxLength: [13, "Contact number should be under 13 Number"] },
  address: { type: String, maxlength: [100, "Maximum 100 charcters are permitted"], minLength: [5, "address should have more than 5 character"], required: [true, "please enter address"], trim: true, default: null },
  email: { type: String, unique: true, trim: true, required: true, lowercase: true },
  del_status: { type: Boolean, default: true }
});

export const Supplier = mongoose.model("Supplier", supplierSchema);