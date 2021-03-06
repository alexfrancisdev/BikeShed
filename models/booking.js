const mongoose = require('mongoose')

const bookingSchema = mongoose.Schema({
  service: { type: mongoose.Schema.ObjectId, ref: 'Service' },
  customer: { type: mongoose.Schema.ObjectId, ref: 'User' },
  details: String,
  extraFees: [{
    description: String,
    price: Number
  }],
  accepted: {type: Boolean, default: false},
  rejected: {type: Boolean, default: false},
  withMechanic: {type: Boolean, default: false},
  completed: {type: Boolean, default: false},
  collected: {type: Boolean, default: false}
}, { timestamps: true})

bookingSchema.set('toJSON', {
  virtuals: true
})

module.exports = mongoose.model('Booking', bookingSchema)
