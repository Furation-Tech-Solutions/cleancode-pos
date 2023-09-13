const mongoose = require("mongoose");
const internalTranferItemSchema = new mongoose.Schema({
  internalTransferid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "InternalTransfer",
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
});

export const InternalTransferItem = mongoose.model(
  "internalTranferItem",
  internalTranferItemSchema
);
