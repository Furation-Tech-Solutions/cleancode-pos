import mongoose from "mongoose";

const outletStockSchema = new mongoose.Schema({
  outletCode_byId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Outlet', required: true }],
  items: { type: String, maxlength: [200, "Maximum 100 charcters are permitted"], trim: true, default: null },
  qty: { type: Number, required: [true, "please enter Quantity"], default: null }, 
  flag: { type: String, maxlength: [50, "Maximum 50 charcters are permitted"], trim: true, default: null },
  del_status: { type: Boolean, default: true }
});

export const OutletStock = mongoose.model("OutletStock", outletStockSchema);