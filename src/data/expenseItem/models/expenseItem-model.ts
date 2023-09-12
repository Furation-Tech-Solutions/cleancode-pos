import mongoose from "mongoose";

const expenseItemSchema = new mongoose.Schema({
  name: { type: String, maxlength: [30, "Name should have less than 30 charcters"],  minLength: [3, "Name should have more than 3 character"],  required: [true, "please enter Name"], unique: true, trim: true},
  description: { type: String, default: null, trim: true, maxlength: [500, "Food category description can't exceed 500 characters."] },
  staff_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true }],
  company_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true }],
  del_status: { type: Boolean, default: true }
});

export const ExpenseItem = mongoose.model("ExpenseItem", expenseItemSchema);