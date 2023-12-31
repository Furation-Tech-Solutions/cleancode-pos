import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema({
  name: { type: String, maxlength: [50, "Maximum 50 charcters are permitted"], minLength: [3, "name should have more than 3 character"], required: [true, "please enter IngredientName"], trim: true },
  code: { type: Number, required: [true, "please enter code"], default: null },
  category: [{ type: mongoose.Schema.Types.ObjectId, ref: "IngredientCategory", required: [true, "please enter IngredientCategory"] }],
  PurchaseUnit: [{ type: mongoose.Schema.Types.ObjectId, ref: "IngredientUnit", required: [true, "please enter PurchaseUnit"] }],
  ConsumptionUnit: [{ type: mongoose.Schema.Types.ObjectId, ref: "IngredientUnit",  required: [true, "please enter ConsumptionUnit"] }],
  ConversionUnit: { type: String, required: [true, "please enter ConversionUnit"], default: null },
  PurchaseRate: { type: Number, required: [true, "please enter PurchaseRate"], default: null },
  costUnit: { type: Number, required: [true, "please enter costUnit"], default: null },
  LowQty: { type: Number, required: [true, "please enter LowQty"], default: null }, 
  del_status: { type: Boolean,  default: true }
});
export const Ingredient = mongoose.model("Ingredient", ingredientSchema);
