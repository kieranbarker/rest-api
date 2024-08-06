const { DataTypes, Model } = require("sequelize");
const sequelize = require("../sequelize.js");

class Comment extends Model {}

Comment.init(
  { name: DataTypes.TEXT, email: DataTypes.TEXT, body: DataTypes.TEXT },
  { sequelize, modelName: "comment" }
);

module.exports = Comment;
