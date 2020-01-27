import * as actions from '../actions'

const initState = {
    isLoading: false,
    clientToken: ''
}

const company = (state=initState, action) => {
    const { type, payload } = action
    switch(type){
        case actions.CLIENT_TOKEN_REQUEST:
            return{
                ...state,
                isLoading: true
            }
        case actions.CLIENT_TOKEN_SUCCESS:
            const { token } = payload
            return{
                ...state,
                isLoading: false,
                clientToken: token
            }
        case actions.CLINET_TOKEN_FAILURE:
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

export default company