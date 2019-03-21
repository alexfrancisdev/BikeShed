const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
  message: {
    text: { type: String, required: true }
  },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  mechanic: { type: mongoose.Schema.ObjectId, ref: 'Mechanic', required: true },
  read: { type: Date }
},
{
  timestamps: true
})
