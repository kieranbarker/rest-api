const sequelize = require("./sequelize.js");
const { Post, Comment } = require("./models/index.js");
const { posts, comments } = require("./data.json");

async function seed() {
  await sequelize.sync({ force: true });
  await Post.bulkCreate(posts);
  await Comment.bulkCreate(comments);
  console.log("Database seeded");
}

seed();
