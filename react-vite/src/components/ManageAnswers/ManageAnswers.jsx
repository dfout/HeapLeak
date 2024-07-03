// import { useEffect } from "react";
// import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./ManageAnswers.css";
import { useEffect, useState } from "react";
import { deleteAnswerThunk, myAnswers } from "../../redux/answer";

const ManageAnswers = () => {
  const dispatch = useDispatch();
  const answers = useSelector((state) => state.answers);
  const [deleted, setDeleted] = useState(false)

  useEffect(()=>{
    dispatch(myAnswers())
  },[dispatch, deleted])

  const handleDelete = async (questionId) => {
    try {
      await dispatch(deleteAnswerThunk(questionId));
      setDeleted(!deleted)
    } catch (error) {
      console.error("Error deleting question:", error)
    }
  };

  return (

      <div className="manage-answers-container">
        <div id="answers-overview">
          <h2>All Answers</h2>
          <h3>{Object.values(answers).length} Answers</h3>
        </div>
        <div className="answers-container">
          {Object.values(answers).length
          ?
          Object.values(answers).map((answer) => (
            <div className="answer-tile" key={answer.id}>
            <div className="answer-info">
              <NavLink className = "questionLink" to={`/questions/${answer.mainPost.id}`}><h1>{answer.mainPost.title}</h1></NavLink>
              <p className="author">{answer.mainPost.owner.username}</p>
              <p>{answer.body}</p>
              <p>Date : {answer.timeUpdated}</p>
            </div>
            <div className="btn">
              <button className="update">Update</button>
              <button className="update" onClick={() => handleDelete(answer.id)}>Delete</button>
            </div>
          </div>
          ) )
          :<h1>You have not made any answers! Go find an question and post your answer to it!</h1>}
        </div>
      </div>
  );
};

export default ManageAnswers;
