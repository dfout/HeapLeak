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

      if (!title || !body || !tags) {
        console.error("Title, body, and tags are required");
        return;
      }


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
    navigate('/')
  };

  const manageTags = (e) => {
    console.log(`I have been clicked! my value is ${e.target.value}`)
    let arr = tags
    if(e.target.checked){
      arr.push(e.target.value)
    }else{
      let ind = arr.indexOf(e.target.value)
      if(ind == 0){
        arr = arr.slice(1)
      }else if(ind == arr.length-1){
        arr.pop()
      }else if (ind > 0){
        arr = arr.slice(0, ind).concat(arr.slice(ind+1))
      }
    }
    setTags(arr)
  }

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
                value={tag}
                onChange={e => manageTags(e)}
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
