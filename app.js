const express = require("express");
const { posts } = require("./routes/index.js");

const app = express();

app.use(express.json());
app.use("/posts", posts);

module.exports = app;
