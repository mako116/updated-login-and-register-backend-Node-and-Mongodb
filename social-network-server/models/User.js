const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  email: { type: String, unique: true },
  online: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);
