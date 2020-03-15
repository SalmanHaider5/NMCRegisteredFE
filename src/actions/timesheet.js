import Cookies from 'js-cookie'
import { defaultTo, forEach, length } from 'ramda'
import moment from 'moment'
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
        const { code, response: { title, message }, timesheetId } = response
        showToast(title, message, code)
        if(code === 'success'){
            const { timesheet: { startingDay, endingDay }, singleTimesheet } = data
            dispatch({
                type: types.ADD_TIMESHEET_SUCCESS,
                payload: {
                    id: timesheetId,
                    startingDay,
                    endingDay,
                    schedule: singleTimesheet
                }
            })
        }else{
            dispatch({
                type: types.ADD_TIMESHEET_FAILURE,
                error: response.error
            })
        }   
    })
    .catch(err => {
        dispatch({
            type: types.ADD_TIMESHEET_FAILURE,
            error: err
        })
    })
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
            const { id, startingDay, endingDay } = timesheet
            if(moment(endingDay).add(1, 'days').isBefore(moment().local())){
                console.log(endingDay, 'Test')
            }else{
                console.log('Ignore')
            }
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
                        payload: { length: length(timesheets), timesheet: { id, startingDay, endingDay, schedule: timesheet } }
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
    })
}

export const removeTimesheet = id => dispatch => {
    dispatch({ type: types.REMOVE_TIMESHEET_REQUEST })
    const endpoint = `${url}timesheet/${id}`
    const token = defaultTo('', Cookies.getJSON('authToken').authToken)
    fetch(endpoint, {
        method: 'DELETE',
        headers: {
            authorization: token
        }
    })
    .then(res => res.json())
    .then(response => {
        const { code, response: { title, message } } = response
        showToast(title, message, code)
        if(code === 'success'){
            dispatch({
                type: types.REMOVE_TIMESHEET_SUCCESS,
                payload: id
            })
        }else{
            dispatch({
                type: types.REMOVE_TIMESHEET_FAILURE,
                error: response.error
            })
        }
    })
    .catch(err => {
        dispatch({
            type: types.REMOVE_TIMESHEET_FAILURE,
            error: err
        })
    })
}