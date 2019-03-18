const mongoose = require('mongoose')

const serviceSchema = mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  mechanic: { type: mongoose.Schema.ObjectId, ref: 'Mechanic' }
})

serviceSchema.set('toJSON', {
  virtuals: true
})

module.exports = mongoose.model('Service', serviceSchema)
