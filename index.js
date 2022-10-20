const express = require("express");
const mongoose = require("mongoose");
const dbconfig = require("./config/db.config");

const auth = require("./middlewares/auth");
const errors = require("./middlewares/errors");

const unless = require("express-unless");

const app = express();

mongoose.Promise = global.Promise;
mongoose
  .connect(dbconfig.db, {
    useNewurlparser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("Database ecta gahuwa");
    },
    (error) => {
      console.log("deiyane deiyane Database ecta gahagnna ba" + error);
    }
  );

auth.authenticateToken.unless = unless;

app.use(
  auth.authenticateToken.unless({
    path: [
      { url: "/users/login", methods: ["POST"] },
      { url: "/users/register", methods: ["POST"] },
    ],
  })
);

app.use(express.json());

app.use("./routes/users.routes");

app.use(errors.errorhandler);

app.listen(process.env.port || 4000, function () {
  console.log("gammac thama cudda !");
});
