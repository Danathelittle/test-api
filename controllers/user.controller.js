const bcryptjs = require("bcryptjs");
const userservice = require("../services/users.services");

exports.register = (req, res, next) => {
  const { password } = req.body;
  const salt = bcryptjs.gensalt(10);

  req.body.password = bcryptjs.hashSync(password, salt);

  userservice.register(req.body, (error, result) => {
    if (error) {
      return next(error);
    }

    return res.status(200).send({
      message: "success",
      data: result,
    });
  });
};

exports.login = (req, res, next) => {
  const { username, password } = req.body;

  userservice.login({ username, password }, (error, result) => {
    if (error) {
      return next(error);
    }

    return res.status(200).send({
      message: "success",
      data: result,
    });
  });
};

exports.userProfile = (req, res, next) => {
  return res.status(200).json({ message: "authorized User !" });
};
