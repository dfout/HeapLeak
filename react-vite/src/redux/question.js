

const GET_QUESTIONS = '/question/getAll'
const GET_ONE_QUESTION = '/question/getOne'
const DELETE_QUESTION = '/question/remove'
const CREATE_QUESTION = '/question/create'
const UPDATE_QUESTION = '/question/update'


const getQuestions = (questions) =>({
    type: GET_QUESTIONS,
    payload:questions
})

const getOneQuestion = (id) =>({
    type: GET_ONE_QUESTION,
    payload:id
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
    const response = await fetch("/api/questions")
    if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return data.errors
		}

		dispatch(getQuestions(data));
	}
}


export const getOneQuestionThunk = (id) => async (dispatch) =>{
    const response = await fetch(`/api/questions/${id}`)
    if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return data.errors
		}

		dispatch(getOneQuestion(data));
	}
}

export const deleteQuestionThunk = (id) => async(dispatch) =>{
    const response = await fetch(`/api/questions/${id}`, {
        method: "DELETE",
        body: JSON.stringify({question})
    })
    if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return data.errors
		}

		dispatch(deleteQuestion(data));
	}
}


export const createQuestionThunk = (question) => async(dispatch) =>{
    const response = await fetch(`/api/questions`, {
        method: "POST",
        body: JSON.stringify({question})
    })
    if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return data.errors
		}

		dispatch(createQuestion(data));
	}
}

export const updateQuestionThunk = (question) => async(dispatch) =>{
    const {id} = question
    const response = await fetch(`/api/questions/${id}`, {
        method: "PUT",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({question})
    })
    if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return data.errors
		}

		dispatch(updateQuestion(data));
	}
}


const initialState = {}

const questionReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_QUESTIONS:{
            const newState = {...state.questions};
            action.questions.Questions.forEach((question) => newState[question.id] = question)
            return newState
        }
        case GET_ONE_QUESTION:{
            const newState = {...state}
            const question = action.question
            newState[action.question.id] = question
            return {...newState}
        }
        case DELETE_QUESTION:{
            const newState = {...state,...state.questions}
            delete newState[action.question.id]
            return {...newState}
        }
        case CREATE_QUESTION:{
            let newState = { ...state, [action.question.id]: action.question };
            return newState;
        }
        case UPDATE_QUESTION:{
            const newState = {...state}
            newState[action.question.id] = {...action.question}
            return {...newState}
        }
        default:
            return state
    }
}


export default questionReducer;