
const GET_QUESTIONS = '/question/get_saves'
const DELETE_QUESTION = '/question/remove_save'
const SAVE_QUESTION = '/question/add_save'
const GET_USERSAVES = '/question/user_saves'
const getQuestions = (questions) =>({
    type: GET_QUESTIONS,
    payload:questions
})

const deleteQuestion = (id)=>({
    type:DELETE_QUESTION,
    payload:id
})

const savedQuestion = (question) => ({
    type: SAVE_QUESTION,
    payload : question
})
const newUserSaved  = (questions) => ({
    type: GET_USERSAVES,
    payload : questions
})


export const getSavedQuestionsThunk = () => async (dispatch) => {
    const response = await fetch('/api/users/saves')
    if (response.ok) {
        const {SavedQuestions} = await response.json();
        await dispatch(getQuestions(SavedQuestions))
        return SavedQuestions
    }
}

export const saveQuestionThunk = (question) => async (dispatch) => {
    const response = await fetch(`/api/questions/${question.id}/saves`, {
        method: 'POST'
    })
    if (response.ok) {
        const { Save } = await response.json()
        console.log('this is the save =================',Save)
        await dispatch(savedQuestion(Save))
        return Save
    }
}

export const unSaveQuestionThunk = (id) => async (dispatch)=> {
    const response = await fetch(`/api/questions/saves/${id}`,{
        method: 'DELETE',

    })
    if (response.ok) {
        console.log(response)
        const {Id} = await response.json();
        // console.log(data)
          dispatch(deleteQuestion(Id));
          return Id
    } else {
          const data = await response.json();
          return data.errors;
    }
}



export const userSavedThunks = () => async (dispatch) => {
  const response = await fetch("/api/users/saves");
  if (response.ok) {
    const { SavedQuestions } = await response.json();
    await dispatch(newUserSaved(SavedQuestions));
    return SavedQuestions;
  }
};



const initialState = {}

const savesReducer = (state = initialState, action) =>{
    switch (action.type) {
      case GET_QUESTIONS: {
        const newState = {};
        action.payload.forEach(
          (question) => (newState[question.id] = question)
        );
        return newState;
      }
      case DELETE_QUESTION: {
        const newState = { ...state, ...state.questions };
        delete newState[action.payload];
        return { ...newState };
      }
      case GET_USERSAVES: {
        const newState = {...state.saves, ...state};
        action.payload.forEach(
          (question) => (newState[question.post.id] = question)
        );
        return newState;
        }
        case SAVE_QUESTION: {
            const newState = { ...state, ...state.saves }
            newState[action.payload.post.id] = action.payload
            return newState
            }
      default:
        return state;
    }

}



export default savesReducer
