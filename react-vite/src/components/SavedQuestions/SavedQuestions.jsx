import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getSavedQuestionsThunk, unSaveQuestionThunk } from "../../redux/save";
import "./SavedQuestions.css";


const SavedQuestions = () => {
  const dispatch = useDispatch();
  let savedQuestions = useSelector((state)=>state.saves)

  savedQuestions = Object.values(savedQuestions)

  const navigate = useNavigate('')


  useEffect(()=>{
    dispatch(getSavedQuestionsThunk())
  }, [dispatch])


  const handleUnSave = async(e,id) => {
    e.preventDefault()
    await dispatch(unSaveQuestionThunk(id))
  }

  const handleClick = (questionId) => {
    navigate(`/questions/${questionId}`)
  }


  return (

    <div className="sqcontainer">
        <div id="save-information">
            <h2>All Saves</h2>
            <h3>{savedQuestions.length} Saved Items</h3>
        </div>
      <div className="saved-questions">
        {savedQuestions.length && savedQuestions.map((question) => {

            return(

                    <div className = 'question-container' key= {question.id}>
                    <p id="question-title" onClick={() => handleClick(question.id)}>{question.post.title}</p>
                    <span>{question.post.body}</span>
                    <div className='tags-display'>
                    {question.post.Tags.map((tag) => (
                  <p className='tag' key={tag.id}>{tag.tag}</p>
                    ))}
                    </div>
                    <span>{question.post.author}</span>
                    <span>{question.post.timeUpdated}</span>
                    <button onClick={e => handleUnSave(e, question.id)}>Unsave</button>
                </div>
            )
})}
    </div>
</div>

  );
};

export default SavedQuestions;
