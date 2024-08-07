import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { ImSpinner7 } from "react-icons/im";
import { getSavedQuestionsThunk, unSaveQuestionThunk } from "../../redux/save";
import "./SavedQuestions.css";


const SavedQuestions = () => {
  const dispatch = useDispatch();
  const savedQuestions = useSelector((state) => state.saves)

  const [display, setDisplay] = useState([])

  const navigate = useNavigate('')
  const [pageNumbers, setPageNumbers] = useState([])

  const [currentPage, setCurrentPage] = useState(1)
  const [loadingMain, setLoadMain] = useState(true)

  const numProductsForPage = 4

  const parseNum = 3

  async function sortArrNow() {
    if (Object.values(savedQuestions).length) {
      let arr = []
      for (let question of Object.values(savedQuestions)) {
        arr.push(question)
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


  useEffect(() => {
    dispatch(getSavedQuestionsThunk())
  }, [dispatch])

  useEffect(()=>{
    if (Object.values(savedQuestions).length){
      timeoutMain()
    }
  },[savedQuestions, currentPage])


  const handleUnSave = async (e, id) => {
    e.preventDefault()
    await dispatch(unSaveQuestionThunk(id))
  }

  const handleClick = (questionId) => {
    navigate(`/questions/${questionId}`)
  }


  return (
    <div className="placeholder">
      {
        loadingMain
        ?
        <ImSpinner7 className="spinner"/>
        :
        display.length
          ?
          <div className="save-container">
            <div id="save-information">
              <h2>All Saves</h2>
              <h3>{savedQuestions.length} Saved Items</h3>
            </div>
            <div className="saved-questions">
              {

              display.map((question) => (

                <div className='save-question-container' key={question.id}>
                  <p id="save-question-title" onClick={() => handleClick(question.id)}>{question.post.title}</p>
                  <span className="save-author">{question.post.author}</span>
                  <span>{question.post.body.length > 110 ? question.post.body.slice(0, 110) + "..." : question.post.body}</span>
                  <div className='save-tags-display'>
                    {question.post.Tags.map((tag, index) => {
                      if(index < 5){
                        return(
                      <p className='save-tag' key={tag.id}>{tag.tag}</p>
                        )
                      }
                    })}
                    {
                      question.post.Tags.length > 5
                      ?
                      <p className='save-tag'>+{question.post.Tags.length - 5} more</p>
                      :null
                    }
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

export default SavedQuestions;
