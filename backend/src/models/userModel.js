const dbConnection = require("../db/dbConfig");

const User = {
  // Check if user exists
  findByUsernameOrEmail: async (username, email) => {
    return await dbConnection.query(
      "SELECT username, userid FROM users WHERE username = ? OR email = ?",
      [username, email]
    );
  },

  // Create a new user
  create: async (username, firstname, lastname, email, hashedPassword) => {
    return await dbConnection.query(
      "INSERT INTO users (username, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?)",
      [username, firstname, lastname, email, hashedPassword]
    );
  },

  // Find user by email
  findByEmail: async (email) => {
    return await dbConnection.query(
      "SELECT username, userid, password FROM users WHERE email = ?",
      [email]
    );
  },
};

module.exports = User;
