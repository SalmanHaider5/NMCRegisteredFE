import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { reduxForm, getFormValues, change, reset, initialize } from 'redux-form'
import { isEmpty, length, add, find, propEq, map, range, init, head, last, nth, prop, subtract, omit, filter, isNil, split } from 'ramda'
import { Row, Col, Button, Result, Icon, Divider, Drawer } from 'antd'
import { getTimesheetValues } from '../../../../utils/helpers'
import { ModalBox } from '../../../../utils/custom-components'
import { addDailySchedule, addTimesheet, resetScheduleForm, removeTimesheet, fetchTimesheets, changeShiftStatus, changeTimesheetShift } from '../../../../actions'
import { TIMESHEET_DAYS as days, TIMESHEET_SHIFTS as shifts, DATE_FORMAT as dateFormat } from '../../../../constants'
import WeekdaySelectBox from './WeekdaySelectBox'
import ShiftsSelectBox from './ShiftsSelectBox'
import SingleTimesheet from './SingleTimesheet'
import './timesheet.css'

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
      editableTimeheet: ''
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

  selectShift = (shift) => {
    const { dispatch } = this.props
    const { name, startTime, endTime } = shift
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
    const { dispatch } = this.props
    dispatch(removeTimesheet(id))
  }
  showScheduleForm = () => {
    const { dispatch } = this.props
    dispatch(resetScheduleForm())
    moment.updateLocale('en', {
      week: {
        dow: 1
      }
    })
    const weekStart = moment().startOf('week');
    const days = init(range(0, 8))
    
    const weeklyDates = map(day => {
      return moment(weekStart).add(day, 'days').format('LL')
    }, days)
    this.setState({
      scheduleForm: true,
      weeklyDates
    })
  }

  showEditShiftModal = (timesheetId, shiftId) => {
    const { timesheet: { timesheets }, dispatch } = this.props
    const { schedule } = find(propEq('id', timesheetId))(timesheets)
    const selectedShift = find(propEq('id', shiftId))(schedule)
    
    const formValues = {}
    if(!isNil(selectedShift)){
      formValues.id = selectedShift.id
      formValues.day = moment(selectedShift.date).format('dddd')
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
    const { formValues, dispatch } = this.props
    const { editableTimeheet } = this.state
    dispatch(changeTimesheetShift(omit(['day'], formValues), editableTimeheet))
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
    const { formValues, dispatch } = this.props
    const { shift, startTime, endTime } = formValues
    if(shift === "Customized Shift"){
      const start = new moment(startTime)
      const end = new moment(endTime)
      const difference = end.diff(start, 'hours')
      if(difference < 0){
        this.setState({
          customizedShiftError: 'End time can not be less than start time'
        })
      } else if(difference < 4){
        this.setState({
          customizedShiftError: 'At least 4 hours required'
        })
      }else{
        formValues.startTime = moment(formValues.startTime).format('LT')
        formValues.endTime = moment(formValues.endTime).format('LT')
        dispatch(addDailySchedule(formValues))
        this.hideDrawer()
      }
    }else{
      dispatch(addDailySchedule(formValues))
      this.hideDrawer()
    }
  }

  getScheduleByDay = id => {
    const { timesheet: { timesheet: { schedule } } } = this.props
    return find(propEq('id', id))(schedule)
  }
  addTimesheet = () => {
    const { timesheet: { timesheet: { schedule } }, dispatch, match: { params: { userId } } } = this.props
    const { weeklyDates } = this.state
    let timesheetValues = {}
    timesheetValues.startingDay = moment(head(weeklyDates)).format('L')
    timesheetValues.endingDay = moment(last(weeklyDates)).format('L')
    let scheduleValues = map(singleDay => {
      const { day, shift, startTime, endTime } = singleDay
      const specificDay = find(propEq('name', day))(days)
      let singleTimesheet = {}
      singleTimesheet.date = moment(this.getSpecificDate(specificDay)).format('L')
      singleTimesheet.shift = shift
      singleTimesheet.time = `${startTime}-${endTime}`
      singleTimesheet.status = true
      return singleTimesheet
    }, schedule)
    let values = {}
    values.timesheet = timesheetValues
    values.singleTimesheet = scheduleValues
    dispatch(addTimesheet(userId, values))
    this.setState({ scheduleForm: false })
  }

  getSpecificDate = day => {
    const { weeklyDates } = this.state
    const { id } = day
    this.setState({
      specificDate: nth(subtract(id, 1), weeklyDates)
    })
    return nth(subtract(id, 1), weeklyDates)
  }

  getShiftByDay = (date, schedule) => {
    return head(filter(day => moment(day.date).format(dateFormat) === date, schedule))
  }

  getTimesheetShiftByDay = (timesheet, day) => {
    const { schedule, startingDay } = timesheet
    const { id } = day
    const date = moment(startingDay).add(parseInt(id) - 1, 'days').format(dateFormat)
    const shift = {}
    shift.date = date
    const shiftDetails = this.getShiftByDay(date, schedule)
    if(isNil(shiftDetails)){
      shift.id = ''
      shift.time = '00:00 AA - 00:00 AA'
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
    const { dispatch } = this.props
    dispatch(changeShiftStatus(shift, status, timesheet))
  }

  render() {
    const { visible, selectedDay, selectedShift, scheduleForm, customizedShiftError, weeklyDates, specificDate, editShiftModal } = this.state
    const { timesheet: { timesheets } } = this.props
    return (
      <div>
        <div className="inner-wrapper">
          <div className="steps-content">
            <div className="steps-header">
              <h3>Timesheet Management</h3>
            </div>
            <div>
              {
                scheduleForm ?
                <>
                  <Row gutter={16} className="weekly-row">
                    <Divider>
                      Week {add(length(timesheets), 1)}
                      <br/>
                      {`${head(weeklyDates)}-${last(weeklyDates)}`}
                    </Divider>
                    <WeekdaySelectBox
                      days={days}
                      showDrawer={this.showDrawer}
                      getSpecificDate={this.getSpecificDate}
                      getScheduleByDay={this.getScheduleByDay}
                      addTimesheet={this.addTimesheet}
                    />
                  </Row>
                </>:
                ''
              }
            </div>
            <Divider>Timesheets</Divider>
            {
              isEmpty(timesheets) ?
              <Result
                title="No Timesheets Added"
                subTitle="You have not added any timesheet yet"
                extra={<Button type="primary" onClick={this.showScheduleForm}><Icon type="plus" />Add new Timesheet</Button>}
              /> :
              <Row gutter={16} className="timesheets-row">
                <Col span={24}>
                  <Button
                    type="primary"
                    disabled={ length(timesheets) > 4 ? true : false }
                    onClick={this.showScheduleForm}
                  >
                    <Icon type="plus" />
                    Add new Timesheet
                  </Button>
                </Col>
                {
                  map(timesheet => {
                    return(
                      <Col span={12} key={timesheet.id} >
                        <SingleTimesheet
                          days={days}
                          timesheet={timesheet}
                          getTimesheetShiftByDay={this.getTimesheetShiftByDay}
                          deleteTimesheet={this.deleteTimesheet}
                          changeShiftAvailability={this.changeShiftAvailability}
                          showEditShiftModal={this.showEditShiftModal}
                        />
                      </Col>
                    )
                  }, timesheets)
                }
              </Row>
            }
            <div className="drawer">
              <Drawer
                title={`${selectedDay} (${specificDate})`}
                placement="right"
                closable="false"
                onClose={this.hideDrawer}
                visible={visible}
                getContainer={false}
                className="timesheet-drawer"
                width={'400px'}
              >
                <p>Choose your Shift</p>
                <ShiftsSelectBox
                  shifts={shifts}
                  selectedShift={selectedShift}
                  selectShift={this.selectShift}
                  addStartTime={this.addStartTime}
                  addEndTime={this.addEndTime}
                  customizedShiftError={customizedShiftError}
                />
                <Button
                  block
                  className="success-btn select-button"
                  onClick={this.addTimesheetDaySchedule}
                  disabled={selectedShift === ''}
                >
                  <Icon type="check" />
                  Save
                </Button>
              </Drawer>
              <ModalBox
                title={`Edit Timesheet`}
                visible={editShiftModal}
                size={500}
                content={
                  <span className="edit-shift">
                    <ShiftsSelectBox
                      shifts={shifts}
                      selectedShift={selectedShift}
                      selectShift={this.selectShift}
                    />
                  </span>
                }
                submitText={
                  <span>
                    <Icon type="save" /> Update
                  </span>
                }
                cancelText={'Cancel'}
                submitHandler={this.updateTimesheetShift}
                cancelHandler={this.hideEditShiftModal}
              />
            </div>
          </div>
        </div>
      </div>
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
