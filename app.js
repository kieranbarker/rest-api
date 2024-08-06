const express = require("express");
const { Post } = require("./models/index.js");

const app = express();
app.use(express.json());

app.post("/posts", async (req, res) => {
  if (!req.body.title) {
    res.status(400).json({ error: "Missing post title" });
    return;
  }

  if (!req.body.body) {
    res.status(400).json({ error: "Missing post body" });
    return;
  }

  const post = await Post.create({
    title: req.body.title,
    body: req.body.body,
  });

  res.status(201).json(post);
});

app.get("/posts", async (req, res) => {
  const posts = await Post.findAll();
  res.json(posts);
});

app.get("/posts/:id", async (req, res) => {
  const post = await Post.findByPk(req.params.id);

  if (!post) {
    res.status(404).json({ error: "Post not found" });
    return;
  }

  res.json(post);
});

app.patch("/posts/:id", async (req, res) => {
  let post = await Post.findByPk(req.params.id);

  if (!post) {
    res.status(404).json({ error: "Post not found" });
    return;
  }

  post = await post.update({
    title: req.body.title,
    body: req.body.body,
  });

  res.json(post);
});

app.delete("/posts/:id", async (req, res) => {
  const post = await Post.findByPk(req.params.id);

  if (!post) {
    res.status(404).json({ error: "Post not found" });
    return;
  }

  await post.destroy();
  res.status(204).send();
});

app.get("/posts/:id/comments", async (req, res) => {
  const post = await Post.findByPk(req.params.id);

  if (!post) {
    res.json([]);
    return;
  }

  const comments = await post.getComments();
  res.json(comments);
});

module.exports = app;
