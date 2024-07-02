const GET_ANSWER = 'answer/getAnswers'
const CREATE_ANSWER = 'answer/createAnswer'
const UPDATE_ANSWER = 'answer/updateAnswer'
const DELETE_ANSWER = 'answer/deleteAnswer'



const getAll = (answers) => ({
    type: GET_ANSWER,
    payload: answers
})

const createOne = (answer) => ({
    type: CREATE_ANSWER,
    payload: answer
})

const updateAnswers = (answer) => ({
    type: UPDATE_ANSWER,
    payload:answer
})

const delAnswer = (id) => ({
    type: DELETE_ANSWER,
    payload: id
})


export const getAllAnswersThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/question/${id}/answer`)
    if (response.ok) {
        const {Answers} = await response.json();
        await dispatch(getAll(Answers))
        return Answers
    }
}

export const createOneAnswer = (answer,id) => async (dispatch) => {
    const res = await fetch(`/api/questions/${id}/answers`, {
        method: 'POST',
        body: JSON.stringify(answer)
    });
    if (res.ok) {
        const {Answer} = await res.json()
        dispatch(createOne(Answer))
    }
}

export const updateAnswerThunk = (answer) => async (dispatch) => {
    const res = await fetch(`/api/answers/${answer.id}`,
        {
            method: "PUT",
            body: JSON.stringify(answer)
        }
    )
    if (res.ok) {
        const {Answer} = await res.json()
        dispatch(updateAnswers(Answer))
    }
}


export const deleteAnswerThunk = (id) => async (dispatch) => {
    const res = await fetch(`/api/answers/${id}`, {
        method: "DELETE",
    })
    if (res.ok) {
        const {Id} = await res.json();
        await dispatch(delAnswer(Id))
    }
}


const initialState = {}

const answerReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ANSWER: {
            const newState = { ...state.answers };
            action.payload.forEach((answer) => newState[answer.id] = answer)
            return newState
        }
        case CREATE_ANSWER: {
            const newState = { ...state }
            newState[action.payload.id] = action.payload
            return newState
        }
        case UPDATE_ANSWER: {
            const newState = { ...state }
            newState[action.payload.answer] = action.payload
            return newState
        }
        case DELETE_ANSWER: {
            const newState = {}
            for (let val of Object.values(state)) {
                if (val.id !== action.payload) {
                    newState[val.id] = val
                }
            }
            return newState
        }
        default:
            return state

    }
}

export default answerReducer;
