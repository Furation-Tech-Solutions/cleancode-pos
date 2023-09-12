import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  name: { type: String, maxlength: [50, "Maximum 50 charcters are permitted"], minLength: [3, "ingredientUnit_name should have more than 3 character"],  required: [true, "please enter ingredientUnit_name"], trim: true, default: null },
  description: { type: String, maxlength: [200, "Maximum 100 charcters are permitted"], trim: true, default: null },
  staff_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Staff", required: [true, "Please enter staff_id"] }], 
  company_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Company", required: [true, "Please enter company_id"] }],
  order_by: { type: String, maxlength: 50 },
  email: { type: String, unique: true, trim: true, required: true, lowercase: true }, 
  del_status: { type: Boolean, default: true }
});

export const Payment = mongoose.model("Payment", paymentSchema);