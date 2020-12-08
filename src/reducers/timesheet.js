import { empty } from 'ramda'
import * as actions from '../actions'
import {
    formatTimesheetDailySchedule,
    getBasicTimesheet,
    getFilteredList,
    getStatusModifiedTimesheet,
    getUpdatedTimesheet
} from './helpers'

const initState = {
    isLoading: false,
    timesheet: {
        id: '',
        schedule: []
    },
    timesheets: [],
    error: {}
}

const timesheet = (state=initState, action) => {
    const { type, payload = [], error } = action
    switch(type){
        case actions.ADD_TIMESHEET_REQUEST:
        case actions.FETCH_TIMESHEETS_REQUEST:
        case actions.REMOVE_TIMESHEET_REQUEST:
        case actions.SHIFT_STATUS_UPDATE_REQUEST:
        case actions.UPDATE_SHIFT_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case actions.ADD_TIMESHEET_DAILY_SCHEDULE:
            return{
                ...state,
                timesheet: formatTimesheetDailySchedule(state, payload)
            }
        case actions.RESET_SCHEDULE_FORM:
            return {
                ...state,
                error: empty(error),
                timesheet: getBasicTimesheet()
            }
        case actions.ADD_TIMESHEET_SUCCESS:
            console.log('payload', payload)
            return {
                ...state,
                isLoading: false,
                error: empty(error),
                timesheets: payload
            }
        case actions.FETCH_TIMESHEETS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: empty(error),
                timesheets: payload
            }
        case actions.REMOVE_TIMESHEET_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: empty(error),
                timesheets: getFilteredList(payload, state.timesheets)
            }
        case actions.SHIFT_STATUS_UPDATE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: empty(error),
                timesheet: getStatusModifiedTimesheet(payload, state)
            }
        case actions.UPDATE_SHIFT_SUCCESS:
            return{
                ...state,
                isLoading: false,
                error: empty(error),
                timesheet: getUpdatedTimesheet(payload, state, 'shift')
            }
        case actions.FETCH_TIMESHEETS_FAILURE:
        case actions.REMOVE_TIMESHEET_FAILURE:
        case actions.ADD_TIMESHEET_FAILURE:
        case actions.SHIFT_STATUS_UPDATE_FAILURE:
        case actions.UPDATE_SHIFT_FAILURE:
            return {
                ...state,
                isLoading: false,
                error
            }
        default:
            return{
                ...state
            }
    }
}

export default timesheet