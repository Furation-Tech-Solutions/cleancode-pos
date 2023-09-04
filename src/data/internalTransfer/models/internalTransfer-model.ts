const mongoose = require("mongoose");

const StatusEnum = {
  PENDING: "Pending",
  APPROVED: "Approved",
  SHIPPED: "Shipped",
  DELIVERED: "Delivery",
  CANCELLED: "Cancelled",
};

const internalTransferSchema = new mongoose.Schema({
  sourceInventory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Inventory",
    required: true,
  },
  destinationInventory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Inventory",
    required: true,
  },
  deliveryAddress: {
    type: String,
    required: true,
    minlength: [5, "address should be atleast 5 Characters"],
    maxlength: [200, "address should be under 200 Characters"],
  },
  transferDate: {
    type: Date,
    required: true,
  },
  transferItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InventoryItem",
      required: true,
    },
  ],
  transferStatus: {
    type: String,
    enum: Object.values(StatusEnum),
    default: "pending",
  },
  description: {
    type: String,
    maxlength: [500, "description should be under 500 Characters"],
  },
});

export const InternalTransfer = mongoose.model("InternalTransfer",internalTransferSchema);


