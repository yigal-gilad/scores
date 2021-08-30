var mongoose = require('mongoose');

var schema = mongoose.Schema;

var userSchema = new schema({
    date: {
      type: String,
      required: [true, "date is reqiered"]
    },
    provider: {
      type: String,
      required: [true, "provider required"]
    },
    name: {
      type: String,
      min: [5, 'name length must be at least 5'],
      max: [20, 'name length cant be more then 20'],
      required: [true, "name cant be empty"]
    },
    email: {
      type: String,
      min: [10, 'email length must be at least 10'],
      max: [30, 'email length cant be more then 30'],
      required: [true, "email cant be empty"]
    },
    profileImg: {
      type: String,
      required: [true, "profileImg cant be empty"]
    },
    // password: {
    //   type: String,
    //   min: [8, 'password length must be at least 8'],
    //   max: [20, 'password length cant be more then 20'],
    //   required: [true, "password cant be empty"]
    // },
    // code: {
    //   type: String,
    //   min: [5, 'code length must be at least 5'],
    //   max: [5, 'code length cant be more then 5'],
    //   required: [true, "password cant be empty"]
    // },
    // isconfirmed: {
    //   type: Boolean,
    //   required: [true, "user must have a confirm boolean"]
    // },
    role: {
      type: String,
      required: [true, "user must have a role"]
    },
  //  gameId: {
  //     type: String,
  //     required: [true, "gameId required"]
  //   },
    mouneyBack: {
      type: Number,
      required: [true, "mouneyBack required"]
    },
    // isexist: {
    //   type: Boolean,
    //   required: [true, "user must have an existance value"]
    // },
    isbanned: {
      type: Boolean,
      required: [true, "user must have an is banned value"]
    },
  })
  
  var user = mongoose.model('User', userSchema, 'users');

  module.exports = user;