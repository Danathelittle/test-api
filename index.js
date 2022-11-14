const express = require("express");
const mongoose = require("mongoose");
const dbconfig = require("./config/db.config");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const auth = require("./middlewares/auth");
const errors = require("./middlewares/errors");

const unless = require("express-unless");

const { errorHandler } = require("./middlewares/errors");

const app = express();
console.log(process.env.MONGO_URL);
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
        console.log("server running\ndatabase connected !");
      });
    },
    (error) => {
      console.log("database not conected" + error);
    }
  );

app.use(express.json());

app.use(cookieParser());

app.use(require("./routes/users.routes"));
