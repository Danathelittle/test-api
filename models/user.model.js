const mongoose = require("mongoose");
const { schema } = mongoose;
const uniqueValidator = require("unique-validator");

const userschema = new schema({
  username: {
    type: string,
    required: true,
  },

  email: {
    type: string,
    required: true,
    Iunique: true,

  },
  password: {
    type: string,
    required: true,

  },
  date: {
    type: datetime,
    default: Date.now(),
  },


});

userschema.plugins(uniqueValidator, {Message: 'email is already in use'},);

const user = mongoose.model('User', userschema);
module.exports = user;