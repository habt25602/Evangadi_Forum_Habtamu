const dbConnection = require("../db/dbConfig");

const Question = {
  // Create a new question
  create: async (questionid, userid, title, description) => {
    const query =
      "INSERT INTO questions (questionid, userid, title, description) VALUES (?, ?, ?, ?)";
    const [result] = await dbConnection.query(query, [
      questionid,
      userid,
      title,
      description,
    ]);
    return result;
  },

  // Get all questions
  getAll: async () => {
    const query = `
      SELECT users.userid, users.username, questions.title, questions.questionid, questions.description, questions.createdAt 
      FROM users 
      JOIN questions ON users.userid = questions.userid 
      ORDER BY questions.createdAt DESC;`; // Order by created_at column

    const [questions] = await dbConnection.query(query);
    return questions;
  },

  // Get a question by ID
  getById: async (questionid) => {
    const query = `
      SELECT users.username, questions.title, questions.questionid, questions.description 
      FROM users 
      JOIN questions ON users.userid = questions.userid 
      WHERE questions.questionid = ?;`;

    const [question] = await dbConnection.query(query, [questionid]);
    return question.length ? question[0] : null; // Return null if not found
  },

  // Delete a question
  delete: async (questionid) => {
    const query = "DELETE FROM questions WHERE questionid = ?";
    const [result] = await dbConnection.query(query, [questionid]);
    return result;
  },
};

module.exports = Question;
