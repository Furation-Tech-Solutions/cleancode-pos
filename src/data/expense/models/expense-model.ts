import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  amount: { type: Number },
  staff_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Staff", required: [true, "Please enter staff_id"] }], 
  note: { type: String, maxlength: [200, "Maximum 200 charcters are permitted"], minLength: [3, "note should have more than 3 character"],  required: [true, "please enter note"], trim: true, default: null },
  outlet_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Outlet", required: [true, "Please enter outlet_id"] }], 
  payment_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Payment", required: [true, "Please enter payment_id"] }], 
  del_status: { type: Boolean, default: true }
});

export const Expense = mongoose.model("Expense", expenseSchema);