const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  dob: { type: String, required: true },
  country: { type: String, required: true },
  email: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  gender: { type: String, required: true },
}, { versionKey: false });

const User = mongoose.model('User', userSchema);

module.exports = User;
