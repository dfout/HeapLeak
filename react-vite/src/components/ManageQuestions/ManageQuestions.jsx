import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getQuestionsThunk, deleteQuestionThunk } from "../../redux/question";
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

  const numProductsForPage = 4

  const parseNum = 3

  async function sortArrNow() {
    if (Object.values(questions).length) {
      let arr = []
      for (let question of Object.values(questions)) {
        if (searchTags.length) {
          for (let tag of searchTags) {
            for (let tag2 of question.Tags) {
              if (tag2.tag == tag && !arr.includes(question)) {
                if ((searchName && question.title.toLowerCase().includes(searchName.toLowerCase()) ||
                  (searchName && question.body.toLowerCase().includes(searchName.toLowerCase()))
                  || !searchName)) {
                  arr.push(question)
                }
                break
              } else if (tag2.tag == tag && arr.includes(question)) {
                break
              }
            }
          }
        } else {
          if ((searchName && question.title.toLowerCase().includes(searchName.toLowerCase()) ||
            (searchName && question.body.toLowerCase().includes(searchName.toLowerCase()))
            || !searchName)) {
            arr.push(question)
          }
        }
      }
      setPages(arr, currentPage)
    }
  }

  function setPages(arr, page = 1) {

    if (arr.length < 2) {
        setDisplay(arr)
        setPageNumbers([1])
        return
    }

    let val = arr.length / numProductsForPage;

    let arr2 = arr.slice((numProductsForPage * (page - 1)), numProductsForPage * page)
    setDisplay(arr2)

    let pageArr = []

    for (let i = 0; i < val; i++) {
        pageArr.push(i + 1)
    }

    setPageNumbers(pageArr)

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

  return (
    <>
      {
        userQuestions.length
          ?
          <div className="manage-questions-container">
            <div id="manage-questions-overview">
              <h2>Manage Questions</h2>
            </div>
            {<div className='manage-display-questions-container'>
              {userQuestions.map((question) => (
                <div className="manage-question-tile" key={question.id}>
                  <div className="manage-question-info" key={question.id}>
                    <NavLink className="manage-questionLink" to={`/questions/${question.id}`}><h1>{question.title}</h1></NavLink>
                    <p className="manage-author">{question.author}</p>
                    <p>{question.body}</p>
                    <div className="manage-tag-display">
                      {question.Tags.map((tag) => (
                        <p className="manage-tag" key={tag.id}>{tag.tag}</p>
                      ))}
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
    </>
  );
};

export default ManageQuestions;
