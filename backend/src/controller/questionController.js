const { StatusCodes } = require("http-status-codes");
const questionService = require("../services/questionService");

// POST a new question
async function askQuestion(req, res) {
  const { title, description } = req.body;
  const userid = req.user.userid;

  if (!title || !description) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all required fields" });
  }

  try {
    const question = await questionService.createQuestion(
      userid,
      title,
      description
    );
    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "Question created successfully", question });
  } catch (error) {
    console.error(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "An unexpected error occurred" });
  }
}

// GET all questions
async function getAllQuestions(req, res) {
  try {
    const questions = await questionService.fetchAllQuestions();
    if (questions.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "No questions found." });
    }
    res.status(StatusCodes.OK).json({ questions });
  } catch (error) {
    console.error(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "An unexpected error occurred." });
  }
}

// GET a single question
async function getSingleQuestion(req, res) {
  const { questionid } = req.params;

  try {
    const question = await questionService.fetchSingleQuestion(questionid);
    if (!question) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "The requested question could not be found." });
    }
    res.status(StatusCodes.OK).json({ question });
  } catch (error) {
    console.error(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "An unexpected error occurred." });
  }
}

// DELETE a question
async function deleteQuestion(req, res) {
  const { questionid } = req.params;

  try {
    const result = await questionService.removeQuestion(questionid);
    if (result.affectedRows === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Question not found." });
    }
    res.status(StatusCodes.OK).json({ msg: "Question deleted successfully." });
  } catch (error) {
    console.error(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "An unexpected error occurred while deleting the question.",
    });
  }
}

module.exports = {
  askQuestion,
  getAllQuestions,
  getSingleQuestion,
  deleteQuestion,
};
