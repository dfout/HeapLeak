import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./ManageAnswers.css";

const ManageAnswers = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="container">
        <div id="answers-overview">
          <h2>All Answers</h2>
          <h3>2 Answers</h3>
        </div>
        <div className="answers-container">
          <div className="answer-tile">
            <div className="answer-info">
              <h1>Title</h1>
              <p>answers</p>
              <p>Body</p>
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
          <div className="answer-tile">
            <div className="answer-info">
              <h1>Title</h1>
              <p>answers</p>
              <p>Body</p>
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
          <div className="answer-tile">
            <div class="answer-info">
              <h1>Title</h1>
              <p>answers</p>
              <p>Body</p>
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
    </>
  );
};

export default ManageAnswers;
