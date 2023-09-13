const mongoose = require("mongoose");
const purchaseItemSchema = new mongoose.Schema({
  purchaseid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Purchase",
    required: true,
  },

  itemid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ingredient",
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
    min: [1, "Quantity should be at least 1"],
  },
  unitOfMeasurement: {
    type: String,
    required: true,
    maxlength: [50, "Unit of measurement should be under 50 characters"],
  },

  price: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
    default: Date.now, // Set the default value to the current date and time
  },

  modifiedAt: {
    type: Date,
    default: Date.now, // Set the default value to the current date and time
  },

  modifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Staff",
    required: true,
  },
});

export const PurchaseItem = mongoose.model("PurchaseItem", purchaseItemSchema);
