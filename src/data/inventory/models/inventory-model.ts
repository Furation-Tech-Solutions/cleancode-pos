const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  inventoryName: {
    type: String,
    required: true,
    minlength: [3, "inventoryName name should be atleast 3 Characters"],
    maxlength: [100, "inventoryName name should be under 100 Characters"],
    unique: true,
  },
  location: {
    type: String,
    required: true,
    minlength: [5, "address should be atleast 5 Characters"],
    maxlength: [200, "address should be under 200 Characters"],
  },
  description: {
    type: String,
    maxlength: [500, "description should be under 500 Characters"],
  },
  companyId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  }],
});

export const Inventory = mongoose.model("Inventory", inventorySchema);

