import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./CreateQuestion.css";

const CreateQuestion = () => {
  const dispatch = useDispatch();

  return (


  <div className="container">
    <form className="question-form">
      <h2>Create a Question</h2>
      <label for="title">Title:</label>
      <input type="text" id="title" name="title" />
      <label for="problem">Problem:</label>
      <textarea id="problem" name="problem"></textarea>
      <label for="attempt">Attempt:</label>
      <input type="text" id="attempt" name="attempt" />
      <div className="tags">
        <h3>Tags:</h3>
        <input type="text" id="tag-input" placeholder="Add a tag" />
        <button type="button" id="add-tag">Add</button>
        <ul id="tag-list"></ul>
      </div>
      <button type="button" id="discard-btn">Discard</button>
    </form>
  </div>
  );
};

export default CreateQuestion;
