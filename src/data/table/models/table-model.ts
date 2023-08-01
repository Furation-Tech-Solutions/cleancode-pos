import mongoose from "mongoose";

const tableSchema = new mongoose.Schema({
  personName: {
    type: String,
    maxlength: [50, "Maximum 50 charcters are permitted"],
    minLength: [3, "name should have more than 3 character"],
    required: [true, "please enter name"],
    trim: true,
    // default: null,
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
  table: {
    type: Boolean,
    default: true,
  },
  // del_status: {
  //   type: String,
  //   enum: {
  //     values: ["Live", "Deleted"],
  //     message: "Values is not matched",
  //   },
  //   default: "Live",
  // },
});
export const Table = mongoose.model("Table", tableSchema);
