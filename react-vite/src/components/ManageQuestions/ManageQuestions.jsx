import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getQuestionsThunk, deleteQuestionThunk } from "../../redux/question";
import "./ManageQuestions.css";

function filterById(questions, userId) {
  const result = {};
  for (const question in questions) {
      if (questions[question].ownerId === userId) {
          result[question] = questions[question];
      }
  }
  return result;
}

const ManageQuestions = () => {
  const dispatch = useDispatch();
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
        <div classname="noQuestions">
          <Navlink to="/questions/create">Ask a Question</Navlink>
        </div>
      ) : (
        <div className='questions-container'>
          <div className="question-tile">
            <div className="question-info">
              <h1>Title</h1>
              <p>answers</p>
              <p>question-body</p>
              <ul className='tile-tags-container'>
                <li className='tag-container'><Link className='tag-link'>tag</Link></li>
                <li className='tag-container'><Link className='tag-link'>tag</Link></li>
              </ul>
              <p className="author">author</p>
              <p>Date : July</p>
            </div>
            <div className="btn">
              <button className="update">Update</button>
              <button className="update">Delete</button>
            </div>
          </div>
          <div className="question-tile">
            <div className="question-info">
              <h1>Title</h1>
              <p>answers</p>
              <p>question-body</p>
              <ul className='tile-tags-container'>
                <li className='tag-container'><Link className='tag-link'>tag</Link></li>
                <li className='tag-container'><Link className='tag-link'>tag</Link></li>
              </ul>
              <p className="author">author</p>
              <p>Date : July</p>
            </div>
            <div className="btn">
              <button className="update">Update</button>
              <button className="update">Delete</button>
            </div>
          </div>
        </div>
      )}
      </div>
      </>
  );
};

export default ManageQuestions;
