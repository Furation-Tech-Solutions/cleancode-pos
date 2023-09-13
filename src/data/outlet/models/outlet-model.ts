import mongoose from "mongoose";

const outletSchema = new mongoose.Schema({
  company_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Company", required: [true, "Please enter company_id"] }], 
  outlet_code: { type: String, maxlength: [50, "Maximum 50 characters are permitted"], minLength: [1, "outlet_code should have more than 1 characters"], required: [true, "Please enter outlet_code"], trim: true, default: null, unique: true },
  address: { type: String, maxlength: [200, "Maximum 200 characters are permitted"], minLength: [5, "address should have more than 5 characters"], required: [true, "Please enter address"], trim: true, default: null },
  ownerName: { type: String, maxlength: [50, "Maximum 50 charcters are permitted"], minLength: [3, "ownerName should have more than 3 character"], required: [true, "please enter ownerName"], trim: true, default: null },
  gstNo: { type: String, maxlength: [16, "Maximum 16 characters are permitted"], minLength: [16, "gstNo should have less than 16 characters"], required: [true, "Please enter gstNo"], trim: true, default: null },
  outletType: { type: String, enum: { values: ["Kiosk", "Compact", "Standalone","Lounge"], message: "Value is not matched" } },
  brandLogo: { type: String, default: null },
  phone: { type: Number, min: [1000000000, "phone number should be equal to 10 digits"], max: [9999999999, "phone number should be equal to 10 digits"], required: [true, "Please enter phone"], default: null },
  createdAt: { type: Date, default: Date.now },
  del_status: { type: Boolean, default: true }
});

export const Outlet = mongoose.model("Outlet", outletSchema);
