

const GET_QUESTIONS = '/question/getAll'
const GET_ONE_QUESTION = '/question/getOne'
const DELETE_QUESTION = '/question/remove'
const CREATE_QUESTION = '/question/create'
const UPDATE_QUESTION = '/question/update'


const getQuestions = (questions) =>({
    type: GET_QUESTIONS,
    payload:questions
})

const getOneQuestion = (question) =>({
    type: GET_ONE_QUESTION,
    payload:question
})

const deleteQuestion = (id)=>({
    type:DELETE_QUESTION,
    payload:id
})

const createQuestion = (question) => ({
    type: CREATE_QUESTION,
    payload: question
})

const updateQuestion = (question) =>({
    type: UPDATE_QUESTION,
    payload: question
})




export const getQuestionsThunk = () => async (dispatch) =>{
    const response = await fetch("/api/questions/")
    if (response.ok) {
		const {Questions} = await response.json();
		dispatch(getQuestions(Questions));
    } else {
        const data = await response.json()
        return data.errors
    }
}


export const getOneQuestionThunk = (id) => async (dispatch) =>{
    const response = await fetch(`/api/questions/${id}`)
    if (response.ok) {
      const {Question} = await response.json();
      dispatch(getOneQuestion(Question));
    } else {
      const data = await response.json();
      return data.errors;
    }
}

export const deleteQuestionThunk = (id) => async(dispatch) =>{
    const response = await fetch(`/api/questions/${id}`, {
        method: "DELETE",
        // body: JSON.stringify({question})
    })
    if (response.ok) {
    const {Id} = await response.json();
      dispatch(deleteQuestion(Id));
    } else {
      const data = await response.json();
      return data.errors;
    }
}


export const createQuestionThunk = (question) => async(dispatch) =>{
    const response = await fetch(`/api/questions/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(question)
    })
    if (response.ok) {
      const {Question} = await response.json();
      await dispatch(createQuestion(Question));
      return Question.id
    } else {
      const data = await response.json();
      return data;
    }
}

export const updateQuestionThunk = (question, questionId) => async(dispatch) =>{
    const id = questionId
    const response = await fetch(`/api/questions/${id}`, {
        method: "PUT",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(question)
    })
    if (response.ok) {
      const {Question} = await response.json();
      dispatch(updateQuestion(Question));
    } else {
      const data = await response.json();
      return data.errors;
    }
}

export const getSavedQuestions = () => async (dispatch) => {
    const response = await fetch('/api/users/saves')
    if (response.ok) {
        const {Questions} = await response.json();
        await dispatch(getQuestions(Questions))
        return Questions
    }
}

export const unSaveQuestion = (id) => async (dispatch)=> {
    const response = await fetch(`/api/questions/saves/${id}`,{
        methods: 'DELETE',
        
    })
    if (response.ok) {
        const {Id} = await response.json();
          dispatch(deleteQuestion(Id));
        } else {
          const data = await response.json();
          return data.errors;
        }
}


const initialState = {}

const questionReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_QUESTIONS:{
            const newState = {};
            action.payload.forEach((question) => newState[question.id] = question)
            return newState
        }
        case GET_ONE_QUESTION:{
            const newState = {...state}
            const question = action.payload
            newState[action.payload.id] = question
            return {...newState}
        }
        case DELETE_QUESTION:{
            const newState = {...state,...state.questions}
            delete newState[action.payload]
            return {...newState}
        }
        case CREATE_QUESTION:{
            let newState = { ...state};
            newState[action.payload.id]= action.payload;
            return newState;
        }
        case UPDATE_QUESTION:{
            const newState = {...state}
            newState[action.payload.id] = {...action.payload}
            return {...newState}
        }
        default:
            return state
    }
}


export default questionReducer;
