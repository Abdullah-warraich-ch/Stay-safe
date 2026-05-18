import mongoose from 'mongoose';

const hostelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Hostel name is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
  },
  city: {
    type: String,
    required: [true, 'City is required'],
  },
  area: {
    type: String,
    required: [true, 'Area is required'],
  },
  address: {
    type: String,
    required: [true, 'Full address is required'],
  },

  price: {
    type: Number,
    // required: [true, 'Monthly price is required'],
  },
  mess: {
    available: { type: Boolean, default: false },
    price: { type: Number, default: 0 },
    compulsory: { type: Boolean, default: false }
  },
  hostelType: {
    type: String,
    enum: ['boys', 'girls', 'co-ed'],
    required: [true, 'Hostel type is required'],
  },
  amenities: [{
    type: String,
  }],
  images: [{
    url: { type: String, required: true },
    publicId: { type: String, required: true },
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  phone: {
    type: String,
    required: [true, 'Contact number is required'],
  },
  capacity: [{
    seater: { type: String },
    price: { type: Number }
  }],
  nearbyUniversities: [{
    type: String,
  }],
  tags: [{
    type: String,
  }],
  verified: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const Hostel = mongoose.models.Hostel || mongoose.model('Hostel', hostelSchema);

export default Hostel;
