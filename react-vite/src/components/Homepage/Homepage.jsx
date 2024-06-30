import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Homepage.css";

const Homepage = () => {
  const dispatch = useDispatch();

  

  return (
    <body>
    <div class="body">
       <div class="tags-container">
           Tags
       </div>
        <div class="questions-container">
            <div class="question">
                <h1 class="title">Title</h1>
                <p class="preview">Body</p>
                <p class="tags">tags 1</p>
                <p class="author">Author 1</p>
                <p class="date">date 1</p>
            </div>
            <div class="question">
                <h1 class="title">Title</h1>
                <p class="preview">Body </p>
                <p class="tags">tags </p>
                <p class="author">Author </p>
                <p class="date">date </p>
            </div>
            <div class="question">
                <h1 class="title">Title</h1>
                <p class="preview">Body </p>
                <p class="tags">tags </p>
                <p class="author">Author </p>
                <p class="date">date </p>
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
            <a href="https://github.com/Zach-gold">zach</a>
        </div>
        <div class="group-links">
            <a href="https://github.com/dfout">kyle</a>
        </div>
    </div>
</body>
  );
};

export default Homepage;
