// import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "../ManageQuestions/ManageQuestions.css";
import { useEffect, useState } from "react";
import { deleteAnswerThunk, myAnswers } from "../../redux/answer";

const ManageAnswers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const answers = useSelector((state) => state.answers);
  const [deleted, setDeleted] = useState(false)

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

  useEffect(() => {
    dispatch(myAnswers())
  }, [dispatch, deleted])

  const handleDelete = async (questionId) => {
    try {
      await dispatch(deleteAnswerThunk(questionId));
      setDeleted(!deleted)
    } catch (error) {
      console.error("Error deleting question:", error)
    }
  };

  return (

    <>
      {
        Object.values(answers).length
        ?
        <div className="manage-questions-container">
      <div id="manage-questions-overview">
        <h2>All Answers</h2>
        <h3>{Object.values(answers).length} Answers</h3>
      </div>
      <div className='manage-display-questions-container'>
        {Object.values(answers).map((answer) => (
            <div className="manage-question-tile" key={answer.id}>
              <div className="manage-question-info">
                <NavLink className="manage-questionLink" to={`/questions/${answer.mainPost.id}`}><h1>{answer.mainPost.title}</h1></NavLink>
                <p className="manage-author">{answer.mainPost.owner.username}</p>
                <p>{answer.body}</p>
                <p>Date : {answer.timeUpdated.slice(5, 17)}</p>
              </div>
              <div className="manage-btn">
                <button className="manage-update" onClick={() => navigate(`/update-answer/${answer.id}`)}>Update</button>
                <button className="manage-update" onClick={() => handleDelete(answer.id)}>Delete</button>
              </div>
            </div>
          ))
          }
      </div>
    </div>
    :
    <div className="manage-questions-container-none">
      <div id="manage-questions-overview">
        <h2>All Answers</h2>
      </div>
      <h1>You have not made any answers! Go find a question and post your answer to it!</h1>
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

export default ManageAnswers;
