const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); 
const bcrypt = require('bcrypt');

class User extends Model {
  checkPassword(loginPassword) {
    return bcrypt.compareSync(loginPassword, this.password);
  }
}

User.init(
  {
    // Define the columns of the User model
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    hooks: {
      // Hash the password before creating a new user
      beforeCreate: async (newUser) => {
        newUser.password = await bcrypt.hash(newUser.password, 10);
        return newUser;
      },
      // Hash the password before updating a user
      beforeUpdate: async (updatedUser) => {
        updatedUser.password = await bcrypt.hash(updatedUser.password, 10);
        return updatedUser;
      }
    },
    sequelize,
    underscored: true,
    modelName: 'user'
  }
);

module.exports = User;
