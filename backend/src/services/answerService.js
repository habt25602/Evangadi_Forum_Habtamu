const answerModel = require("../models/answerModel");

async function createAnswer(userid, questionid, answer) {
  return await answerModel.create(userid, questionid, answer);
}

async function getAnswersForQuestion(questionid) {
  return await answerModel.getAllForQuestion(questionid);
}

async function deleteAnswer(questionid, userid, answerid) {
  return await answerModel.delete(questionid, userid, answerid);
}

async function updateAnswer(answerid, answer) {
  return await answerModel.update(answerid, answer);
}

module.exports = {
  createAnswer,
  getAnswersForQuestion,
  deleteAnswer,
  updateAnswer,
};
