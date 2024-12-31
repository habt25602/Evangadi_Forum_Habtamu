const { StatusCodes } = require("http-status-codes");
const answerService = require("../services/answerService");

// POST a new answer
async function postAnswer(req, res) {
  const { questionid, answer } = req.body;
  const userid = req.user.userid; // Ensure this is set correctly
  const username = req.user.username; // Ensure this is set correctly
  
  if (!questionid || !answer) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please provide both question ID and answer" });
  }

  try {
    const newAnswer = await answerService.createAnswer(
      userid,
      questionid,
      answer
    );
    // Log the new answer details
    console.log("New answer created:", newAnswer);

    return res.status(StatusCodes.CREATED).json({
      message: "Answer posted successfully",
      answer: newAnswer, // Include the new answer details in the response
    });
  } catch (error) {
    console.error("Error posting answer:", error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
}

// GET answers for a specific question
async function getAnswersForQuestion(req, res) {
  const { questionid } = req.params;

  try {
    const answers = await answerService.getAnswersForQuestion(questionid);
    if (answers.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "No answers found for this question." });
    }
    return res.status(StatusCodes.OK).json({ answers });
  } catch (error) {
    console.error(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
}

// DELETE an answer
async function deleteAnswer(req, res) {
  const { questionid } = req.params;
  const { answerid } = req.body;
  const userid = req.user?.userid;

  if (!userid) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "User not authenticated." });
  }

  try {
    const deleteResult = await answerService.deleteAnswer(
      questionid,
      userid,
      answerid
    );
    if (deleteResult.affectedRows === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Answer not found or you don't have permission." });
    }
    return res
      .status(StatusCodes.OK)
      .json({ message: "Answer deleted successfully." });
  } catch (error) {
    console.error("Delete error: ", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
}

// UPDATE an answer
async function updateAnswer(req, res) {
  const { answerid } = req.params;
  const { answer } = req.body;

  if (!answer) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Answer text is required." });
  }

  try {
    const result = await answerService.updateAnswer(answerid, answer);
    if (result.affectedRows === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Answer not found." });
    }
    return res
      .status(StatusCodes.OK)
      .json({ message: "Answer updated successfully." });
  } catch (error) {
    console.error("Error updating answer:", error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
}

module.exports = {
  postAnswer,
  getAnswersForQuestion,
  deleteAnswer,
  updateAnswer,
};
