const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); 
class Comment extends Model {}

Comment.init(
  {
    // Define the columns of the Comment model
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    // Foreign key for linking comments to posts
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'post',
        key: 'id'
      }
    },
    // Foreign key for linking comments to users
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    underscored: true,
    modelName: 'comment'
  }
);

module.exports = Comment;
