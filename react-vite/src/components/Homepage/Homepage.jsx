import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Homepage.css";
import { getQuestionsThunk } from "../../redux/question";
import { enumTags } from "../CreateQuestion/tags";
import { IoIosSearch } from "react-icons/io";
import { ImSpinner7 } from "react-icons/im";
import { MdOutlineArrowDropDown } from "react-icons/md";

const Homepage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const questions = useSelector((state) => state.questions);

  const [sortedArr, setSortArr] = useState([])

  const [toDisplayArr, setDisplay] = useState([])

  const [tagArr, setTagArr] = useState(enumTags.map(() => false))

  const [searchTags, setTagSearch] = useState([])

  const [tagChangeBool, setTagChangeBool] = useState(false)

  const [searchName, setSearch] = useState('')

  const [loadingMain, setLoadMain] = useState(true)
  const [loadingPopular, setLoadPopular] = useState(true)

  const [drop, setDrop] = useState(false)

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
    dispatch(getQuestionsThunk());
  }, [dispatch]);

  useEffect(() => {
    setTagArr(enumTags.map((tag) => {
      return searchTags.includes(tag[1])
    }))
  }, [tagChangeBool])

  useEffect(() => {
    if (Object.values(questions).length) {
      timeoutMain()
    }
  }, [searchTags.length, questions, searchName, currentPage])

  const manageTags = (e) => {
    e.preventDefault()
    e.stopPropagation()
    let arr = searchTags
    if (e.target.checked) {
      arr.push(e.target.value)
    } else {
      let ind = arr.indexOf(e.target.value)
      if (ind == 0) {
        arr = arr.slice(1)
      } else if (ind == arr.length - 1) {
        arr.pop()
      } else if (ind > 0) {
        arr = arr.slice(0, ind).concat(arr.slice(ind + 1))
      }
    }
    setTagSearch(arr)
    setTagChangeBool(!tagChangeBool)
  }

  async function sortPopular() {
    let arr = Object.values(questions)

    arr.sort((a, b) => {
      if (a?.numSaves > b?.numSaves) {
        return -1
      } else if (a?.numSaves < b?.numSaves) {
        return 1
      } else {
        if (a.Answers.length > b.Answers.length) {
          return -1
        } else if (a.Answers.length < b.Answers.length) {
          return 1
        } else {
          let date1 = new Date(a.timeUpdated)
          let date2 = new Date(b.timeUpdated)

          if (date1 > date2) {
            return 1
          } else if (date1 < date2) {
            return -1
          } else {
            if (a.id > b.id) {
              return 1
            } else {
              return -1
            }
          }
        }
      }
    })
    setSortArr(arr.slice(0, 5))
  }

  function timeoutPopular() {
    var longLoadPopular = null

    if (longLoadPopular && !loadingPopular) {
      window.clearTimeout(longLoadPopular)
      longLoadPopular = false
    } else if (!longLoadPopular) {
      setLoadPopular(true)
      longLoadPopular = setTimeout(async () => {
        await sortPopular()
        setLoadPopular(false)
        return 'Sort Complete!'
      }, 3000)
    }
  }

  useEffect(() => {
    if (Object.values(questions).length) {
      timeoutPopular()
    }
  }, [questions])

  useEffect(() => {


    const eventListener = document.addEventListener("click", (e) => {
      e.stopPropagation()

      // console.log(e.target, Object.valuese.target.classList)
      // console.log(e.currentTarget, e.currentTarget.classList)



      if (!Object.values(e.target.classList).includes('filter-by') &&
        !Object.values(e.target.classList).includes('tagVisualFilterInput')
      ) {
        setDrop(false)

      }


    })

    return () => {
      document.removeEventListener("click", eventListener)
    }

  }, [])

  const handleDrop = () => {
    setDrop(!drop)
  }

  return (
    <>
      <div className="home-body">
        <div className="home-popularity">
          <h2>Popular questions</h2>
          <div className="home-popularity-holder">
            {
              loadingPopular ? <ImSpinner7 className="spinner" /> :
                sortedArr.map((question, index) => (
                  <div className="home-popularity-tile" key={index}>
                    <p className="popularity-link" onClick={() => navigate(`/questions/${question.id}`)}>{question.title}</p>
                  </div>
                ))
            }
          </div>
        </div>
        <div className="home-filter">
          <h2>Filter Tags</h2>
          <div className="home-filter-select">
            {
              enumTags.map((tag, index) => (
                <div key={index} className='tagVisualFilter'>
                  <input type='checkbox' className='tagVisualFilterInput' checked={tagArr[index]} value={tag[1]} onChange={e => manageTags(e)} />
                  <p>{tag[1]}</p>
                </div>
              ))
            }
          </div>
        </div>
        <div className="home-all-questions-container">
          <div className='search'>

            <div className='searchBarVisual'>
              <IoIosSearch />
              <input className='searchBar' type="search" value={searchName} onChange={e => setSearch(e.target.value)} />
            </div>
            <div className='filter-drop-cont'>

            </div>
            <button onClick={handleDrop} className='filter-by'>Filter by Topic<MdOutlineArrowDropDown /></button>
            {drop && (
              <div className='filter-drop-down'>
                <div className='filter-select'>

                  {enumTags.map((tag, index) => (
                    <div key={index} className='tagVisualFilter'>
                      <input className='tagVisualFilterInput' type='checkbox' checked={tagArr[index]} value={tag[1]} onChange={e => manageTags(e)} />
                      <p>{tag[1]}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {
            loadingMain ? <ImSpinner7 className="spinner" /> :
              toDisplayArr.map((question) => (
                <div key={question.id} className="home-question">
                  <NavLink style={{ textDecoration: 'none' }} className="home-questionLink" to={`/questions/${question.id}`}>
                    <h1 className="home-title">{question.title}</h1>
                  </NavLink>
                  <p className="home-author">{question.author}</p>
                  <p className="home-preview">{question.body.length > 110 ? question.body.slice(0, 110) + "..." : question.body}</p>
                  <div className="home-tags-display">
                    {question.Tags.map((tag) => (
                      <p className="home-tag" key={tag.id}>{tag.tag}</p>
                    ))}
                  </div>
                  <p className="home-date">{question.timeUpdated.slice(5, 17)}</p>
                  <p>Answers: {question.Answers.length}</p>
                </div>
              ))}
        </div>
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
    </>
  );
};

export default Homepage;
