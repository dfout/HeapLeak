import { useEffect } from "react";
// import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Homepage.css";
import { getQuestionsThunk } from "../../redux/question";

const Homepage = () => {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions);

  useEffect(() => {
    dispatch(getQuestionsThunk());
  }, [dispatch]);

  return (
    <>
      <div className="body">
        <div className="tags-container">Tags</div>
        <div className="all-questions-container">
          {Object.values(questions).map((question) => (
            <div key={question.id} className="question">
              <h1 className="title">{question.title}</h1>
              <p className="preview">{question.content}</p>
              <p className="tags">{question.tags}</p>
              <p className="author">{question.author}</p>
              <p className="date">{question.createdAt}</p>
              <a href={`/questions/${question.id}`}>View Question</a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Homepage;
