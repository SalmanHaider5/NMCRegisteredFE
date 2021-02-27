import { ENDPOINTS as api } from '../constants'
import * as types from './'
import {
    destroyWithAuth,
    getAuthToken,
    getUrl,
    getWithAuth,
    postWithAuth
} from '../utils/helpers'

export const addDailySchedule = formValues => dispatch => {
    dispatch({
        type: types.ADD_TIMESHEET_DAILY_SCHEDULE,
        payload: formValues
    })
}

export const addTimesheet = (userId, data) => dispatch => {

    postWithAuth({
        type: 'json',
        url: getUrl(api.TIMESHEET, { userId }),
        token: getAuthToken(),
        body: JSON.stringify(data),
        init: types.ADD_TIMESHEET_REQUEST,
        success: types.ADD_TIMESHEET_SUCCESS,
        failure: types.ADD_TIMESHEET_FAILURE,
        dispatch
    })
}

export const resetScheduleForm = () => dispatch => {
    dispatch({
        type: types.RESET_SCHEDULE_FORM
    })
}

export const fetchTimesheets = userId => dispatch => {
    getWithAuth({
        url: getUrl(api.TIMESHEET, { userId }),
        token: getAuthToken(),
        init: types.FETCH_TIMESHEETS_REQUEST,
        success: types.FETCH_TIMESHEETS_SUCCESS,
        failure: types.FETCH_TIMESHEETS_FAILURE,
        dispatch
    })
}

export const removeTimesheet = (userId, timesheetId) => dispatch => {

    destroyWithAuth({
        url: getUrl(api.SINGLE_TIMESHEET, { userId, timesheetId }),
        token: getAuthToken(),
        init: types.REMOVE_TIMESHEET_REQUEST,
        success: types.REMOVE_TIMESHEET_SUCCESS,
        failure: types.REMOVE_TIMESHEET_FAILURE,
        dispatch,
        payload: timesheetId
    })
}