const dbConnection = require("../db/dbConfig");
const Answer = {
  // Create a new answer
  create: async (userid, questionid, answer) => {
    const query =
      "INSERT INTO answers (userid, questionid, answer) VALUES (?, ?, ?)";
    const [result] = await dbConnection.query(query, [
      userid,
      questionid,
      answer,
    ]);
    return result;
  },

  // Get all answers for a specific question
  getAllForQuestion: async (questionid) => {
    const query = `
    SELECT users.username, answers.answer, answers.answerid 
    FROM users 
    JOIN answers ON answers.userid = users.userid 
    WHERE answers.questionid = ?
    ORDER BY answers.createdAt DESC`; // Adjust the column name as necessary

    const [answers] = await dbConnection.query(query, [questionid]);
    return answers;
  },

  // Delete an answer
  delete: async (questionid, userid, answerid) => {
    const query =
      "DELETE FROM answers WHERE questionid = ? AND userid = ? AND answerid = ?";
    const [result] = await dbConnection.query(query, [
      questionid,
      userid,
      answerid,
    ]);
    return result;
  },

  // Update an answer
  update: async (answerid, answer) => {
    const query = "UPDATE answers SET answer = ? WHERE answerid = ?";
    const [result] = await dbConnection.query(query, [answer, answerid]);
    return result;
  },
};

module.exports = Answer;
