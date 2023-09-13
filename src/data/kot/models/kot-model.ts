import mongoose from "mongoose";

const kotSchema = new mongoose.Schema({
  kotNumber: {
    type: String,
    required: true,
    unique: true,
  },
  typeOfOrder: {
    type: String,
    enum: {
      values: ["Delivery", "Takeaway", "Table"],
      message: "Value is not matched",
    },
  },

  waiterName: {
    type: String,
    maxlength: [50, "Maximum 50 characters are permitted"],
    minlength: [3, "Name should have more than 3 characters"],
    required: [true, "Please enter waiter name"],
    trim: true,
    default: null,
  },

  table: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Table",
  },

  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },

  cookingStatus: {
    type: String,
    enum: {
      values: ["requested", "cooking", "done"],
      message: "Value is not matched",
    },
    default: "requested",
    trim: true,
  },

  items: [
    {
      foodItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FoodMenu",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
      customerComment: {
        type: String,
        default: null,
      },
    },
  ],

  customerCommentForAllFood: {
    type: String,
    default: null,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  delStatus: {
    type: String,
    enum: {
      values: ["Live", "Deleted"],
      message: "Values are not matched",
    },
    default: "Live",
  },
});

export const Kot = mongoose.model("Kot", kotSchema);
