const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  username: { type: String, required: 'This field is required' },
  email: { type: String, required: 'This field is required' },
  password: { type: String, required: 'This field is required' },
  reviews: {
    content: String,
    user: { type: mongoose.Schema.ObjectId, ref: 'Mechanic' },
    time: { type: Date, default: Date.now }
  },
  photo: String
});

userSchema.pre('save', function(){
  this.password = bcrypt.hashSync(this.password, 8);
});

userSchema.methods.validatePassword = function(attemptedPassword){
  return bcrypt.compareSync(attemptedPassword, this.password);
};

userSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('User', userSchema);
