import { append, length, add, findIndex, propEq, remove, find, update, isNil, join } from 'ramda'
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
        case actions.REMOVE_TIMESHEET_REQUEST:
        case actions.UPDATE_SHIFT_REQUEST:
        case actions.SHIFT_STATUS_UPDATE_REQUEST:
        case actions.FETCH_TIMESHEETS_REQUEST:
        case actions.ADD_TIMESHEET_REQUEST:
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
        case actions.SHIFT_STATUS_UPDATE_SUCCESS:
            const { timesheetId, id } = payload
            const selectedTimesheet = find(propEq('id', timesheetId))(timesheets)
            const timesheetIndex = findIndex(propEq('id', timesheetId))(timesheets)
            const selectedShift = find(propEq('id', id))(selectedTimesheet.schedule)
            const shiftIndex = findIndex(propEq('id', id))(selectedTimesheet.schedule)
            selectedShift.status = !selectedShift.status
            const updatedTimesheet = update(timesheetIndex, update(shiftIndex, selectedShift, selectedTimesheet.schedule), state.timesheet)
            return{
                ...state,
                isLoading: false,
                timesheet: updatedTimesheet
            }
        case actions.UPDATE_SHIFT_SUCCESS:
            const currentTimesheet = find(propEq('id', payload.id))(timesheets)
            const currentTimesheetIndex = findIndex(propEq('id', payload.id))(timesheets)
            const currentShift = find(propEq('id', payload.shift.id))(currentTimesheet.schedule)
            const currentShiftIndex = findIndex(propEq('id', payload.shift.id))(currentTimesheet.schedule)
            const updatedShift = currentShift
            updatedShift.shift = payload.shift.shift
            updatedShift.time = join('-', payload.shift.startTime, payload.shift.endTime)
            const newTimesheet = update(currentTimesheetIndex, update(currentShiftIndex, currentShift, currentTimesheet.schedule), state.timesheet)
            return{
                ...state,
                isLoading: false,
                timesheet: newTimesheet
            }
        case actions.ADD_TIMESHEET_FAILURE:
        case actions.REMOVE_TIMESHEET_FAILURE:
        case actions.UPDATE_SHIFT_FAILURE:
        case actions.SHIFT_STATUS_UPDATE_FAILURE:
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
                isLoading: false,
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
                isLoading: false,
                timesheets: remove(index, 1, state.timesheets)
            }
        default:
            return{
                ...state
            }
    }
}

export default timesheet