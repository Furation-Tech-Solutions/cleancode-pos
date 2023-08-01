import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: [53, "name should be under 53 Characters"],
    trim: true,
  },
  place: {
    type: String,
    maxLength: [200, "Place name should be under 200 Characters"],
    trim: true
  },
  comapanyId: {
    type: String,
  }
});
export const Inventory = mongoose.model("Inventory", inventorySchema);
