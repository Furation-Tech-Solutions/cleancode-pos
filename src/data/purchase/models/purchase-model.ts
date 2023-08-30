const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
  inventoryItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "InventoryItem",
    required: true,
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
  paymentMode: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    required: true,
  },
});

export const Purchase = mongoose.model("Purchase", purchaseSchema);
