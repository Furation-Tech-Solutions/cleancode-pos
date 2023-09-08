import mongoose from "mongoose";

const foodCategorySchema = new mongoose.Schema({
  // parent_id: { type: mongoose.Schema.Types.ObjectId, ref: "FoodCategory", required: [true, "Please enter a foodCategory"] },
  foodCategory_Name: { type: String,  trim: true, required: [true, "Please enter the food category name."], maxlength: [100, "Food category name can't exceed 100 characters."], minlength: [3, "Food category name should have at least 3 characters."] },
  description: { type: String, default: null, trim: true, maxlength: [500, "Food category description can't exceed 500 characters."] },
  createdBy: { type: Date, default: Date.now },
  del_status: { type: Boolean, default: true }
});
export const FoodCategory = mongoose.model("FoodCategory", foodCategorySchema);
