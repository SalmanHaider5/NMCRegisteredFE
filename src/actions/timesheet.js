import Cookies from 'js-cookie'
import { defaultTo, forEach } from 'ramda'
import { SERVER_URL as url } from '../constants'
import * as types from './'
import { showToast } from '../utils/helpers'

export const addDailySchedule = formValues => dispatch => {
    dispatch({
        type: types.ADD_TIMESHEET_DAILY_SCHEDULE,
        payload: formValues
    })
}

export const addTimesheet = (userId, data) => dispatch => {
    dispatch({ type: types.ADD_TIMESHEET_REQUEST })
    const endpoint = `${url}${userId}/professional/addTimesheet`
    const token = defaultTo('', Cookies.getJSON('authToken').authToken)
    fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            authorization: token,
            'Content-Type':'application/json'
        }
    })
    .then(res => res.json())
    .then(response => {
        const { code, response: { title, message } } = response
        showToast(title, message, code)
    })
    // dispatch({
    //     type: types.ADD_TIMESHEET_SUCCESS,
    //     payload: data
    // })
    showToast('Timesheet Added', 'Timesheet successfully added', 'success')
}

export const resetScheduleForm = () => dispatch => {
    dispatch({
        type: types.RESET_SCHEDULE_FORM
    })
}

export const fetchTimesheets = userId => dispatch => {
    const endpoint = `${url}${userId}/professional/timesheets`
    const token = defaultTo('', Cookies.getJSON('authToken').authToken)
    fetch(endpoint, {
        headers: {
            authorization: token
        }
    })
    .then(res => res.json())
    .then(response => {
        const { code, response: { title, message }, timesheets } = response
        showToast(title, message, code)
        forEach(timesheet => {
            dispatch({ type: types.FETCH_TIMESHEETS_REQUEST })
            const { id } = timesheet
            const endpoint = `${url}timesheet/${id}`
            fetch(endpoint, {
                headers: {
                    authorization: token
                }
            })
            .then(res => res.json())
            .then(response => {
                const { code, timesheet } = response
                if(code === 'success'){
                    dispatch({
                        type: types.FETCH_TIMESHEETS_SUCCESS,
                        payload: { id, schedule: timesheet }
                    })
                }
                else{
                    dispatch({
                        type: types.FETCH_TIMESHEETS_FAILURE,
                        error: response.error
                    })
                }
            })
        }, timesheets)
        // forEach(timesheet => fetchSingletimesheet(timesheet.id), timesheets)
    })
}

export const removeTimesheet = id => dispatch => {
    dispatch({
        type: types.REMOVE_TIMESHEET_SUCCESS,
        payload: id
    })
    showToast('Delete Success', 'Timesheet successfully deleted', 'success')
}