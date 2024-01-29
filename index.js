require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

// Basic Configuration
const port = process.env.PORT || 3000;

const urls = new Map();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/shorturl/:short_url", function (req, res) {
  if (urls.has(req.params.short_url)) {
    res.redirect(urls.get(req.params.short_url));
  } else {
    res.json({ error: "invalid url: shor_url does not exist" });
  }
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
