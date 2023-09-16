const mongoose = require("mongoose");

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

  transferDate: {
    type: Date,
    required: true,
  },

  del_status: {
    type: Boolean,
    default: true,
  },
});

export const InternalTransfer = mongoose.model("InternalTransfer",internalTransferSchema);


