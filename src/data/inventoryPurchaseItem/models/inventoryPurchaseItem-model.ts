import mongoose from "mongoose";

const inventoryPurchaseItemSchema= new mongoose.Schema({
    inventorypurchase_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "InventoryPurchase",
        required: [true, "Please enter inventoryPurchase_id"]
    },
    item: {
        type: String,
        maxlength: [50, "Inventory stock item should have less than 50 characters"],
        minlength: [3, "Delivery Partner item should have more than 3 characters"],
        required: [true, "Please enter item name"],
        trim: true
    },
    qtn: {
        type: String,
        required: [true, "Please enter total quantity"]
    },
    price: {
        type: String,
        required: [true, "Please enter total quantity"]
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
})

export const InventoryPurchaseItem= mongoose.model("InventoryPurchaseItem", inventoryPurchaseItemSchema);