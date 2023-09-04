const mongoose = require("mongoose");

const BillingStatusEnum = {
  UNPAID: "Unpaid",
  PARTIALLYPAID: "PartiallyPaid",
  PAID: "Paid",
};

const inventoryBillingSchema = new mongoose.Schema({
  outlet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Outlet",
    required: true,
  },
  requisitionData: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Requisition",
    required: true,
  },

  billingDate: {
    type: Date,
    required: true,
  },
  paymentMode: {
    type: String,
    required: true,
  },
  amountPaid: {
    type: Number,
    required: true,
  },
  amountDue: {
    type: Number,
  },
  billingStatus: {
    type: String,
    enum: Object.values(BillingStatusEnum),
    default: "unpaid",
  },
  paymentDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    maxlength: [500, "description should be under 500 Characters"],
  },
});

export const InventoryBilling = mongoose.model("InventoryBilling",inventoryBillingSchema);

