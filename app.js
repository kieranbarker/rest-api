const express = require("express");
const { comments, posts } = require("./routes/index.js");

const app = express();

app.use(express.json());
app.use("/posts", posts);
app.use("/comments", comments);

module.exports = app;
