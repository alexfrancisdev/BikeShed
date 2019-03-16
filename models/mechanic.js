const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const mechanicSchema = mongoose.Schema({
  username: String,
  email: String,
  phoneNumber: String,
  password: String,
  reviews: [{
    content: String,
    user: { type: mongoose.Schema.ObjectId, ref: 'User' }
  }, {
    timestamps: true
  }],
  photo: String,
  location: {
    lat: String,
    lng: String
  }
}, {
  timestamps: true
})

mechanicSchema.pre('save', function(){
  this.password = bcrypt.hashSync(this.password, 8)
})

mechanicSchema.methods.validatePassword = function(attemptedPassword){
  return bcrypt.compareSync(attemptedPassword, this.password)
}

mechanicSchema.set('toJSON', {
  virtuals: true
})

module.exports = mongoose.model('Mechanic', mechanicSchema)
