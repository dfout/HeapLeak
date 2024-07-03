import { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./QuestionPage.css";
import { getOneQuestionThunk } from "../../redux/question";
import { useNavigate, useParams } from "react-router-dom";
import { createOneAnswer } from "../../redux/answer";

const Questions = () => {
  const { questionId } = useParams();
  const dispatch = useDispatch();
  const question = useSelector((state) => state.questions[questionId]);
  const [canAnswer, setCanAnswer] = useState(false)
  const user = useSelector((state) => state.session.user)
  const [body, setBody] = useState('')
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const abilityCheck = () => {
    if (question && user) {
      if (question.ownerId === user.id) {
        setCanAnswer(false)
      } else {
        let able = true
        for (let answer in question.Answers) {
          if (answer.ownerId === user.id) {
            able = false;
            return
          }
        }
        setCanAnswer(able)
      }
    }
  }
  useEffect(() => {
    if (questionId) {
      dispatch(getOneQuestionThunk(questionId));
    }
  }, [dispatch, questionId]);

  useEffect(()=>{
    abilityCheck()
  }, [dispatch, canAnswer])


  async function sendAnswerSubmit(e){
    const payload = {
      body:body
    }
    let data = await dispatch(createOneAnswer(payload, questionId))
    if(data?.errors){
      console.log(data.errors)
      setErrors(data.errors)
    }else{
      setErrors({})
      setCanAnswer(false)
      // console.log("SUCCESS!!!!!!!!!!!!!!!!!!!!!!!!")
      // navigate(`/questions/${questionId}`)
    }
  }


  // console.log("->>>>>>>>>>>>>>>>>>>>>>>>>>>>>", questionId);

  return (
    <>
      {question ? (
        <div className="create-question-container">
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
          <div className="answers-container">
            <h2></h2>
            {question.Answers && question.Answers.map((answer) => (

              <div key={answer.id} className="answer-tile">
                <p>{answer.body}</p>
                <div id="user-info">
                  <span>{answer.timeUpdated}</span>

                  <span>{question.author}</span>
                </div>
              </div>
            ))}
            {
              canAnswer
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
                      <button className="submit" onClick={e => sendAnswerSubmit(e)}>Submit</button>
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
