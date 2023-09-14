const mongoose = require("mongoose");

const StatusEnum = {
  PENDING: "Pending",
  APPROVED: "Approved",
  SHIPPED: "Shipped",
  DELIVERED: "Delivery",
  CANCELLED: "Cancelled",
};

const requisitionSchema = new mongoose.Schema({
  outletid: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Outlet",
    required: true,
  }],

  inventoryid: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Inventory",
    required: true,
  }],

  sender: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Staff",
    required: true,
  }],

  receiver: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Staff",
    required: true,
  }],

  requestDate: {
    type: Date,
    default: Date.now,
    required: true,
  },

  status: {
    type: String,
    enum: Object.values(StatusEnum),
    default: "pending",
  },

  description: {
    type: String,
    maxlength: [500, "description should be under 500 Characters"],
  },
});

export const Requisition = mongoose.model("Requisition", requisitionSchema);

