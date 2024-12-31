import React, { useEffect, useState, useContext } from "react";
import axios from "../../axiosConfig";
import QuestionDetail from "../QuestionDetail/QuestionDetail";
import "./Allquestion.css";
import { BiSearch } from "react-icons/bi";
import Layout from "../../Components/Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import { UserContext } from "../../Components/Dataprovide/DataProvider";

const token = localStorage.getItem("token");

function Homepage() {
  const {userData} = useContext(UserContext);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage] = useState(10); // Number of questions to display per page
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]); // State for suggestions

  const fetchQuestions = async () => {
    try {
      const response = await axios.get("/questions/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { userid: userData.userid },
      });
      setQuestions(response.data.questions);
    } catch (error) {
      // console.error(error);
    }
  };

  useEffect(() => {
    if (userData?.userid) {
      fetchQuestions();
    }
  }, [userData]);

  useEffect(() => {
    if (searchTerm) {
      const filteredSuggestions = questions.filter((question) =>
        question.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]); // Clear suggestions if search term is empty
    }
  }, [searchTerm, questions]);

  const handleDeleteQuestion = (questionid) => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((question) => question.questionid !== questionid)
    );
  };

  // Calculate current questions to display
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  // Calculate total pages
  const totalPages = Math.ceil(questions.length / questionsPerPage);
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
      <div className="container">
        <div className="homepage">
          <div className="head">
            <div className="row askque">
              <div className="col-md-6">
                <button className="qb" onClick={() => navigate("/question")}>
                  Ask Question
                </button>
              </div>
              <div className="col-md-6">
                <h4 className="wel text-md-end">
                  Welcome: {userData && userData.username}
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="ns">
          <h3 className="question_title">Questions</h3>
          <div className="search_box">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term
            />
            <span className="icon">
              <BiSearch />
            </span>
            <div className="border"></div>
          </div>
          {suggestions.length > 0 && (
            <ul className="suggestions">
              {suggestions.map((question, index) => (
                <li
                  key={index}
                  onClick={() => navigate(`/question/${question.questionid}`)}
                >
                  {question.title}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          {currentQuestions.map((question, i) => (
            <QuestionDetail
              question={question}
              key={i}
              onDelete={handleDeleteQuestion}
            />
          ))}
        </div>
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
      </div>
      <ToastContainer />
    </Layout>
  );
}

export default Homepage;
