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