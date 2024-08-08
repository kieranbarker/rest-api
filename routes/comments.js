const express = require("express");
const { Comment, Post } = require("../models/index.js");

const router = express.Router();

router
  .route("/")
  .post(async (req, res) => {
    if (!req.body.name) {
      res.status(400).json({ error: "Missing comment name" });
      return;
    }

    if (!req.body.email) {
      res.status(400).json({ error: "Missing comment email" });
      return;
    }

    if (!req.body.body) {
      res.status(400).json({ error: "Missing comment body" });
      return;
    }

    if (!req.body.postId) {
      res.status(400).json({ error: "Missing comment postId" });
      return;
    }

    const post = await Post.findByPk(req.body.postId);

    if (!post) {
      res.status(400).json({ error: "Invalid postId" });
      return;
    }

    const comment = await post.createComment({
      name: req.body.name,
      email: req.body.email,
      body: req.body.body,
    });

    res.status(201).json(comment);
  })
  .get(async (req, res) => {
    const comments = await Comment.findAll();
    res.json(comments);
  });

router
  .route("/:commentId")
  .get(async (req, res) => {
    const comment = await Comment.findByPk(req.params.commentId);

    if (!comment) {
      res.status(404).json({ error: "Comment not found" });
      return;
    }

    res.json(comment);
  })
  .patch(async (req, res) => {
    let comment = await Comment.findByPk(req.params.commentId);

    if (!comment) {
      res.status(404).json({ error: "Comment not found" });
      return;
    }

    comment = await comment.update({
      name: req.body.name,
      email: req.body.email,
      body: req.body.body,
    });

    res.json(comment);
  })
  .delete(async (req, res) => {
    const comment = await Comment.findByPk(req.params.commentId);

    if (!comment) {
      res.status(404).json({ error: "Comment not found" });
      return;
    }

    await comment.destroy();
    res.status(204).send();
  });

module.exports = router;
