const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
  service: { type: mongoose.Schema.ObjectId, ref: 'Service' },
  customer: { type: mongoose.Schema.ObjectId, ref: 'User' },
  timeOfBooking: { type: Date, default: Date.now },
  extraFees: {
    description: String,
    price: Number
  },
  accepted: Boolean,
  completed: {type: Boolean, default: false},
  collected: {type: Boolean, default: false}
});

module.exports = mongoose.model('Booking', bookingSchema);
