import { append, length, add, findIndex, propEq, remove, find, update, isNil } from 'ramda'
import * as actions from '../actions'

const initState = {
    isLoading: false,
    timesheet: {
        id: '',
        schedule: []
    },
    timesheets: []
}

const timesheet = (state=initState, action) => {
    const { type, payload } = action
    const { timesheets } = state
    switch(type){
        case actions.FETCH_TIMESHEETS_REQUEST:
            return{
                ...state,
                isLoading: true
            }
        case actions.FETCH_TIMESHEETS_SUCCESS:
            return{
                ...state,
                isLoading: false,
                timesheets: append(payload, timesheets)
            }
        case actions.FETCH_TIMESHEETS_FAILURE:
            return{
                ...state,
                isLoading: false
            }
        case actions.ADD_TIMESHEET_DAILY_SCHEDULE:
            const { timesheet, timesheet: { schedule } } = state
            timesheet.id = add(length(state.timesheets), 1)
            timesheet.schedule = !isNil(find(propEq('id', payload.id))(schedule)) ? update(findIndex(propEq('id', payload.id))(schedule), payload, schedule) : append(payload, schedule)
            
            return{
                ...state,
                timesheet
            }
        case actions.ADD_TIMESHEET_SUCCESS:
            return{
                ...state,
                timesheets: append(payload, timesheets)
            }
        case actions.RESET_SCHEDULE_FORM:
            return{
                ...state,
                timesheet: {
                    id: '',
                    userId: '',
                    schedule: []
                }
            }
        case actions.REMOVE_TIMESHEET_SUCCESS:
            const index = findIndex(propEq('id', payload))(state.timesheets)
            return {
                ...state,
                timesheets: remove(index, 1, state.timesheets)
            }
        default:
            return{
                ...state
            }
    }
}

export default timesheet