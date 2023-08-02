import mongoose from "mongoose";


const inventoryStockSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: [30, "Stock name should have less than 30 charcters"],
    minLength: [3, "Stock name should have more than 3 character"],
    required: [true, "please enter Stock Name"],
    unique: true,
    trim: true,
  },

  description: {
    type: String,
    maxlength: [200, "Stock description should have less than 200 charcters"],
    trim: true,
  },
  createdBy: {
    type: String,
    maxlength: [30, "Person name should have less than 30 charcters"],
    minLength: [3, "Person name should have more than 3 character"],
    trim: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  // outlet: {
  //   type: String,
  //   ref: "Outlet",
  // },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const inventoryStock = mongoose.model(
  "inventoryStock",
  inventoryStockSchema
);
