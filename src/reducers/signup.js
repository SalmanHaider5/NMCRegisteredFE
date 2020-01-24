import * as actions from '../actions'

const initState = {
    isLoading: false,
    error: ''
}

const signup = (state=initState, action) => {
    const { type } = action
    switch(type){
        case actions.SIGNUP_REQUEST:
            return{
                ...state,
                isLoading: true
            }
        case actions.SIGNUP_SUCCESS:
            return{
                ...state,
                isLoading: false
            }
        case actions.SIGNUP_FAULRE:
            return{
                ...state,
                isLoading: false
            }
        default:
            return{
                ...state
            }
    }
}

export default signup