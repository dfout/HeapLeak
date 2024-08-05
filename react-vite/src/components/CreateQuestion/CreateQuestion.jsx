 import { useEffect } from "react";
// import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./CreateQuestion.css";
import { useState } from "react";
import { createQuestionThunk } from "../../redux/question";
import { enumTags } from "./tags";

const CreateQuestion = () => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [tags, setTags] = useState([])
  const [manageTagBool, setManageTagBool] = useState(false);
  const [errors, setErrors] = useState({})


  const dispatch = useDispatch();
  const navigate = useNavigate();


 //this works, but the behavior for the tags is slightly buggy, will do a second pass later -Zach
  useEffect(() => {
    // Form validation logic
      const newErrors = {};
    if (title.length < 10) {
      newErrors.title = 'Title is required, and must be at least 10 Characters';
    }
    if (title.length > 200) {
      newErrors.title = 'Title must be less than 200 characters';
    }
    if (body.length < 20) {
      newErrors.body = 'Body is required, and must be at least 20 characters';
    }
    if (body.length > 2000) {
      newErrors.body = 'Body must be less than 2000 characters';
    }
    if (tags.length === 0) {
      newErrors.tags = 'At least one tag is required';
    }



      setErrors(newErrors);


  }, [title, body, tags, manageTagBool]);

  const handleDiscard = () => {
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

      // if (!title || !body || !tags) {
      //   console.error("Title, body, and tags are required");
      //   return;
      // }
    let allow = true

    const question = {
      title: title,
      body: body,
      tags: tags,
    };
    let id = await dispatch(createQuestionThunk(question)).catch(async (res)=> {
      const data = await res.json();
  });
    if(id?.errors){
      setErrors(id.errors);
      allow = false;
    }
    // setTitle("");
    // setBody("");
    // setTags([]);
    if(allow){
      navigate(`/questions/${id}`)
    }
  };

  const manageTags = (e) => {
    let arr = tags
    setManageTagBool(!manageTagBool);
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
    <div className="ask-container">
      <form onSubmit={handleSubmit} className="ask-question-form">
        <h2>Create a Question</h2>
        <label htmlFor="ask-title">Title:</label>
        <input type="text" id="ask-title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        {errors.title ? (<p className='errors'>{ "* " +errors.title}</p>) : null}
        <label htmlFor="problem">Problem:</label>
        <textarea id="ask-problem" name="problem" value={body} onChange={(e) => setBody(e.target.value)}></textarea>
        {errors.body ? (<p className='errors'>{ "* " +errors.body}</p>) : null}
        <div className="ask-tags">
          <h3>Tags:</h3>
          <ul id="ask-tag-list">
            {enumTags.map((tag) => (
              <li key={tag}>
                <input type="checkbox"
                value={tag[1]}
                onChange={e => manageTags(e)}
                />
                <label>{tag[1]}</label>
              </li>
            ))}

          </ul>
        </div>
        {errors.tags ? (<p className='errors'>{ "* " +errors.tags}</p>) : null}
        <button type="button" onClick={handleDiscard} id="ask-discard-btn">
          Discard
        </button>
        <button type="submit" disabled ={Object.values(errors).length ? true : false} id="ask-discard-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateQuestion;
