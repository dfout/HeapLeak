import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Homepage.css";
import { getQuestionsThunk } from "../../redux/question";

let tagsObj = {android: "Android",
  flutter: "Flutter",
  swiftui: "SwiftUI",
  flask: "Flask",
  ansible: "Ansible",
  redis: "Redis",
  vuejs: "Vue.js",
  continuous_integration: "Continuous Integration",
  kubernetes: "Kubernetes",
  csharp: "C#",
  git: "Git",
  xamarin: "Xamarin",
  cybersecurity: "Cybersecurity",
  netbeans: "NetBeans",
  sql: "SQL"}

const Homepage = () => {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions);

  useEffect(() => {
    dispatch(getQuestionsThunk());
  }, [dispatch]);

  return (
    <>
      <div className="body">
        <div className="tags-container">{Object.values(tagsObj).map((tag) =>
          (
          <div key={tag} className="tagListItem" onClick={e => alert('Search feature coming soon!')}>{tag}</div>))}</div>
        <div className="all-questions-container">
          {Object.values(questions).map((question) => (
            <div key={question.id} className="question">
              <NavLink className = "questionLink" to={`/questions/${question.id}`}>
              <h1 className="title">{question.title}</h1>
              </NavLink>
              <p className="preview">{question.body}</p>
              <div>
                {question.Tags.map((tag) => (
                  <p key={tag.id}>{tag.tag}</p>
              ))}
              </div>
              <p className="author">{question.author}</p>
              <p className="date">{question.date}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Homepage;
