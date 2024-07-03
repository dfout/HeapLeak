import {  NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getQuestionsThunk, deleteQuestionThunk } from "../../redux/question";
import "./ManageQuestions.css";

function filterById(questions, userId) {
  const result = [];
  for (const question in questions) {
      if (questions[question].ownerId === userId) {
          result[question] = questions[question];
      }
  }
  return result;
}

const ManageQuestions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const questions = useSelector((state) => state.questions)
  const userId = useSelector((state) => state.session.user.id)
  const [deleted, setDeleted] = useState(false);
  let userQuestions = filterById(questions, userId);
  console.log(userQuestions)



  const handleDelete = async (questionId) => {
    try {
      await dispatch(deleteQuestionThunk(questionId));
      setDeleted(!deleted)
    } catch (error) {
      console.error("Error deleting question:", error)
    }
  };
  useEffect(() => {
    dispatch(getQuestionsThunk());

  }, [dispatch, deleted])

  return (
    <>
      <div className="manage-questions-container">
        <div id="questions-overview">
          <h2>Manage Questions</h2>
        </div>
        {userQuestions.length === 0 ? (
        <div className="noQuestions">
          <NavLink to="/questions/create">Ask a Question</NavLink>
        </div>
        ) : (
            <div className='questions-container'>
              {userQuestions.map((question) => (
          <div className="question-tile" key={question.id}>
            <div className="question-info" key ={question.id}>
                    <h1>{ question.title}</h1>
                    <p>answers</p>
                    <p>{ question.body }</p>
                    <div>
                {question.Tags.map((tag) => (
                  <p key={tag.id}>{tag.tag}</p>
              ))}
              </div>
                    <p className="author">{ question.author}</p>
                    <p>Date : { question.timeUpdated}</p>
            </div>
            <div className="btn">
              <button className="update" onClick={() => navigate(`/questions/${question.id}/update`)}>Update</button>
              <button className="update" onClick={() => handleDelete(question.id)}>Delete</button>
            </div>
          </div>
                ))}
        </div>
      )}
      </div>
      </>
  );
};

export default ManageQuestions;
