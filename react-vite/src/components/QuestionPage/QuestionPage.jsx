import { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./QuestionPage.css";
import { getOneQuestionThunk } from "../../redux/question";
import {  useParams } from "react-router-dom";
import { createOneAnswer } from "../../redux/answer";
import {  saveQuestionThunk, userSavedThunks } from "../../redux/save";

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
    let ansErr ={}
    if (body.length < 20) {
      ansErr.body = "Answer must be at least 20 characters long!"

      setBlock(true);
    }
    if (body.length > 2000) {
      ansErr.body = "Answer cannot be more than 2000 characters long!"

      setBlock(true);
    }else setBlock(false);

    setErrors(ansErr);
  },[body])

  // console.log('-----------------------------------------------',(userSaves))
  // const navigate = useNavigate();
  useEffect(() => {
    if (userSaves[questionId]) {
      setIsSaved(true)
    } else {
      setIsSaved(false)
    }
  },[isSaved,userSaves, questionId])

  // console.log('-------------saved',isSaved)

  const abilityCheck = () => {
    if (question && user && question?.Answers && question.Answers.length) {
      let answers = Object.values(question.Answers)
      let arr = []
      for (let answer of answers){
        if(!arr.includes(answer.ownerId)){
          // console.log(answer)
          arr.push(answer.ownerId)
        }
      }
      // console.log(arr)
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
      body:body
    }
    let data = await dispatch(createOneAnswer(payload, questionId))
    if(data?.errors){
      console.log(data.errors)
      setErrors(data.errors)
    }else{
      setCanAnswer(false)
    }
  }

  // console.log("->>>>>>>>>>>>>>>>>>>>>>>>>>>>>", questionId);


  // THE WE NEED TO GRAB USER SAVE QUESTIONS AND THEN COMPARE RECEIPTS SEE IF THE CURRENT QUESTION EXISTS IN THE ARR OR OBJ / DATA .
  return (
    <>
      {question ? (
        <div className="create-question-container">
          {
            isSaved || !user  ?  (
                          <div className="main-question">
              <h1 className="question">{question.title}</h1>
              <div className="dates">{question.timeUpdated}</div>
              <div className="body">
                <p>{question.body}</p>
              </div>
              <div className ="tags-display">
                {question.Tags.map((tag) => (
                  <p className="tag"key={tag.id}>{tag.tag}</p>
              ))}
              </div>
            </div>
            ): (
          <div id="question-button">
            <div  id="save-button">
              <button onClick={e => (handleSave(e,question))} >Save</button>
            </div>
            <div className="main-question">
              <h1 className="question">{question.title}</h1>
              <div className="dates">{question.timeUpdated}</div>
              <div className="body">
                <p>{question.body}</p>
              </div>
              <div className="tags">
                {question.Tags.map((tag) => (
                  <p key={tag.id}>{tag.tag}</p>
                ))}
              </div>
            </div>
          </div>
            )
          }

          <div className="answers-container">
            <h2></h2>
            {question.Answers && question.Answers.map((answer) => (

              <div key={answer.id} className="answer-tile">
                <p>{answer.body}</p>
                <div id="user-info">
                  <span>{answer.timeUpdated}</span>

                  <span>{answer.author?.username}</span>
                </div>
              </div>
            ))}
            {
              user && question.ownerId != user.id && !answerOwnerIds.includes(user.id)
                ?
                (
                  <div className="write-answer">
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
                    <p>{errors.body}</p>
                    <div className="submit-btn">
                      <button className="submit" disabled={block} onClick={e => sendAnswerSubmit(e)}>Submit</button>
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
    </>
  );
};

export default Questions;
