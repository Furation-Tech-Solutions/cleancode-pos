import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderNumber: { type: Number, required: true, maxLength: [3, "Phone number should be under 3 Number"], },
  date: { type: String },
  persons: { type: String, maxlength: [50, "Maximum 50 charcters are permitted"], minLength: [3, "persons should have more than 3 character"],  required: [true, "please enter persons"], trim: true, default: null },
  waiter: { type: String, maxlength: [50, "Maximum 50 charcters are permitted"], minLength: [3, "waiter should have more than 3 character"],  required: [true, "please enter waiter"], trim: true, default: null },
  orderTime: { type: String },
  orderType: { type: String, default: 'dine_In', enum: ['dine_In', 'take_Away', 'delivery'] },
  orderTable: { type: mongoose.Schema.Types.ObjectId, ref: "Table", required: [true, "Please enter orderTable"] }, 
  kot_print: { type: mongoose.Schema.Types.ObjectId, ref: "KOT"}, 
  total_order_price: { type: Number },  
  order_status: { type: String, default: 'active', enum: ['active', 'running', 'billing', 'settle'] },
  del_status: { type: Boolean, default: true }
});

export const Order = mongoose.model("Order", orderSchema);