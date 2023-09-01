const mongoose = require("mongoose");
const requisitionItemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
    maxlength: [100, "Item name should be under 100 characters"],
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

export const RequisitionItem = mongoose.model(
  "RequisitionItem",
  requisitionItemSchema
);
