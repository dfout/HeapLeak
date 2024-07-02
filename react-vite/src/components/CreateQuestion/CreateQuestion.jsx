// import { useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./CreateQuestion.css";
import { useState } from "react";
// import { createQuestionThunk } from "../../redux/question";
import { enumTags } from "./tags";

const CreateQuestion = () => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [tags,setTags] = useState([])


  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDiscard = () => {
    navigate("/");
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    const question = {
      title,
      body,
      tags,
    };
    // dispatch(CreateQuestion(question));
    console.log(question)
    setTitle("");
    setBody("");
    setTags([]);
  };


  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="question-form">
        <h2>Create a Question</h2>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <label htmlFor="problem">Problem:</label>
        <textarea id="problem" name="problem" value={body} onChange={(e) => setBody(e.target.value)}></textarea>
        <div className="tags">
          <h3>Tags:</h3>
          <ul id="tag-list">
            {Object.values(enumTags).map((tag) => (
              <li key={tag}>
                <input type="checkbox"
                />
                <label>{tag}</label>
              </li>
            ))}

          </ul>
        </div>
        <button type="button" onClick={handleDiscard} id="discard-btn">
          Discard
        </button>
        <button type="submit" id="discard-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateQuestion;
