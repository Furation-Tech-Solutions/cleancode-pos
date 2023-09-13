import mongoose from "mongoose";

const wasteSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  responsiblePerson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Staff",
    required: true,
  },
  ingredients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ingredient",
      required: true,
    },
  ],
  foodMenu: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FoodMenu",
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
  totalLoss: {
    type: Number,
    required: true,
  },
  notes: {
    type: String,
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Staff",
    required: true,
  },
});

export const Waste = mongoose.model("Waste", wasteSchema);
