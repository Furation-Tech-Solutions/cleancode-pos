import mongoose from "mongoose";

const foodMenuSchema = new mongoose.Schema({
  name: { type: String, maxlength: [30, "Name should have less than 30 charcters"],  minLength: [3, "Name should have more than 3 character"],  required: [true, "please enter Name"], unique: true, trim: true},
  code: { type: String, maxlength: [50, "Maximum 50 characters are permitted"],  minLength: [1, "code should have more than 1 characters"],  required: [true, "Please enter code"], trim: true, default: null, unique: true },
  cuisine:[ { type: String, required: true, ref: 'Cuisine' }], // Assuming 'Cuisine' is the related model name
  subCategory: [{ type: String, required: true, ref: 'FoodCategory' }], // Assuming 'FoodSubCategory' is the related model name
  ingredientConsumption: [{ type: String, required: true, ref: 'Ingredient' }], // Assuming 'Ingredient' is the related model name
  totalCostOfIngredients: { type: Number },
  dineInPrice: { type: Number },
  takeAwayPrice: { type: Number },
  deliveryPrice: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'DeliveryPartner' }], // Assuming 'DeliveryPartner' is the related model name
  description: { type: String, maxlength: [200, "Maximum 200 charcters are permitted"], default: null, trim: true },
  foodImage: { type: String },
  isItVeg: { type: Boolean },
  isItBebrages: { type: Boolean },
  del_status: { type: Boolean, default: true }
});

export const FoodMenu = mongoose.model("FoodMenu", foodMenuSchema);