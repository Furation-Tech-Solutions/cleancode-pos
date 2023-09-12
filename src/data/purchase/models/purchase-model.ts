const mongoose = require("mongoose");

const paymentModeEnum = {
  DEBITCARD: "Debit Card",
  CREDITCARD: "Credit Card",
  CASH: "Cash",
  UPI: "Upi",
  BANKTRANSFER: "BankTransfer"
};

const purchaseSchema = new mongoose.Schema({
  inventoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Inventory",
    required: true,
  },

  supplierId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
    required: true,
  },

  paymentMode: {
    type: String,
    enum: Object.values(paymentModeEnum),
    default: "Cash",
  },

  grandTotal: {
    type: Number,
    required: false,
  },

  amountDue: {
    type: Number,
    required: false,
  },

  amountPaid: {
    type: Number,
    required: false,
  },

  invoiceNumber: {
    type: String,
    required: true,
  },

  date: {
    type: String,
    required: true,
  },
});

export const Purchase = mongoose.model("Purchase", purchaseSchema);
