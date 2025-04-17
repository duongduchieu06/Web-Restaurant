const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require('./routes/index');
const cors = require('cors')
// const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();
// const port = process.env.PORT || 3001;

app.use(cors())
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb'}))
app.use(cookieParser())

routes(app);

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

  if (process.env.NODE_ENV !== "production") {
    const port = process.env.PORT || 3001;
    app.listen(port, () => {
      console.log("Server is running on port:", port);
    });
  }
  console.log("hieu da o day")
// mongoose
//   .connect(`${process.env.MONGO_DB}`)
//   .then(() => {
//     console.log("connect DB is success!");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// app.listen(port, () => {
//   console.log("server is ng in port: ", port);
// });

module.exports = app;
