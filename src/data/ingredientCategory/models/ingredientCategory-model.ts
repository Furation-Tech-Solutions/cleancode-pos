import mongoose from "mongoose";

const ingredientCategorySchema = new mongoose.Schema({
  ingredientCategory_name: { type: String, maxlength: [50, "Maximum 50 charcters are permitted"], minLength: [3, "ingredientCategory_name should have more than 3 character"], required: [true, "please enter ingredientCategory_name"], trim: true, default: null },
  description: { type: String, maxlength: [100, "Maximum 100 charcters are permitted"], trim: true, default: null },
  createdBy: { type: Date, default: Date.now },
  del_status: { type: Boolean, default: true }
});
export const IngredientCategory = mongoose.model("IngredientCategory", ingredientCategorySchema);
