import { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./QuestionPage.css";
import { getOneQuestionThunk } from "../../redux/question";
import { useParams } from "react-router-dom";

const Questions = () => {
  const { questionId } = useParams();
  const dispatch = useDispatch();
  const question = useSelector((state) => state.questions[questionId]);
  const [canAnswer, setCanAnswer] = useState(true)
  const user = useSelector((state) => state.session.user)
  const abilityCheck = () => {
    if (question && user) {
      if (question.ownerId === user.id) {
        setCanAnswer(false)
      } else {
        let able = true
        for (let answer in question.Answers) {
          if (answer.ownerId === user.id) {
            able = false;
            break;
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
    abilityCheck()
  }, [dispatch, questionId, canAnswer]);



  console.log("->>>>>>>>>>>>>>>>>>>>>>>>>>>>>", questionId);

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
                    ></textarea>
                    <div className="submit-btn">
                      <button className="submit">Submit</button>
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
