import mongoose from "mongoose";

const billingDetailsSchema = new mongoose.Schema({
  orderNunber_byId: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Order' }],
  billNumber: { type: String, maxLength: [16, "Phone number should be under 16 Number"], },
  Dine_price: { type: Number, required: [true, "Please enter a Dine_price"] },
  dateTime: { type: Date, default: Date.now },
  particulars: [{ 
    foodMenu: { type: mongoose.Schema.Types.ObjectId, ref: "FoodMenu" }, 
    quantity: { type: Number, min: 0,  default: 0 }, 
    rate: { type: Number, min: 0, default: 0 }, 
    amount: { type: Number, min: 0, default: 0 } 
  }],
  subTotal: { type: Number, min: 0, default: 0 },
  CGST: { type: Number, min: 0, default: 0 },
  SGST: { type: Number, min: 0, default: 0 },
  finalTotal: { type: Number, min: 0, default: 0 },
  gstNo: { type: String, maxlength: [16, "Maximum 16 characters are permitted"], minLength: [16, "gstNo should have less than 16 characters"], required: [true, "Please enter gstNo"], trim: true, default: null },
  del_status: { type: Boolean, default: true }
});

export const BillingDetails = mongoose.model("BillingDetails", billingDetailsSchema);