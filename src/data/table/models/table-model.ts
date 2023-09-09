import mongoose from "mongoose";

const tableSchema = new mongoose.Schema({
  area_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Area", required: [true, "please enter area_id"] }],
  outletCode_byId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Outlet", required: [true, "please enter outlet_id"] }],
  tableNumber: { type: Number, required: true },
  seatingCapacity: { type: Number },
  description: { type: String, maxlength: [100, "Maximum 100 charcters are permitted"], trim: true, default: null },
  phone_number: { type: Number, required: [true, "please enter phone_number"], unique: true },
  del_status: { type: Boolean, default: true },
});
export const Table = mongoose.model("Table", tableSchema);
