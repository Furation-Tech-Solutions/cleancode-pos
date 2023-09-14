const mongoose = require("mongoose");
const requisitionItemSchema = new mongoose.Schema({
  requisitionid: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Requisition",
    required: true,
  }],

  itemid: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ingredient",
    required: true,
  }],

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
