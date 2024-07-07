// import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "../ManageQuestions/ManageQuestions.css";
import { useEffect, useState } from "react";
import { deleteAnswerThunk, myAnswers } from "../../redux/answer";

const ManageAnswers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const answers = useSelector((state) => state.answers);
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    dispatch(myAnswers())
  }, [dispatch, deleted])

  const handleDelete = async (questionId) => {
    try {
      await dispatch(deleteAnswerThunk(questionId));
      setDeleted(!deleted)
    } catch (error) {
      console.error("Error deleting question:", error)
    }
  };

  return (

    <>
      {
        Object.values(answers).length
        ?
        <div className="manage-questions-container">
      <div id="manage-questions-overview">
        <h2>All Answers</h2>
        <h3>{Object.values(answers).length} Answers</h3>
      </div>
      <div className='manage-display-questions-container'>
        {Object.values(answers).map((answer) => (
            <div className="manage-question-tile" key={answer.id}>
              <div className="manage-question-info">
                <NavLink className="manage-questionLink" to={`/questions/${answer.mainPost.id}`}><h1>{answer.mainPost.title}</h1></NavLink>
                <p className="manage-author">{answer.mainPost.owner.username}</p>
                <p>{answer.body}</p>
                <p>Date : {answer.timeUpdated.slice(5, 17)}</p>
              </div>
              <div className="manage-btn">
                <button className="manage-update" onClick={() => navigate(`/update-answer/${answer.id}`)}>Update</button>
                <button className="manage-update" onClick={() => handleDelete(answer.id)}>Delete</button>
              </div>
            </div>
          ))
          }
      </div>
    </div>
    :
    <div className="manage-questions-container-none">
      <div id="manage-questions-overview">
        <h2>All Answers</h2>
      </div>
      <h1>You have not made any answers! Go find a question and post your answer to it!</h1>
    </div>
      }
    </>
  );
};

export default ManageAnswers;
