import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getSavedQuestionsThunk, unSaveQuestionThunk } from "../../redux/save";
import "./SavedQuestions.css";


const SavedQuestions = () => {
  const dispatch = useDispatch();
  let savedQuestions = useSelector((state) => state.saves)

  savedQuestions = Object.values(savedQuestions)

  const navigate = useNavigate('')


  useEffect(() => {
    dispatch(getSavedQuestionsThunk())
  }, [dispatch])


  const handleUnSave = async (e, id) => {
    e.preventDefault()
    await dispatch(unSaveQuestionThunk(id))
  }

  const handleClick = (questionId) => {
    navigate(`/questions/${questionId}`)
  }


  return (
    <>
      {
        savedQuestions.length
          ?
          <div className="save-container">
            <div id="save-information">
              <h2>All Saves</h2>
              <h3>{savedQuestions.length} Saved Items</h3>
            </div>
            <div className="saved-questions">
              {savedQuestions.map((question) => (

                <div className='save-question-container' key={question.id}>
                  <p id="save-question-title" onClick={() => handleClick(question.id)}>{question.post.title}</p>
                  <span className="save-author">{question.post.author}</span>
                  <span>{question.post.body.length > 110 ? question.post.body.slice(0, 110) + "..." : question.post.body}</span>
                  <div className='save-tags-display'>
                    {question.post.Tags.map((tag) => (
                      <p className='save-tag' key={tag.id}>{tag.tag}</p>
                    ))}
                  </div>
                  <span>{question.post.timeUpdated.slice(5, 17)}</span>
                  <button className='unsave-button' onClick={e => handleUnSave(e, question.id)}>Unsave</button>
                </div>
              )
              )

              }
            </div>
          </div>
          :
          <div className="save-container-none">
            <div id="save-information">
              <h2>All Saves</h2>
            </div>
            <div className="saved-questions">
              <h1 className="center-align">You do not have any saves yet, go find some questions to save!</h1>
            </div>
          </div>

      }
    </>
  );
};

export default SavedQuestions;
