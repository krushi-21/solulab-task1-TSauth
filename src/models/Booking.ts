import mongoose, { Schema, model } from 'mongoose';

const CabBookingSchema = new Schema(
  {
    pickupAddress: {
      required: true,
      type: String,
    },
    dropAddress: {
      required: true,
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);
export default model('CabBooking', CabBookingSchema);
