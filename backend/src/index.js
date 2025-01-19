const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
    res.send('hello worls')
})

app.listen(port, () => {s
    console.log('server is ng in port: ', port)
})
