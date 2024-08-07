import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getQuestionsThunk, deleteQuestionThunk } from "../../redux/question";
import { ImSpinner7 } from "react-icons/im";
import "./ManageQuestions.css";

function filterById(questions, userId) {
  const result = [];
  for (const question in questions) {
    if (questions[question].ownerId === userId) {
      result[question] = questions[question];
    }
  }
  return result;
}

const ManageQuestions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const questions = useSelector((state) => state.questions)
  let user = useSelector((state) => state.session.user)
  let userId=null
  if(user)userId = user.id
  const [deleted, setDeleted] = useState(false);
  let userQuestions = filterById(questions, userId);

  const [pageNumbers, setPageNumbers] = useState([])

  const [currentPage, setCurrentPage] = useState(1)

  const [loadingMain, setLoadMain] = useState(false)

  const numProductsForPage = 4

  const parseNum = 3

  async function sortArrNow() {
    if (Object.values(questions).length) {
      let arr = filterById(questions,userId)
      let arr2 = []
      for (let question of arr) {
        if(question?.id){
          arr2.push(question)
        }
      }
      setPages(arr2, currentPage)
    }
  }

  function setPages(arr, page = 1) {
    if (arr.length && arr.length < 2) {
        userQuestions = arr
        setPageNumbers([1])
        return
    }

    let val = arr.length / numProductsForPage;

    let arr2 = arr.slice((numProductsForPage * (page - 1)), numProductsForPage * page)
    userQuestions = arr2;
    let pageArr = []

    for (let i = 0; i < val; i++) {
        pageArr.push(i + 1)
    }

    setPageNumbers(pageArr)

    if(page > pageArr[pageArr.length-1]){
      setCurrentPage(pageArr[pageArr.length-1])
    }

}


  function timeoutMain() {
    var longLoadMain = null

    if (longLoadMain && !loadingMain) {
      window.clearTimeout(longLoadMain)
      longLoadMain = false
    } else if (!longLoadMain) {
      setLoadMain(true)
      setPageNumbers([])
      window.scrollTo({top:0, left:0, behavior:'instant'})
      longLoadMain = setTimeout(async () => {
        await sortArrNow()
        setLoadMain(false)
        return 'Sort Complete!'
      }, 2000)
    }
  }



  const handleDelete = async (questionId) => {
    try {
      await dispatch(deleteQuestionThunk(questionId));
      setDeleted(!deleted)
    } catch (error) {
      console.error("Error deleting question:", error)
    }
  };
  useEffect(() => {
    dispatch(getQuestionsThunk());

  }, [dispatch, deleted])

  useEffect(()=> {
    if(Object.values(questions).length){
      timeoutMain()
    }
  }, [questions, userId, currentPage])


  return (
    <div className="placeholder">
      {

        userQuestions.length
          ?
          <div className="manage-questions-container">
            <div id="manage-questions-overview">
              <h2>Manage Questions</h2>
            </div>
            {
              loadingMain?
              <ImSpinner7 className="spinner"/>
              :
              <div className='manage-display-questions-container'>
              {userQuestions.map((question) => (
                <div className="manage-question-tile" key={question.id}>
                  <div className="manage-question-info" key={question.id}>
                    <NavLink className="manage-questionLink" to={`/questions/${question.id}`}><h1>{question.title}</h1></NavLink>
                    <p className="manage-author">{question.author}</p>
                    <p>{question.body}</p>
                    <div className="manage-tag-display">
                      {question.Tags.map((tag, index) => {
                        if(index < 5){
                          return(
                            <p className="manage-tag" key={tag.id}>{tag.tag}</p>
                          )
                        }
                      })}
                      {
                        question.Tags.length > 5 ? <p className="manage-tag">+{question.Tags.length - 5} more</p>:null
                      }
                    </div>
                    <p>Date : {question.timeUpdated.slice(5, 17)}</p>
                  </div>
                  <div className="manage-btn">
                    <button className="manage-update" onClick={() => navigate(`/questions/${question.id}/update`)}>Update</button>
                    <button className="manage-update" onClick={() => handleDelete(question.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>}
          </div>
          :
          <div className="manage-questions-container-none">
            <div id="manage-questions-overview">
              <h2>Manage Questions</h2>
            </div>
            <div className='manage-display-questions-container'>
              <div className="manage-noQuestions">
                <NavLink to="/questions/create" className="manage-nav-link">Ask a Question</NavLink>
              </div>
            </div>
          </div>
      }
      <div className='paginationNav'>
        {
                pageNumbers.length && currentPage !== 1
                ?
                <p
                onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()
                    setCurrentPage(1)
                }}
                className='decoratorPageNums'
                >{'<<'}</p>
                :
                null
            }
            {
                pageNumbers.length && currentPage > 1
                ?
                <p
                onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()
                    setCurrentPage(currentPage-1)
                }}
                className='decoratorPageNums'
                >{'<'}</p>
                :
                null
            }
            {
                pageNumbers.map((number, index) => {
                    if (number >= currentPage -(parseNum-1) && number < currentPage + parseNum) {
                        return (
                            <p key={index}
                                onClick={e => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    setCurrentPage(number)
                                }}
                                className={number === currentPage ? 'Active':'inActive'}
                            >{number}</p>
                        )
                    }
                })
            }
            {
                pageNumbers.length && currentPage < pageNumbers[pageNumbers.length-1]
                ?
                <p
                onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()
                    setCurrentPage(currentPage+1)
                }}
                className='decoratorPageNums'
                >{'>'}</p>
                :
                null
            }
            {
                pageNumbers.length && currentPage !== pageNumbers[pageNumbers.length-1]
                ?
                <p
                onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()
                    setCurrentPage(pageNumbers[pageNumbers.length-1])
                }}
                className='decoratorPageNums'
                >{'>>'}</p>
                :
                null
            }

        </div>
    </div>
  );
};

export default ManageQuestions;
