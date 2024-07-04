// import { useEffect } from "react";
// import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "../CreateQuestion/CreateQuestion.css"
import { useEffect, useState } from "react";
import { getOneQuestionThunk, updateQuestionThunk } from "../../redux/question";
import { enumTags } from "../CreateQuestion/tags";

const UpdateQuestion = () => {
  const user = useSelector((state) => state.session.user)
  const { questionId } = useParams();
  const question = useSelector((state) => state.questions[questionId])
  const [title, setTitle] = useState(question?.title)
  const [body, setBody] = useState(question?.body)
  const [tags, setTags] = useState(question?.Tags)
  const [errors, setErrors] = useState({})
  const [tagArr, setTagArr] = useState(enumTags.map((tag) => false))
  const [updated, setUpdated] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getOneQuestionThunk(questionId))
  }, [questionId])

  async function notOwner() {
    navigate(`/questions/${questionId}`)
    alert('Please navigate to the manage questions page via the profile button to manage you page!')
  }

  const notLoggedIn = async () => {
    navigate(`/questions/${questionId}`)
    alert('Please navigate to manage questions once logged in!')
  }

  useEffect(()=>{
    if ((question && question?.ownerId && user && question.ownerId !== user.id)){
      notOwner()
    } else if(!user){
      notLoggedIn()
    }
    else {
      setTitle(question?.title)
    setBody(question?.body)
    setTags(question?.Tags.map(tag => tag.tag))
    if(question){
      setTagArr(enumTags.map((tag=>{
        if (tags && tags.includes(tag[1])){
          return true
        }
        return false
      })))
    }
    }
  }, [question])

  const manageTags = async (e) => {
    let arr = tags
    if (!arr.includes(e.target.value)) {
      arr.push(e.target.value)
    } else {
      let ind = arr.indexOf(e.target.value)
      if (ind == 0) {
        arr = arr.slice(1)
      } else if (ind == arr.length - 1) {
        arr.pop()
      } else if (ind > 0) {
        arr = arr.slice(0, ind).concat(arr.slice(ind + 1))
      }
    }
    setTags(arr)
    setUpdated(true)
  }

  useEffect(() => {
    if(question && updated){
      setTagArr(enumTags.map((tag=>{
        if (tags && tags.includes(tag[1])){
          return true
        }
        return false
      })))
      setUpdated(false)
    }
  }, [updated])

  const handleDiscard = () => {
    navigate("/manage-questions");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!title || !body || !tags) {
    //   console.error("Title, body, and tags are required");
    //   return;
    // }
    let allow = true

    const updatedQuestion = {
      title: title,
      body: body,
      tags: tags,
    };
    let id = await dispatch(updateQuestionThunk(updatedQuestion, questionId));
    if (id?.errors) {
      // console.log('The object!: ', id)
      // console.log("Errors were found!")
      setErrors(id.errors);
      allow = false;
    }
    // console.log(question)
    // setTitle("");
    // setBody("");
    // setTags([]);
    if (allow) {
      navigate(`/questions/${questionId}`)
    }
  };


  console.log(tags)
  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="question-form">
        <h2>Update a Question</h2>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        {Object.values(errors).length ? (<p>{errors.title}</p>) : null}
        <label htmlFor="problem">Problem:</label>
        <textarea id="problem" name="problem" value={body} onChange={(e) => setBody(e.target.value)}></textarea>
        {Object.values(errors).length ? errors.body : null}
        <div className="tags">
          <h3>Tags:</h3>
          <ul id="tag-list">
            {enumTags.map((tag,i) => {
              return (
                <li key={i}>
                  <input type="checkbox"
                    value={tag[1]}
                    onChange={e => {manageTags(e)}}
                    checked = {tagArr[i]}
                  />
                  <label>{tag[1]}</label>
                </li>
              )
            })}

          </ul>
        </div>
        {Object.values(errors).length ? errors.tags : null}
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

export default UpdateQuestion;
