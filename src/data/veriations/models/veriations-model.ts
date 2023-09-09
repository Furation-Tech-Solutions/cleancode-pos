import mongoose from "mongoose";

const veriationsSchema = new mongoose.Schema({
  name: { type: String, maxlength: [30, "Name should have less than 30 charcters"],  minLength: [3, "Name should have more than 3 character"],  required: [true, "please enter Name"], unique: true, trim: true},
  foodMenuCode_byId: [{ type: String, required: true, ref: 'FoodMenu' }],
  dineInPrice: { type: Number },
  takeAwayPrice: { type: Number },
  deliveryPrice: [{ type: mongoose.Schema.Types.ObjectId, ref: 'deliveryPatners', required: true }],
  ingredientConsumption: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ingredient', required: true }],
  del_status: { type: Boolean, default: true }
});

export const Veriations = mongoose.model("Veriations", veriationsSchema);