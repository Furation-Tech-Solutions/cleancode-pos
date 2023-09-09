import mongoose from "mongoose";

const preMadeFoodSchema = new mongoose.Schema({
  name: { type: String, maxlength: [30, "Name should have less than 30 charcters"],  minLength: [3, "Name should have more than 3 character"],  required: [true, "please enter Name"], unique: true, trim: true},
  code: { type: String },
  category: [{ type: String, required: true, ref: 'IngredientCategory' }],
  ingredientConsumption: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient', required: true }],
  consumptionUnit: { type: String },
  costPerUnit: { type: Number },
  lowQty: { type: Number },
  del_status: { type: Boolean, default: true }
});

export const PreMadeFood = mongoose.model("PreMadeFood", preMadeFoodSchema);