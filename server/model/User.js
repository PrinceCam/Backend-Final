const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//const passport = require('passport');


const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

 module.exports = mongoose.model('User', userSchema);
