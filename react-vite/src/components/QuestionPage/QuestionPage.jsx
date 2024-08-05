import { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./QuestionPage.css";
import { getOneQuestionThunk } from "../../redux/question";
import { useParams } from "react-router-dom";
import { createOneAnswer } from "../../redux/answer";
import { saveQuestionThunk, userSavedThunks } from "../../redux/save";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";

const Questions = () => {
  const { questionId } = useParams();
  const dispatch = useDispatch();
  const question = useSelector((state) => state.questions[questionId]);
  const [canAnswer, setCanAnswer] = useState(true)
  const user = useSelector((state) => state.session.user);
  const [body, setBody] = useState("");
  const [block, setBlock] = useState(false);
  const [errors, setErrors] = useState({});
  const [answerOwnerIds, setOwnerIds] = useState([]);

  const [isSaved, setIsSaved] = useState(false)
  const userSaves = useSelector((state) => state.saves)

  //answer block validator
  useEffect(() => {
    let ansErr = {}
    if (body.length < 20) {
      ansErr.body = "Answer must be at least 20 characters long!"

      setBlock(true);
    }
    else if (body.length > 2000) {
      ansErr.body = "Answer cannot be more than 2000 characters long!"

      setBlock(true);
    } else setBlock(false);

    setErrors(ansErr);
  }, [body])

  // const navigate = useNavigate();
  useEffect(() => {
    if (userSaves[questionId]) {
      setIsSaved(true)
    } else {
      setIsSaved(false)
    }
  }, [isSaved, userSaves, questionId])


  const abilityCheck = () => {
    if (question && user && question?.Answers && question.Answers.length) {
      let answers = Object.values(question.Answers)
      let arr = []
      for (let answer of answers) {
        if (!arr.includes(answer.ownerId)) {
          arr.push(answer.ownerId)
        }
      }
      setOwnerIds(arr)
    }
  };
  useEffect(() => {
    // if (questionId) {
    dispatch(getOneQuestionThunk(questionId));
    dispatch(userSavedThunks())
    // }
  }, [dispatch, questionId, canAnswer]);

  const handleSave = async (e, question) => {
    e.preventDefault();
    setIsSaved(true)
    await dispatch(saveQuestionThunk(question));
  };


  useEffect(() => {
    abilityCheck()
  }, [question])

  async function sendAnswerSubmit(e) {
    e.preventDefault()
    const payload = {
      body: body
    }
    let data = await dispatch(createOneAnswer(payload, questionId))
    if (data?.errors) {
      setErrors(data.errors)
    } else {
      setCanAnswer(false)
    }
  }



  // THE WE NEED TO GRAB USER SAVE QUESTIONS AND THEN COMPARE RECEIPTS SEE IF THE CURRENT QUESTION EXISTS IN THE ARR OR OBJ / DATA .
  return (
    <div id="display-body">
      {question ? (
        <div className="display-question-container">
          <div id="display-question-button">

            <div className="display-main-question">
              <h1 className="display-question">{question.title}</h1>
              <p className="display-author">{question.author}</p>
              <div className="display-dates">{question.timeUpdated}</div>
              <div className="display-body">
                <p>{question.body}</p>
              </div>
              <div className="display-question-bottom">
                <div className="display-tags-display">
                  {question.Tags.map((tag) => (
                    <p className="display-tag" key={tag.id}>{tag.tag}</p>
                  ))}
                </div>
                <div id="display-save-button">
                  {isSaved || !user
                    ?
                    !user ? null :
                      <FaBookmark size={32} color={'Blue'} />
                    :
                    <FaRegBookmark id="display-can-click" size={32} onClick={e => (handleSave(e, question))} />
                  }
                </div>
              </div>

            </div>
          </div>

          <div className="display-answers-containers">
            {question.Answers && question.Answers.map((answer) => (

              <div key={answer.id} className="display-answer-tile">
                <p>{answer.body}</p>
                <div id="display-user-info">
                  <span>{answer.timeUpdated}</span>

                  <span>{answer.author?.username}</span>
                </div>
              </div>
            ))}
            {
              user && question.ownerId != user.id && !answerOwnerIds.includes(user.id)
                ?
                (
                  <div className="display-write-answer">
                    <h3>Your Answer</h3>
                    <textarea
                      name="Answer"
                      className="texts"
                      id=""
                      rows="10"
                      cols="60"
                      value={body}
                      onChange={e => setBody(e.target.value)}
                    ></textarea>
                    <p className='errors'>{Object.values(errors).length ? "* " + errors.body : null}</p>
                    <div className="display-submit-btn">
                      <button className="display-submit" disabled={block} onClick={e => sendAnswerSubmit(e)}>Submit</button>
                    </div>
                  </div>
                ) : null
            }
          </div>
        </div>
      ) : (
        <div>
          <h1>Question not found !</h1>
        </div>
      )}
    </div>
  );
};

export default Questions;
