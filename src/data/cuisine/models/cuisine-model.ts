import mongoose from "mongoose";

const cuisineSchema = new mongoose.Schema({
  name: { type: String, maxlength: [50, "Maximum 50 charcters are permitted"], minLength: [3, "ingredientUnit_name should have more than 3 character"],  required: [true, "please enter ingredientUnit_name"], trim: true, default: null },
  description: { type: String, maxlength: [200, "Maximum 100 charcters are permitted"], trim: true, default: null },
  createdBy: { type: Date, default: Date.now },
  del_status: { type: Boolean, default: true }
});

export const Cuisine = mongoose.model("Cuisine", cuisineSchema);