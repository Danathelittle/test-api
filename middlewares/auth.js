const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authheader = req.headers("Authorization");
  const token = authheader && authheader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, "snippet_SecretKey", (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

function generateAccessToken(username) {
  return jwt.sign({ data: username }, "snippet_SecretKey", { expireIn: "1h" });
}

module.exports = {
  authenticateToken,
  generateAccessToken,
};
