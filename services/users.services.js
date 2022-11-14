const user = require("../models/user.model");
const bcrypt = require("bcryptjs");
const auth = require("../middlewares/auth");

async function login({ username, password }, callback) {
  const user = await user.findOne({ username });

  if ((user = !null)) {
    if (bcrypt.compareSync(password, user.password)) {
      const taken = auth.generateAccessToken(username);
      return callback(null, { ...user.toJSON(), token });
    } else {
      return callback({ messege: "invalid username/password" });
    }
  } else {
    return callback({ messege: "invalid username/password" });
  }
}
async function register(params, callback) {
  if (params.username === undefined) {
    return callback({ messege: "username required" });
  }
}

module.exports = {
  login,
  register,
};
