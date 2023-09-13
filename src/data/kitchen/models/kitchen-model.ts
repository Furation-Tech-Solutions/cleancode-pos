import mongoose from "mongoose";
 
const kitchenSchema = new mongoose.Schema({
    outletCode_byId: [{ type: mongoose.Schema.Types.ObjectId, required: [true, "Please enter outlet_code"]}],
    kitchen_code: { type: String, required: true, unique: true},
    kitchen_area: [{ type: mongoose.Schema.Types.ObjectId, ref: "Area", required: [true, "please enter kitchen area"] }],
    kitchen_name: { type: String, maxlength: [50, "Maximum 50 charcters are permitted"], minLength: [3, "Kitchen name should have more than 3 character"], required: [true, "please enter Kitchen Name"], unique: true, trim: true },
    createdBy: { type: Date, default: Date.now },
    del_status: { type: Boolean, default: true }
});
export const Kitchen = mongoose.model("Kitchen", kitchenSchema);