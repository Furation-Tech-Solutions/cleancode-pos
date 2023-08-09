import mongoose from "mongoose";

const deliverypartnerSchema= new mongoose.Schema({
    name: {
        type: String,
        maxlength: [50, "Delivery Partner name should have less than 50 characters"],
        minlength: [3, "Delivery Partner name should have more than 3 characters"],
        required: [true, "Please enter delivery partner name"],
        trim: true
    },
    phone: {
        type: String,
        maxlength: [13, "Phone Number should have 13 charcters included country code"],
        minlength: [13, "Phone Number should have 13 charcters included country code"],
        required: [true, "Please enter phone number"]
    },
    address: {
        type: String,
        maxlength: [100, "Address should have less than 100 charcters"],
        minlength: [10, "Address should have more than 10 charcters"],
        required: [true, "Please enter address"]
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
})

export const Deliverypartner= mongoose.model("deliverypartner", deliverypartnerSchema)