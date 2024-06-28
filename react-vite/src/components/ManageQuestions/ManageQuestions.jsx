import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./ManageQuestions.css";

const ManageQuestions = () => {
  const dispatch = useDispatch();

  return (
<body>
     <div class="navbar">
        <div class="logo">
            <a href="/Index.html">HeapLeak</a></div>
        <div class="search">
            <a href="/Index.html">About</a>
            <input type="search" placeholder="search" />
        </div>
        <div class="search">
            <a href="/Index.html">Create a question</a>
        </div>
    </div>
    <div class="container">
        <div id="answer-information">
            <h2>All Answers</h2>
            <h3>2 Answers</h3>
        </div>
        <div class="answer-contain">
            <div class="answer">
                <h1>Title</h1>
                <p>answers</p>
                <p>Body</p>
                <p class="tags">tags</p>
                <p class="author">author</p>
                <p>Date : July</p>
            </div>
            <div class="btn">
                <button class="update">
                    Update
                </button>
                <button class="update">
                    Delete
                </button>
            </div>
        </div>
    </div>
</body>
  );
};

export default ManageQuestions;
