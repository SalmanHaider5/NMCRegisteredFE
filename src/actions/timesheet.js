import * as types from './'
import { showToast } from '../utils/helpers'

export const addDailySchedule = formValues => dispatch => {
    dispatch({
        type: types.ADD_TIMESHEET_DAILY_SCHEDULE,
        payload: formValues
    })
}

export const addTimesheet = data => dispatch => {
    dispatch({
        type: types.ADD_TIMESHEET_SUCCESS,
        payload: data
    })
    showToast('Timesheet Added', 'Timesheet successfully added', 'success')
}

export const resetScheduleForm = () => dispatch => {
    dispatch({
        type: types.RESET_SCHEDULE_FORM
    })
}

export const removeTimesheet = id => dispatch => {
    dispatch({
        type: types.REMOVE_TIMESHEET_SUCCESS,
        payload: id
    })
    showToast('Delete Success', 'Timesheet successfully deleted', 'success')
}