import { useEffect, useState } from "react";
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
      <div className="home-body">
        {/* <div className="tags-container">{Object.values(tagsObj).map((tag) =>
          (
          <div key={tag} className="tagListItem" onClick={() => alert('Search feature coming soon!')}>{tag}</div>))}</div> */}
        <div className="home-all-questions-container">
          {Object.values(questions).map((question) => (
            <div key={question.id} className="home-question">
              <NavLink style={{textDecoration:'none'}}className = "home-questionLink" to={`/questions/${question.id}`}>
              <h1 className="home-title">{question.title}</h1>
              </NavLink>
              <p className="home-author">{question.author}</p>
              <p className="home-preview">{question.body.length > 110 ? question.body.slice(0,110)+ "...":question.body}</p>
              <div className ="home-tags-display">
                {question.Tags.map((tag) => (
                  <p className="home-tag"key={tag.id}>{tag.tag}</p>
              ))}
              </div>
              <p className="home-date">{question.timeUpdated.slice(5,17)}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Homepage;
