const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const mechanicSchema = mongoose.Schema({
  username: { type: String, required: 'This field is required' },
  email: { type: String, required: 'This field is required' },
  password: { type: String, required: 'This field is required' },
  reviews: {
    content: String,
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    time: { type: Date, default: Date.now }
  },
  photo: String
});

mechanicSchema.pre('save', function(){
  this.password = bcrypt.hashSync(this.password, 8);
});

mechanicSchema.methods.validatePassword = function(attemptedPassword){
  return bcrypt.compareSync(attemptedPassword, this.password);
};

mechanicSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('Mechanic', mechanicSchema);
