import mongoose from "mongoose";

const areaSchema = new mongoose.Schema({
  outletCode_byId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Outlet", required: [true, "please enter outlet_id"] }],
  area_name: { type: String, maxlength: [100, "Maximum 100 charcters are permitted"], minLength: [3, "area_name should have more than 3 character"], required: [true, "please enter area_name"], trim: true, unique: true },
  description: { type: String, maxlength: [200, "Maximum 200 charcters are permitted"], default: null, trim: true },
  createdBy: { type: Date, default: Date.now },
  phone: { type: Number, min: [1000000000, "phone number should be equal to 10 digits"], max: [9999999999, "phone number should be equal to 10 digits"],  required: [true, "Please enter phone"], default: null },
  del_status: { type: Boolean, default: true }
});

export const Area = mongoose.model("Area", areaSchema);
