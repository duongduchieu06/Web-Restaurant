const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require('./routes/index');
const cors = require('cors');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(cookieParser());

// Kết nối MongoDB
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
    throw err;
  });

console.log("MONGO_DB:", process.env.MONGO_DB);

// Định tuyến
routes(app);

// Handler 404
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Xóa đoạn app.listen vì không cần trong môi trường serverless của Vercel
if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log("Server is running on port:", port);
  });
}

module.exports = app;

console.log("MONGO_DB:", process.env.MONGO_DB);
console.log("ACCESS_TOKEN:", process.env.ACCESS_TOKEN);
console.log("REFRESH_TOKEN:", process.env.REFRESH_TOKEN);