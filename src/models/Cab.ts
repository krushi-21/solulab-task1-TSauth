import mongoose, { Schema, model } from 'mongoose';

const CabSchema = new Schema(
  {
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
        required: true,
      },
      address: String,
      coordinates: {
        type: [Number],
        default: [0, 0],
      },
    },
    booked: {
      type: Boolean,
      default: false,
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);
CabSchema.index({ location: '2d' });
export default model('Cab', CabSchema);
