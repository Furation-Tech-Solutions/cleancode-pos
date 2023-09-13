const mongoose = require("mongoose");

const inventoryStockSchema = new mongoose.Schema({
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
      alertQuantity: {
        type: Number,
        required: true,
      },
      minimumQuantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

export const InventoryStock = mongoose.model("InventoryStock", inventoryStockSchema);


