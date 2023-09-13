import mongoose from "mongoose";

const supplierDuePaymentOutletSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  supplier_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Supplier", required: [true, "Please enter supplier_id"] }], 
  amount: { type: Number },
  note: { type: String, maxlength: [200, "Maximum 200 charcters are permitted"], minLength: [3, "note should have more than 3 character"],  required: [true, "please enter note"], trim: true, default: null },
  staff_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Staff", required: [true, "Please enter staff_id"] }], 
  outlet_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Outlet", required: [true, "Please enter outlet_id"] }], 
  paymentMethod: { type: String, required: true },
  paymentStatus: { type: String, enum: ["pending", "done"], default: 'pending' },
  del_status: { type: Boolean, default: true }
});

export const SupplierDuePaymentOutlet = mongoose.model("SupplierDuePaymentOutlet", supplierDuePaymentOutletSchema);