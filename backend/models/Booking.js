import mongoose from "mongoose";

const serviceItemSchema = new mongoose.Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { _id: false }
);

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    services: {
      type: [serviceItemSchema],
      validate: (v) => v.length > 0,
    },
    totalPrice: { type: Number, required: true },
    car: {
      make: { type: String, required: true, trim: true },
      model: { type: String, required: true, trim: true },
      year: { type: Number },
      plate: { type: String, required: true, trim: true, uppercase: true },
    },
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    notes: { type: String, trim: true, default: "" },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "In Progress", "Completed", "Cancelled"],
      default: "Pending",
    },
    mechanic: { type: String, default: "" },
    finalBill: { type: Number, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);