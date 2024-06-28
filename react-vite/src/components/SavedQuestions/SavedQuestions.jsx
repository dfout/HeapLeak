import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./SavedQuestions.css";

const SavedQuestions = () => {
  const dispatch = useDispatch();

  return (
<body>
    <div class="navbar">
        <div class="logo">HeapLeak</div>
        <div class="search">
            <p>About</p>
            <input type="search" placeholder="search" />
        </div>
        <div class="menu">
            <button type="submit">Menu</button>
        </div>
    </div>
    <div class="container">
        <div id="save-information">
            <h2>All Saves</h2>
            <h3>2 Saved Items</h3>
        </div>
    <div class="saved-questions">
        <div class = 'question-container'>
            <span>votes</span>
            <span id="question-title">Title</span>
            <span>Body</span>
            <span>Tags</span>
            <span>Author, date</span>
            <button>Remove</button>
        </div>
        <div class = 'question-container'>
            <span>votes</span>
            <span id="question-title">Title</span>
            <span>Body</span>
            <span>Tags</span>
            <span>Author, date</span>
            <button>Remove</button>
        </div>
    </div>
</div>
<div class="footer">
    <div class="links">
        <a href="https://github.com/withdrw">syed</a>
    </div>
    <div class="group-links">
        <a href="https://github.com/dfout">dfout</a>
    </div>
    <div class="group-links">
        <a href="https://github.com/dfout">zach</a>
    </div>
    <div class="group-links">
        <a href="https://github.com/dfout">kyle</a>
    </div>
</div>

</body>
  );
};

export default SavedQuestions;
