const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require('./routes/index');
const bodyParser = require("body-parser");
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json())

routes(app);

mongoose
  .connect(`${process.env.MONGO_DB}`)
  .then(() => {
    console.log("connect DB is success!");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log("server is ng in port: ", port);
});
