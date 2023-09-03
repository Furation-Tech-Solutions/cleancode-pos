const mongoose = require("mongoose");

const inventorySDPSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
    required: true,
  },
  paymentMethod: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  note: {
    type: String,
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const InventorySDP = mongoose.model("InventorySDP", inventorySDPSchema);


