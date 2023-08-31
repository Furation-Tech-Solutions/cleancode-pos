const mongoose = require("mongoose");

const StatusEnum = {
  PENDING: "Pending",
  APPROVED: "Approved",
  SHIPPED: "Shipped",
  DELIVERED: "Delivery",
  CANCELLED: "Cancelled",
};

const requisitionSchema = new mongoose.Schema({
  outletid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Outlet",
    required: true,
  },
  requisitionItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RequisitionItem",
      required: true,
    },
  ],
  requestedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
  requestDate: {
    type: Date,
    default: Date.now,
  },
  deliveryDate: {
    type: Date,
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
  deliveryaddress: {
    type: String,
    required: true,
    minlength: [5, "address should be atleast 5 Characters"],
    maxlength: [200, "address should be under 200 Characters"],
  },
  priority: {
    type: Boolean,
  },
  createdTimestamp: {
    type: Date,
    default: Date.now,
  },
  updatedTimestamp: {
    type: Date,
    default: Date.now,
  },
});

export const Requisition = mongoose.model("Requisition", requisitionSchema);

