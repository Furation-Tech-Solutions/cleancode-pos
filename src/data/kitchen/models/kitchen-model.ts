import mongoose from "mongoose";
 
const kitchenSchema = new mongoose.Schema({

    outlet_code: {
        type: String,
        maxlength: [50, "Maximum 50 characters are permitted"],
        minLength: [1, "outlet_code should have more than 1 characters"],
        required: [true, "Please enter outlet_code"],
        trim: true,
        default: null,
        unique: true,
      },
      kitchen_code: {
        type: String,
        maxlength: [50, "Maximum 50 characters are permitted"],
        minLength: [1, "kitchen_code should have more than 1 characters"],
        required: [true, "Please enter kitchen_code"],
        trim: true,
        default: null,
        unique: true,
      },
      kitchen_area: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Area",
        required: [true, "please enter kitchen area"],
      },
      kitchen_name: {
        type: String,
        maxlength: [50, "Maximum 50 charcters are permitted"],
        minLength: [3, "Kitchen name should have more than 3 character"],
        required: [true, "please enter Kitchen Name"],
        unique: true,
        trim: true,
      },
      // createdAt: {
      //   type: Date, 
      //   default: Date.now 
      //  },
       del_status: {
        type: String,
        enum: {
          values: ["Live", "Deleted"],
          message: "Value is not matched",
        },
        default: "Live",
      },
});
export const Kitchen = mongoose.model("Kitchen", kitchenSchema);