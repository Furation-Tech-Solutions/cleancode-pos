import mongoose from "mongoose";

const foodComboSchema = new mongoose.Schema({
  name: { type: String, maxlength: [50, "Maximum 50 characters are permitted"], minlength: [3, "Name should have at least 3 characters"], required: [true, "Please enter a name"], trim: true, unique: true },
  code: { type: String, maxlength: [50, "Maximum 50 characters are permitted"], minlength: [1, "Code should have at least 1 characters"], required: [true, "Please enter a code"], trim: true, unique: true },
  food_category: [{ type: mongoose.Schema.Types.ObjectId, ref: "FoodCategory", required: [true, "Please enter a food category"] }],
  foodMenu: [{ food_item: { type: mongoose.Schema.Types.ObjectId, ref: "FoodMenu"}, quantity: { type: Number, min: 0, default: 0 } }],
  Dine_price: { type: Number, required: [true, "Please enter a Dine_price"] },
  Takeaway_price: { type: Number, required: [true, "Please enter a Takeaway_price"] },
  Delivery_price: [{ deliveryPartnerName: { type: mongoose.Schema.Types.ObjectId, ref: "DeliveryPartner", default: null }, price: { type: Number, min: 0, default: 0 } }],
  description: { type: String, maxlength: [200, "Maximum 200 characters are permitted"], default: null, trim: true },
  isVeg: { type: Boolean, required: [true, "Please specify if the combo is vegetarian"], default: false },
  isBeverage: { type: Boolean, required: [true, "Please specify if the combo is a beverage"], default: false },
  outlet: [{ type: mongoose.Schema.Types.ObjectId, ref: "Outlet", required: [true, "Please enter an outlet"] }],
  del_status: { type: Boolean, default: true }
});

export const FoodCombo = mongoose.model("FoodCombo", foodComboSchema);