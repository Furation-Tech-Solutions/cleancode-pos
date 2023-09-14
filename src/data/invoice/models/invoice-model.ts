import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
  invoice_number: { type: String, maxLength: [16, "Phone number should be under 16 Number"], },
  outlet_id: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Outlet' }],
  inventory_id: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Inventory' }],
  dateTime: { type: Date, default: Date.now },
  items: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'RequisitionItem' }],
  subtotal: { type: Number, min: 0, default: 0 },
  tax_rate: { type: Number, min: 0, default: 0 },
  discount_amount: { type: Number, min: 0, default: 0 },
  total: { type: Number, min: 0, default: 0 },
  payment_method: { type: String, required: true, default: 'Online Payment', enum: ['Cash', 'Credit Card', 'Debit Card', 'Online Payment'], },
  payment_status: { type: String, required: true, default: 'Pending', enum: ['Pending', 'Paid', 'Partially Paid'] },
  del_status: { type: Boolean, default: true }
});

export const Invoice = mongoose.model("Invoice", invoiceSchema);
