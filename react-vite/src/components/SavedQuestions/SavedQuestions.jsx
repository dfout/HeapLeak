// import { useEffect } from "react";
// import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSavedQuestions } from "../../redux/question";
import { unSaveQuestion } from "../../redux/question";
import "./SavedQuestions.css";

const SavedQuestions = () => {
  const dispatch = useDispatch();
  const savedQuestions = useSelector((state)=>state.questions)

  useEffect(()=>{
    dispatch(getSavedQuestions())
  }, [dispatch])

  const handleUnSave = (id) => {
    dispatch(unSaveQuestion(id))
  }

  return (
<body>
    <div className="navbar">
        <div className="logo">HeapLeak</div>
        <div className="search">
            <p>About</p>
            <input type="search" placeholder="search" />
        </div>
        <div className="menu">
            <button type="submit">Menu</button>
        </div>
    </div>
    <div className="container">
        <div id="save-information">
            <h2>All Saves</h2>
            <h3>2 Saved Items</h3>
        </div>
    <div className="saved-questions">
        {savedQuestions && savedQuestions.forEach((question)=> (
                    <div className = 'question-container'>
                    <span id="question-title">{question.title}</span>
                    <span>{question.body}</span>
                    <div className='tags-container'>
                    {question.Tags.map((tag) => (
                  <p key={tag.id}>{tag.tag}</p>
                    ))}
                    </div>
                    <span>{question.author}</span>
                    <span>{question.date}</span>
                    <button onClick={handleUnSave(question.id)}>Unsave</button>
                </div>
        ))}
    </div>
</div>
<div className="footer">
    <div className="links">
        <a href="https://github.com/withdrw">syed</a>
    </div>
    <div className="group-links">
        <a href="https://github.com/dfout">dfout</a>
    </div>
    <div className="group-links">
        <a href="https://github.com/dfout">zach</a>
    </div>
    <div className="group-links">
        <a href="https://github.com/dfout">kyle</a>
    </div>
</div>

</body>
  );
};

export default SavedQuestions;
