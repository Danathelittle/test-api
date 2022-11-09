const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt")

const userschema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    Iunique: true,

  },
  password: {
    type: String,
    required: true,

  },
  date: {
    type: Date,
    default: Date.now(),
  },


});

userschema.pre('save',async function(next){
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
})

userschema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
};


// userschema.plugin(uniqueValidator, {Message: 'email is already in use'},);

const user = mongoose.model('User', userschema);
module.exports = user;