import mongoose from "mongoose";

const tableSchema = new mongoose.Schema({
  area_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Area",
    required: [true, "please enter area_id"],
  },
  outlet_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Outlet",
    required: [true, "please enter outlet_id"],
  },
  personName: {
    type: String,
    maxlength: [50, "Maximum 50 charcters are permitted"],
    minLength: [3, "name should have more than 3 character"],
    required: [true, "please enter name"],
    trim: true,
    // default: null,
    unique: true,
  },
  phone_number: {
    type: String,
    maxlength: [10, "Maximum 10 charcters are permitted"],
    minLength: [1, "phone_number should have more than 1 character"],
    required: [true, "please enter phone_number"],
    trim: true,
    unique: true,
  },
  sit_capacity: {
    type: Number,
    maxlength: [10, "Maximum 10 charcters are permitted"],
    minLength: [1, "sit_capacity should have more than 1 character"],
    required: [true, "please enter sit_capacity"],
    trim: true,
    default: null,
  },
  position: {
    type: String,
    maxlength: [50, "Maximum 50 charcters are permitted"],
    minLength: [3, "position should have more than 3 character"],
    required: [true, "please enter position"],
    trim: true,
    default: null,
  },
  description: {
    type: String,
    maxlength: [100, "Maximum 100 charcters are permitted"],
    trim: true,
    default: null,
  },
  del_status: {
    type: Boolean,
    default: true,
  },
});
export const Table = mongoose.model("Table", tableSchema);
