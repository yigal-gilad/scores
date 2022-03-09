const mongoose = require('mongoose');

const schema = mongoose.Schema;

const userSchema = new schema({
  name: {
    type: String,
    unique: true,
    min: [5, 'name length must be at least 5'],
    max: [20, 'name length cant be more then 20'],
    required: [true, "name cant be empty"]
  },
  device_id: {
    type: String,
    unique: true,
    required: [true, "device_id cant be empty"]
  },
  score: {
    type: Number,
    required: [true, "score cant be empty"]
  },
})

const user = mongoose.model('User', userSchema, 'users');

module.exports = user;