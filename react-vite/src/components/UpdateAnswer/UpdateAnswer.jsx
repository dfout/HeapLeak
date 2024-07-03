import { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//import "./QuestionPage.css";
import { getOneQuestionThunk } from "../../redux/question";
import { useNavigate, useParams } from "react-router-dom";
import { updateAnswerThunk } from "../../redux/answer";

const UpdateAnswer = () => {
  const { questionId } = useParams();
  const dispatch = useDispatch();
    const question = useSelector((state) => state.questions[questionId]);
    console.log(question)
    const answers = question.Answers;
    console.log(answers);
    const user = useSelector((state) => state.session.user);
    let userAnswer = {};
    for (let answer of answers) {
        if (answer.ownerId === user.id) {
            userAnswer = answer;
        }
    }
    console.log(userAnswer)


  const [body, setBody] = useState('')
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    if (questionId) {
      dispatch(getOneQuestionThunk(questionId))
    }
  }, [dispatch, questionId]);

  async function sendAnswerSubmit(e){
    const payload = {
        body: body,
        id: userAnswer.id
    }
    let data = await dispatch(updateAnswerThunk(payload))
    if(data?.errors){
      console.log(data.errors)
      setErrors(data.errors)
    }
    else {
        navigate(`/questions/${questionId}`)
      }
  }

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


              <div key={userAnswer.id} className="answer-tile">
                <p>{userAnswer.body}</p>
                <div id="user-info">
                  <span>{userAnswer.timeUpdated}</span>

                </div>
              </div>
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

export default UpdateAnswer;
