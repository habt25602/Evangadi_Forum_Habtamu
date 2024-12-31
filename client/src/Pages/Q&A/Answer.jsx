import React, { useContext, useEffect, useState } from "react";
import DOMPurify from "dompurify"; // Import DOMPurify
import "./Answer.css";
import { BsPersonCircle } from "react-icons/bs";
import styles from "../Question/AskQuestions.module.css";
import Layout from "../../Components/Layout/Layout";
import { Link, useParams } from "react-router-dom";
import axiosBase from "../../axiosConfig";
import { TiArrowBack } from "react-icons/ti";
import { RxUpdate } from "react-icons/rx";
import { TbXboxXFilled } from "react-icons/tb";
import { MdOutlineDelete, MdEdit } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { UserContext } from "../../Components/Dataprovide/DataProvider";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
const token = localStorage.getItem("token");
const headerToken = { Authorization: `Bearer ${token}` };

function Answer() {
  const { questionid } = useParams();
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [editingAnswer, setEditingAnswer] = useState(null);
  const [updatedAnswer, setUpdatedAnswer] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [answersPerPage] = useState(10); // Number of questions to display per page

  const { userData } = useContext(UserContext);

  useEffect(() => {
    const fetchQuestionData = async () => {
      try {
        const response = await axiosBase.get(`questions/${questionid}`, {
          headers: headerToken,
        });
        setData(response.data.question);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching question: ", err);
        setIsLoading(false);
      }
    };

    fetchQuestionData();
  }, [questionid, headerToken]);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const response = await axiosBase.get(`/answers/${questionid}`, {
          headers: headerToken,
        });

        setAnswers(response.data.answers || []);
      } catch (err) {
        console.error("Error fetching answers: ", err);
      }
    };

    fetchAnswers();
  }, [questionid, headerToken, newAnswer, updatedAnswer]);

  const submitAnswer = async (e) => {
    e.preventDefault();
    if (newAnswer) {
      try {
        const response = await axiosBase.post(
          `/answers/`,
          {
            userid: userData?.userid,
            questionid: questionid,
            answer: newAnswer,
          },
          {
            headers: headerToken,
          }
        );

        const postedAnswer = {
          ...response.data,
          username: userData.username,
        };

        setAnswers((prevAnswers) => [...prevAnswers, postedAnswer]);
        setNewAnswer("");
        toast.success("Answer posted successfully!");
      } catch (error) {
        console.error("Error posting answer: ", error);
        toast.error("Failed to post the answer.");
      }
    }
  };

  const startEditing = (answer) => {
    setEditingAnswer(answer);
    setUpdatedAnswer(answer.answer);
  };

  const cancelEditing = () => {
    setEditingAnswer(null);
    setUpdatedAnswer("");
  };

  const updateAnswer = async (e) => {
    e.preventDefault();
    if (editingAnswer && updatedAnswer) {
      try {
        const response = await axiosBase.patch(
          `/answers/${editingAnswer.answerid}`,
          {
            answer: updatedAnswer,
          },
          {
            headers: headerToken,
          }
        );

        const updatedAnswerData = response.data;

        setAnswers((prevAnswers) =>
          prevAnswers.map((ans) =>
            ans.answerid === updatedAnswerData.answerid
              ? { ...ans, answer: updatedAnswerData.answer }
              : ans
          )
        );

        setEditingAnswer(null);
        setUpdatedAnswer("");
        toast.success("Answer updated successfully!");
      } catch (error) {
        console.error("Error updating answer: ", error);
        toast.error("Failed to update the answer.");
      }
    }
  };

  const deleteAnswer = async (answerId) => {
    try {
      await axiosBase.delete(`/answers/${questionid}`, {
        headers: headerToken,
        data: { answerid: answerId },
      });

      setAnswers((prevAnswers) =>
        prevAnswers.filter((answer) => answer.answerid !== answerId)
      );

      toast.success("Answer deleted successfully!");
    } catch (error) {
      console.error("Error deleting answer: ", error);
      toast.error("Failed to delete the answer.");
    }
  };

  const QuillModules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      ["link", "image"],
      ["clean"],
    ],
  };

  // Calculate current questions to display
  const indexOfLastAnswer = currentPage * answersPerPage;
  const indexOfFirstAnswer = indexOfLastAnswer - answersPerPage;
  const currentAnswers = answers.slice(indexOfFirstAnswer, indexOfLastAnswer);

  // Calculate total pages
  const totalPages = Math.ceil(answers.length / answersPerPage);
  // console.log("Total pages:", totalPages);

  // Pagination controls
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Layout>
      <div className="answer_container">
        <div className="answer_wrapper">
          <div className="answer_header">
            <span>Question</span>
          </div>
          <div className="answer_question">
            <h3>{data?.title}</h3>
          </div>
          <p>{data?.description}</p>

          <h2 className="answer_community">Answers From The Community</h2>
          {isLoading ? (
            <p>Loading answers...</p>
          ) : answers.length > 0 ? (
            currentAnswers.map((answer, i) => (
              <div key={i}>
                <div className="Answer">
                  <div className="answer_prof_pic">
                    <BsPersonCircle size={40} color="gray" />
                  </div>

                  <div className="answer_username">{answer?.username}</div>
                  <div
                    className="answer_text"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(answer?.answer),
                    }} // Render sanitized HTML
                  />
                  <div className="answer_actions">
                    {userData.username === answer.username && (
                      <>
                        <MdEdit
                          className="icon_edit"
                          onClick={() => startEditing(answer)}
                          size={20}
                        />
                        <MdOutlineDelete
                          className="icon_delete"
                          onClick={() => deleteAnswer(answer.answerid)}
                          size={20}
                        />
                      </>
                    )}
                  </div>
                </div>

                {editingAnswer &&
                  editingAnswer.answerid === answer.answerid && (
                    <div
                      className={styles.edit_form_overlay}
                      style={{ marginTop: "10px" }}
                    >
                      <form
                        onSubmit={updateAnswer}
                        className={styles.edit_form}
                      >
                        <ReactQuill
                          value={updatedAnswer}
                          onChange={setUpdatedAnswer}
                          modules={QuillModules}
                          theme="snow"
                        />
                        <button className="update_btn" type="submit">
                          <RxUpdate />
                        </button>
                        <button className="cancel_btn">
                          {" "}
                          <TbXboxXFilled onClick={cancelEditing} />
                        </button>
                      </form>
                    </div>
                  )}
              </div>
            ))
          ) : (
            <p>No answers available.</p>
          )}

        {/* Pagination Controls */}
        <div className="pagination-controls">
          <button onClick={prevPage} disabled={currentPage === 1}>
            <GrPrevious /> Previous
          </button>
          <span>
            <div className="page-numbers">
              {Array.from({ length: totalPages }, (_, index) => (
                <Link
                  key={index + 1}
                  onClick={() => goToPage(index + 1)}
                  className={currentPage === index + 1 ? "active" : ""}
                  style={{
                    textDecoration:
                      currentPage === index + 1 ? "underline" : "none",
                  }}
                >
                  {index + 1}
                </Link>
              ))}
            </div>
          </span>
          <button onClick={nextPage} disabled={currentPage === totalPages}>
            Next <GrNext />
          </button>
        </div>




          <div className={styles.question_form}>
            <h4 className={styles.question_post_your}>
              Contribute Your Answer to the Question Displayed Above
            </h4>

            <form onSubmit={submitAnswer}>
              <ReactQuill
                value={newAnswer}
                onChange={setNewAnswer}
                modules={QuillModules}
                theme="snow"
                placeholder="Your answer..."
              />
              <span className="page_btn">
                <button className={styles.question_button} type="submit">
                  Post Your Answer
                </button>
                <div className="question_page_btn">
                  <Link className={styles.question_post_link} to="/">
                    <TiArrowBack size={35} style={{ paddingRight: "10px" }} />
                    Go to Question Page
                  </Link>
                </div>
              </span>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
}

export default Answer;
