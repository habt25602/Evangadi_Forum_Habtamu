import React, { useContext } from "react";
import { CgProfile } from "react-icons/cg";
import { MdOutlineDelete } from "react-icons/md";
import "./QuestionDetail.css";
import { useNavigate } from "react-router-dom";
import axiosBase from "../../axiosConfig";
import { IoIosArrowForward } from "react-icons/io";
import { toast } from "react-toastify";
import { UserContext } from "../../Components/Dataprovide/DataProvider";

function QuestionDetail({ question, onDelete }) {
  const { userData} = useContext(UserContext); 
  const navigate = useNavigate();

  const handleClick = () => {
    if (question?.questionid) {
      navigate(`/question/${question.questionid}`);
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (userData.username === question.username) {
      try {
        await axiosBase.delete(`/questions/${question.questionid}`, );
        toast.success("Question deleted successfully.");
        onDelete(question.questionid);
      } catch (error) {
        toast.error(
          "Failed to delete the question. Can't delete this question."
        );
      }
    } else {
      toast.error(
        "Editing is restricted as this question was posted by another user."
      );
    }
  };

  return (
    <div
      className="header_question"
      style={{ cursor: "pointer" }}
      onClick={handleClick}
    >
      <div className="question_user">
        <CgProfile className="profile" color="gray" />
        <div className="username">{question?.username}</div>
      </div>

      <div className="question_content">{question?.title}</div>
      <div className="question_arrow">
        {userData.username === question.username && (
          <div onClick={handleDelete}>
            <MdOutlineDelete
              style={{
                cursor: "pointer",
              }}
            />
          </div>
        )}
        <IoIosArrowForward />
      </div>
    </div>
  );
}

export default QuestionDetail;
