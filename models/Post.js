const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); 
class Post extends Model {}

Post.init(
  {
    // Define the columns of the Post model
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    // Foreign key for linking posts to users
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
    modelName: 'post'
  }
);

module.exports = Post;
