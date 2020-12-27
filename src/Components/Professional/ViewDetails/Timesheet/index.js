import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { reduxForm, getFormValues, change, reset, initialize } from 'redux-form'
import { isEmpty, find, not, propEq, map, range, head, last, nth, prop, subtract, omit, filter, isNil, split, equals } from 'ramda'
import { getTimesheetValues } from '../../../../utils/helpers'
import { Loader } from '../../../../utils/custom-components'
import { addDailySchedule, addTimesheet, resetScheduleForm, removeTimesheet, fetchTimesheets, changeShiftStatus, changeTimesheetShift } from '../../../../actions'
import { TIMESHEET_DAYS as days, DATE_FORMAT as dateFormat } from '../../../../constants'
import { Container } from './Container/'

import './timesheet.css'
import 'moment/locale/en-gb' 

moment.locale('en-gb')

class Timesheet extends Component {
  constructor(props){
    super(props)
    this.state = {
      visible: false,
      selectedDay: '',
      selectedShift: '',
      scheduleForm: false,
      customizedShiftError: '',
      weeklyDates: [],
      specificDate: '',
      editShiftModal: false,
      editableTimeheet: '',
      week: 1,
      timesheet: {}
    }
  }

  componentDidMount(){
    const { match: { params: { userId } }, dispatch } = this.props
    dispatch(fetchTimesheets(userId))
  }

  showDrawer = day => {
    const { dispatch } = this.props
    const { id, name } = day
    this.getSpecificDate(day)
    this.setState({
      visible: true,
      selectedDay: name,
      selectedShift: ''
    })
    dispatch(change('timesheet', 'id', id))
    dispatch(change('timesheet', 'day', name))
  }

  showTimesheet = (timesheet) => {
    this.setState({ timesheet })
  }

  selectShift = (shift) => {

    const { dispatch } = this.props,
      { name, startTime, endTime } = shift

    this.setState({ selectedShift: name })

    dispatch(change('timesheet', 'shift',  name))
    dispatch(change('timesheet', 'startTime',  startTime))
    dispatch(change('timesheet', 'endTime',  endTime))

  }

  hideDrawer = () => {

    const { dispatch } = this.props

    this.setState({
      visible: false,
      selectedDay: ''
    })

    dispatch(reset('timesheet'))

  }

  deleteTimesheet = id => {

    const {
      dispatch,
      match: { params: { userId } }
    } = this.props

    dispatch(removeTimesheet(userId, id))

    this.setState({
      timesheet: {}
    })

  }

  skipCurrentWeek = () => {

    const { week } = this.state

    this.setState({ week: week + 1 }, () => {
      this.showScheduleForm()
    })
  }

  resetWeek = () => {

    this.setState({ week: 1 }, () => {
      this.showScheduleForm()
    })

  }

  showScheduleForm = () => {

    const {
      dispatch,
      timesheet: { timesheets }
    } = this.props

    let { week } = this.state

    dispatch(resetScheduleForm())

    const weekStart = moment().add((parseInt(week) - 1) * 7, 'days').startOf('week'),
      weekFound = not(isEmpty(filter(timesheet => equals(moment(timesheet.startingDay).format('YYYY-MM-DD'), moment(weekStart).format('YYYY-MM-DD')), timesheets))),
      isLastDay = moment(weekStart).add(6, 'days').isSameOrBefore(moment())

    if(weekFound || isLastDay){
      this.setState({
        week: week + 1
      }, () => {
        this.showScheduleForm()
      })
    }else{
      const days = range(0, 7) 
      const weeklyDates = map(day => {
        return moment(weekStart).add(day, 'days').format('YYYY-MM-DD')
      }, days)
      this.setState({
        scheduleForm: true,
        weeklyDates
      })
    }
  }

  hideScheduleForm = () => {

    this.setState({
      scheduleForm: false,
      weeklyDates: []
    })

  }

  showEditShiftModal = (timesheetId, shiftId) => {
    
    const {
      timesheet: { timesheets },
      dispatch
    } = this.props,
      { schedule } = find(propEq('id', timesheetId))(timesheets),
      selectedShift = find(propEq('id', shiftId))(schedule),
      formValues = {}

    if(!isNil(selectedShift)){
      formValues.id = selectedShift.id
      formValues.day = moment.utc(selectedShift.date).format('dddd')
      formValues.shift = selectedShift.shift
      formValues.startTime = head(split('-', selectedShift.time))
      formValues.endTime = last(split('-', selectedShift.time))
      dispatch(initialize('timesheet', formValues))
    }

    this.setState({
      editShiftModal: true,
      selectedShift: isNil(selectedShift) ? '' : formValues.shift,
      editableTimeheet: timesheetId
    })

  }

  updateTimesheetShift = () => {
    const {
      formValues,
      dispatch,
      match: {
        params: { userId }
      }
    } = this.props,
      { editableTimeheet } = this.state,
      { shift } = formValues,
      startTime = equals(shift, 'Customized Shift') ? moment(formValues.startTime).format('LTS') : formValues.startTime,
      endTime = equals(shift, 'Customized Shift') ? moment(formValues.endTime).format('LTS') : formValues.endTime

    formValues.time = `${startTime} - ${endTime}`
    formValues.status = true

    dispatch(changeTimesheetShift(userId, omit(['day', 'startTime', 'endTime'], formValues), editableTimeheet))
    this.setState({ editShiftModal: false })

  }

  hideEditShiftModal = () => {
    this.setState({ editShiftModal: false })
  }

  addStartTime = (time, timeString) => {

    const { dispatch } = this.props
    dispatch(change('timesheet', 'startTime', time))

  }

  addEndTime = (time, timeString) => {

    const { dispatch } = this.props
    dispatch(change('timesheet', 'endTime', time))

  }

  addTimesheetDaySchedule = () => {

    const { formValues, dispatch } = this.props,
      { shift, startTime, endTime } = formValues

    if(equals(shift, 'Customized Shift')){
      
      const start = new moment(startTime),
        end = new moment(endTime),
        difference = end.diff(start, 'hours')

      if(difference < 0){
        this.setState({ customizedShiftError: 'End time can not be less than start time' })
      } else if(difference < 4){
        this.setState({ customizedShiftError: 'At least 4 hours required' })
      }else{

        formValues.startTime = moment(startTime).format('LT')
        formValues.endTime = moment(endTime).format('LT')
        dispatch(addDailySchedule(formValues))
        this.hideDrawer()

      }
    }else{

      dispatch(addDailySchedule(formValues))
      this.hideDrawer()

    }
  }

  getScheduleByDay = id => {

    const {
      timesheet: {
        timesheet: {
          schedule
        }
      }
    } = this.props

    return find(propEq('id', id))(schedule)
  }

  addTimesheet = () => {

    const {
      timesheet: {
        timesheet: { schedule }
      },
      dispatch,
      match: {
        params: { userId }
      }
    } = this.props

    const { weeklyDates } = this.state

    let timesheetValues = {}
    timesheetValues.startingDay = head(weeklyDates)
    timesheetValues.endingDay = last(weeklyDates)

    let scheduleValues = map(day => {
      const dayFound = find(propEq('day', day.name))(schedule)
      let singleTimesheet = {}
      singleTimesheet.date = weeklyDates[parseInt(day.id) - 1]
      singleTimesheet.shift = isNil(dayFound) ? '' : dayFound.shift
      singleTimesheet.time = isNil(dayFound) ? `00:00 - 00:00` : `${dayFound.startTime}-${dayFound.endTime}`
      singleTimesheet.status = isNil(dayFound) ? false : true
      return singleTimesheet
    }, days)

    let values = {}
    values.timesheet = timesheetValues
    values.singleTimesheet = scheduleValues

    dispatch(addTimesheet(userId, values))

    this.setState({
      scheduleForm: false,
      week: 1
    })

  }

  getSpecificDate = day => {
    const { weeklyDates } = this.state
    const { id } = day
    this.setState({
      specificDate: nth(subtract(id, 1), weeklyDates)
    })
    return nth(subtract(id, 1), weeklyDates)
  }

  getDayStatus = (day) => {

    const { weeklyDates } = this.state,
      isExpired = moment.utc(weeklyDates[parseInt(day.id)-1]).isSameOrBefore(moment.utc())

    return isExpired
  }

  getShiftByDay = (date, schedule) => {
    return head(filter(day => moment.utc(day.date).format(dateFormat) === date, schedule))
  }

  getTimesheetShiftByDay = (timesheet, day) => {

    const { schedule, startingDay } = timesheet,
      { id } = day,
      date = moment.utc(startingDay).add(parseInt(id) - 1, 'days').format(dateFormat),
      shift = {}

    shift.date = date
    shift.expiryStatus = moment.utc(startingDay).add(parseInt(id) - 1, 'days').isSameOrBefore(moment())

    const shiftDetails = this.getShiftByDay(date, schedule)

    if(isNil(shiftDetails)){
      shift.id = ''
      shift.time = '00:00 - 00:00'
      shift.name = '-'
      shift.status = false
    }else{
      shift.id = prop('id', shiftDetails)
      shift.time = prop('time', shiftDetails)
      shift.name = prop('shift', shiftDetails)
      shift.status = prop('status', shiftDetails)
    }
    
    return shift
  }
  
  changeShiftAvailability = (status, shift, timesheet) => {
    
    const {
      dispatch,
      match: { params: { userId } }
    } = this.props

    dispatch(changeShiftStatus(userId, shift, status, timesheet))

  }

  render() {
    
    const {
      visible,
      selectedDay,
      selectedShift,
      scheduleForm,
      customizedShiftError,
      weeklyDates,
      specificDate,
      editShiftModal,
      timesheet
    } = this.state

    const { timesheet: { timesheets, isLoading }, formValues={} } = this.props

    return (
      <>
        <Loader
          size="large"
          isLoading={isLoading}
          loadingText={'Loading Timesheets...'}
          wrapper={
            <Container
              visible={visible}
              timesheet={timesheet}
              selectedShift={selectedShift}
              timesheets={timesheets}
              formValues={formValues}
              weeklyDates={weeklyDates}
              selectedDay={selectedDay}
              specificDate={specificDate}
              scheduleForm={scheduleForm}
              editShiftModal={editShiftModal}
              customizedShiftError={customizedShiftError}
              updateTimesheetShift={this.updateTimesheetShift}
              showEditShiftModal={this.showEditShiftModal}
              getTimesheetShiftByDay={this.getTimesheetShiftByDay}
              showTimesheet={this.showTimesheet}
              addStartTime={this.addStartTime}
              addEndTime={this.addEndTime}
              showDrawer={this.showDrawer}
              hideDrawer={this.hideDrawer}
              changeShiftAvailability={this.changeShiftAvailability}
              skipCurrentWeek={this.skipCurrentWeek}
              resetWeek={this.resetWeek}
              deleteTimesheet={this.deleteTimesheet}
              selectShift={this.selectShift}
              addTimesheetDaySchedule={this.addTimesheetDaySchedule}
              hideScheduleForm={this.hideScheduleForm}
              getSpecificDate={this.getSpecificDate}
              hideEditShiftModal={this.hideEditShiftModal}
              getScheduleByDay={this.getScheduleByDay}
              addTimesheet={this.addTimesheet}
              getDayStatus={this.getDayStatus}
              showScheduleForm={this.showScheduleForm}
            />
          }
        />
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    formValues: getFormValues('timesheet')(state),
    timesheet: state.timesheet
  }
}

export default connect(mapStateToProps)(
  reduxForm({
    form: 'timesheet',
    initialValues: getTimesheetValues()  
  })(Timesheet)
)
