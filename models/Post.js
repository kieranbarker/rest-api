const { DataTypes, Model } = require("sequelize");
const sequelize = require("../sequelize.js");

class Post extends Model {}

Post.init(
  { title: DataTypes.TEXT, body: DataTypes.TEXT },
  { sequelize, modelName: "post" }
);

module.exports = Post;
