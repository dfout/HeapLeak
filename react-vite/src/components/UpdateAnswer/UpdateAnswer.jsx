import { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//import "./QuestionPage.css";
import { myAnswers } from "../../redux/answer";
import { useNavigate, useParams } from "react-router-dom";
import { updateAnswerThunk } from "../../redux/answer";

const UpdateAnswer = () => {
  const { questionId } = useParams();
  const dispatch = useDispatch();
    const answer = useSelector((state) => state.answers[questionId]);
    // const user = useSelector((state) => state.session.user);


  const [body, setBody] = useState(answer ? answer.body:'')
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    if (questionId) {
      dispatch(myAnswers())
    }
  }, [dispatch, questionId]);
  useEffect(() => {
    setBody(answer ? answer.body:'')
  }, [answer])

  async function sendAnswerSubmit(e){
    const payload = {
        body: body,
        id: answer.id
    }
    let data = await dispatch(updateAnswerThunk(payload))
    if(data?.errors){
      console.log(data.errors)
      setErrors(data.errors)
    }
    else {
        navigate(`/questions/${answer.mainPost.id}`)
      }
  }

  return (
    <>
      {answer ? (
        <div className="create-question-container">
          <div className="main-question">
            <h1 className="question">{answer.mainPost.title}</h1>
            <div className="dates">{answer.mainPost.timeUpdated}</div>
            <div className="body">
              <p>{answer.mainPost.body}</p>
            </div>
          </div>
          <div className="answers-container">
            <h2></h2>


              <div key={answer.id} className="answer-tile">
                <p>{answer.body}</p>
                <div id="user-info">
                  <span>{answer.timeUpdated}</span>

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
