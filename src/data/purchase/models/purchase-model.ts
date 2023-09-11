const mongoose = require("mongoose");

const PaymentStatusEnum = {
  UNPAID: "Unpaid",
  PARTIALLYPAID: "PartiallyPaid",
  PAID: "Paid",
};

const purchaseSchema = new mongoose.Schema({
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Staff",
    required: true,
  },
  supplierId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  purchaseItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PurchaseItem",
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  amountPaid: {
    type: Number,
    required: false,
  },
  amountDue: {
    type: Number,
    required: false,
  },
  paymentMode: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: Object.values(PaymentStatusEnum),
    default: "Unpaid"
  },
});

export const Purchase = mongoose.model("Purchase", purchaseSchema);
