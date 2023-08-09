import mongoose from "mongoose";

const foodCategorySchema = new mongoose.Schema({
  foodCategory_Name: {
    type: String,
    trim: true,
    required: [true, "Please enter the food category name."],
    maxlength: [100, "Food category name can't exceed 100 characters."],
    minlength: [3, "Food category name should have at least 3 characters."],
  },
  description: {
    type: String,
    default: null,
    trim: true,
    maxlength: [500, "Food category description can't exceed 500 characters."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  kitchen:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Kitchen",
    required: [true, "Please enter a kitchen"],
  }],
  del_status: {
    type: Boolean,
    default: true,
  }
});
export const FoodCategory = mongoose.model("FoodCategory", foodCategorySchema);
