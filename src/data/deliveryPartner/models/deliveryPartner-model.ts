import mongoose from "mongoose";

const deliveryPartnerSchema = new mongoose.Schema({
  DeliveryPartner_name: { type: String, maxlength: [50, "Maximum 50 charcters are permitted"], minLength: [3, "DeliveryPartner_name should have more than 3 character"], required: [true, "please enter DeliveryPartner_name"], trim: true, default: null },
  email: { type: String, required: [true, "Please enter email"], trim: true, default: null, unique: true },
  phone: { type: Number, required: true },
  address: { type: String, maxlength: [100, "Maximum 100 charcters are permitted"], minLength: [5, "address should have more than 5 character"], required: [true, "please enter address"], trim: true, default: null },
  createdAt: { type: Date, default: Date.now },
  del_status: { type: Boolean, default: true }
});
export const DeliveryPartner = mongoose.model("DeliveryPartner", deliveryPartnerSchema);
