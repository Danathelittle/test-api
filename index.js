const express = require("express");
const mongoose = require("mongoose");
const dbconfig = require("./config/db.config");
const cookieParser = require('cookie-parser')

const auth = require("./middlewares/auth");
const errors = require("./middlewares/errors");

const unless = require("express-unless");

const {errorHandler} = require("./middlewares/errors")

const app = express();

const DB_URL = process.env.MONGO_URL;
mongoose.Promise = global.Promise;
mongoose
  .connect(DB_URL, {
    useNewurlparser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      app.listen(process.env.port || 3000, function () {
        console.log("gammac thama cudda !");
      });

    },
    (error) => {
      console.log("deiyane deiyane Database ecta gahagnna ba" + error);
    }
  );

// auth.authenticateToken = unless;

// app.use(
//   auth.authenticateToken.unless({
//     path: [
//       { url: "/users/login", methods: ["POST"] },
//       { url: "/users/register", methods: ["POST"] },
//     ],
//   })
// );

app.use(express.json());

app.use(cookieParser())

app.use(require("./routes/users.routes"));

// app.use("*",errorHandler);

