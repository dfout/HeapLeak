import { NavLink, useNavigate } from "react-router-dom";
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
      {
        userQuestions.length
          ?
          <div className="manage-questions-container">
            <div id="manage-questions-overview">
              <h2>Manage Questions</h2>
            </div>
            {<div className='manage-display-questions-container'>
              {userQuestions.map((question) => (
                <div className="manage-question-tile" key={question.id}>
                  <div className="manage-question-info" key={question.id}>
                    <NavLink className="manage-questionLink" to={`/questions/${question.id}`}><h1>{question.title}</h1></NavLink>
                    <p className="manage-author">{question.author}</p>
                    <p>{question.body}</p>
                    <div className="manage-tag-display">
                      {question.Tags.map((tag) => (
                        <p className="manage-tag" key={tag.id}>{tag.tag}</p>
                      ))}
                    </div>
                    <p>Date : {question.timeUpdated.slice(5, 17)}</p>
                  </div>
                  <div className="manage-btn">
                    <button className="manage-update" onClick={() => navigate(`/questions/${question.id}/update`)}>Update</button>
                    <button className="manage-update" onClick={() => handleDelete(question.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>}
          </div>
          :
          <div className="manage-questions-container-none">
            <div id="manage-questions-overview">
              <h2>Manage Questions</h2>
            </div>
            <div className='manage-display-questions-container'>
              <div className="manage-noQuestions">
                <NavLink to="/questions/create" className="manage-nav-link">Ask a Question</NavLink>
              </div>
            </div>
          </div>
      }
    </>
  );
};

export default ManageQuestions;
