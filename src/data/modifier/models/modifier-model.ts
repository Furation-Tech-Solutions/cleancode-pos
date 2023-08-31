import mongoose from "mongoose";

const modifierSchema = new mongoose.Schema({
  name: { type: String, maxlength: [50, "Maximum 50 charcters are permitted"], minLength: [3, "ingredientUnit_name should have more than 3 character"],  required: [true, "please enter ingredientUnit_name"], trim: true, default: null },
  salePrice: { type: Number, required: [true, "please enter salePrice"], default: null }, 
  ingredientConsumption: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient', required: true }],
  description: { type: String, maxlength: [200, "Maximum 100 charcters are permitted"], trim: true, default: null },
  totalCostOfIngredients: { type: Number, required: [true, "please enter totalCostOfIngredients"], default: null }, 
  del_status: { type: Boolean, default: true }
});

export const Modifier = mongoose.model("Modifier", modifierSchema);