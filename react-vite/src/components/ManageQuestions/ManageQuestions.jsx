import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getQuestionsThunk } from "../../redux/question";
import "./ManageQuestions.css";



const ManageQuestions = () => {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions)
  const user = useSelector((state) => state.session.user)
  const [deleted, setDeleted] = useState(false);
  //console.log((user.id))

  useEffect(() => {
    dispatch(getQuestionsThunk());

  }, [dispatch, deleted])

  return (
      <div className="manage-questions-container">
        <div id="questions-overview">
          <h2>All Questions</h2>
          <h3>2 Questions</h3>
        </div>
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

      </div>

  );
};

export default ManageQuestions;
