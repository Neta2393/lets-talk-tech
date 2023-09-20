const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  // If a JawsDB URL is available, use it for database connection
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // If no JawsDB URL, use environment variables for local database connection
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3001
  });
}

module.exports = sequelize;
