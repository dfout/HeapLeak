
const GET_QUESTIONS = '/question/get_saves'
const DELETE_QUESTION = '/question/remove_save'

const getQuestions = (questions) =>({
    type: GET_QUESTIONS,
    payload:questions
})

const deleteQuestion = (id)=>({
    type:DELETE_QUESTION,
    payload:id
})


export const getSavedQuestionsThunk = () => async (dispatch) => {
    const response = await fetch('/api/users/saves')
    if (response.ok) {
        const {SavedQuestions} = await response.json();
        await dispatch(getQuestions(SavedQuestions))
        return SavedQuestions
    }
}


export const unSaveQuestionThunk = (id) => async (dispatch)=> {
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

const savesReducer = (state = initialState, action) =>{
    switch(action.type){
        case GET_QUESTIONS:{
            const newState = {};
            action.payload.forEach((question)=> newState[question.id] = question)
            return newState
        }
        case DELETE_QUESTION:{
            const newState = {...state,...state.questions}
            delete newState[action.payload]
            return {...newState}
        }
        default:
            return state
    }

}



export default savesReducer

