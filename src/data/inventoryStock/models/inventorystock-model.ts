import mongoose from "mongoose";

const inventorystockSchema= new mongoose.Schema ({
    company_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: [true, "Please enter companyId"]
    },
    inventory_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Inventory",
        required: [true, "Please enter inventory_id"]
    },
    item: {
        type: String,
        maxlength: [50, "Inventory stock item should have less than 50 characters"],
        minlength: [3, "Delivery Partner item should have more than 3 characters"],
        required: [true, "Please enter item name"],
        trim: true
    },
    total_qtn: {
        type: String,
        required: [true, "Please enter total quantity"]
    },
    flag: {
        type: String,
        required: [true, "Please enter flag"]
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
})

export const Inventorystock= mongoose.model("Inventorystock", inventorystockSchema);