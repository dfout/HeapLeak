// import { useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import { useDispatch} from "react-redux";
import "./Homepage.css";

const Homepage = () => {
//   const dispatch = useDispatch();

  

  return (
    <>
    <div className="body">
       <div className="tags-container">
           Tags
       </div>
        <div className="all-questions-container">
            <div className="question">
                <h1 className="title">Title</h1>
                <p className="preview">Body</p>
                <p className="tags">tags 1</p>
                <p className="author">Author 1</p>
                <p className="date">date 1</p>
            </div>
            <div className="question">
                <h1 className="title">Title</h1>
                <p className="preview">Body </p>
                <p className="tags">tags </p>
                <p className="author">Author </p>
                <p className="date">date </p>
            </div>
            <div className="question">
                <h1 className="title">Title</h1>
                <p className="preview">Body </p>
                <p className="tags">tags </p>
                <p className="author">Author </p>
                <p className="date">date </p>
            </div>
        </div>
    </div>
</>
  );
};

export default Homepage;
