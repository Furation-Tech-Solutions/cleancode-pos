const mongoose = require("mongoose");

const purchaseItemSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: false,
  },
  inventoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Inventory",
    required: true,
  },
  items: [
    {
      itemName: {
        type: String,
        required: true,
      },
      totalQuantity: {
        type: Number,
        required: true,
      },
      unitOfMeasurement: {
        type: String,
        required: true,
      },
      supplierId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Supplier",
        required: true,
      },
    },
  ],
});

export const PurchaseItem = mongoose.model("PurchaseItem", purchaseItemSchema);