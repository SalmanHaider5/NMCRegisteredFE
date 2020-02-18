import { append } from 'ramda'
import * as actions from '../actions'

const initState = {
    isLoading: false,
    timesheet: {
        id: '',
        userId: '',
        schedule: [{id: 1}]
    },
    weeklySchedule: []
}

const timesheet = (state=initState, action) => {
    const { type, payload } = action
    switch(type){
        case actions.FETCH_TIMESHEET_REQUEST:
            return{
                ...state,
                isLoading: true
            }
        case actions.FETCH_TIMESHEET_SUCCESS:
            return{
                ...state,
                isLoading: false,
                timesheet: payload
            }
        case actions.FETCH_TIMESHEET_FAILURE:
            return{
                ...state,
                isLoading: false
            }
        case actions.ADD_TIMESHEET_DAILY_SCHEDULE:
            const { weeklySchedule } = state
            return{
                ...state,
                weeklySchedule: append(payload, weeklySchedule)
            }
        case actions.ADD_TIMESHEET_SUCCESS:
            let { timesheet } = state
            timesheet.schedule = payload
            return{
                ...state,
                timesheet: payload
            }
        default:
            return{
                ...state
            }
    }
}

export default timesheet