import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  reportDate: { type: Date, default: Date.now },
  cashier: [{ type: mongoose.Schema.Types.ObjectId, ref: "Staff", required: [true, "please enter cashier"] }],
  totalSales: { type: Number, required: true },
  totalProfit: { type: Number, required: true },
  totalTax: { type: Number, default: 0 },
  totalDiscount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  del_status: { type: Boolean, default: true }
});

export const Report = mongoose.model("Report", reportSchema);
