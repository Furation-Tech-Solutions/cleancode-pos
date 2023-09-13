import mongoose from "mongoose";

const stockAdjustmentSchema = new mongoose.Schema({
  outletStockId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OutletStock', required: true }],
  adjustmentType: { type: String, maxlength: [100, "Maximum 100 charcters are permitted"], minLength: [3, "stockAdjustment_type should have more than 3 character"], required: [true, "please enter stockAdjustment_type"], trim: true, unique: true },
  adjustmentDate: { type: Date, default: Date.now },
  quantityChange: { type: Number, required: true },
  del_status: { type: Boolean, default: true }
});

export const StockAdjustment = mongoose.model("StockAdjustment", stockAdjustmentSchema);
