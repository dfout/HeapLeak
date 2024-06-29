import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./CreateQuestion.css";

const CreateQuestion = () => {
  const dispatch = useDispatch();

  return (
    <body>
  <header>
    <div class="logo">
        <p>HeapLeak</p>
    </div>
    <div class="about">
      <span>About</span>
      <input type="text" placeholder="Search" />
    </div>
  </header>
  <div class="container">
    <form class="question-form">
      <h2>Create a Question</h2>
      <label for="title">Title:</label>
      <input type="text" id="title" name="title" />
      <label for="problem">Problem:</label>
      <textarea id="problem" name="problem"></textarea>
      <label for="attempt">Attempt:</label>
      <input type="text" id="attempt" name="attempt" />
      <div class="tags">
        <h3>Tags:</h3>
        <input type="text" id="tag-input" placeholder="Add a tag" />
        <button type="button" id="add-tag">Add</button>
        <ul id="tag-list"></ul>
      </div>
      <button type="button" id="discard-btn">Discard</button>
    </form>
  </div>
  <div class="footer">
    <ul>
          <li><a href="https://github.com/withdrw">Syed</a></li>
      <li><a href="https://github.com/zach-gold">Zach</a></li>
      <li><a href="https://github.com/dfout">Drew</a></li>
      <li><a href="https://github.com/pr55">Kyle</a></li>
    </ul>
  </div>
</body>
  );
};

export default CreateQuestion;
