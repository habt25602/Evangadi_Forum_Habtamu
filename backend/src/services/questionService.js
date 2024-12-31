const questionModel = require("../models/questionModel");
const { v4: uuidv4 } = require("uuid");

async function createQuestion(userid, title, description) {
  const questionid = uuidv4();
  return await questionModel.create(questionid, userid, title, description);
}

async function fetchAllQuestions() {
  return await questionModel.getAll();
}

async function fetchSingleQuestion(questionid) {
  return await questionModel.getById(questionid);
}

async function removeQuestion(questionid) {
  return await questionModel.delete(questionid);
}

module.exports = {
  createQuestion,
  fetchAllQuestions,
  fetchSingleQuestion,
  removeQuestion,
};
