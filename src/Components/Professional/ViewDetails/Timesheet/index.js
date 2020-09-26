import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { reduxForm, getFormValues, change, reset, initialize } from 'redux-form'
import { isEmpty, length, find, propEq, map, range, head, last, nth, prop, subtract, omit, filter, isNil, split, equals, join, dropLast } from 'ramda'
import { Row, Col, Button, Result, Icon, Divider, Drawer, Spin } from 'antd'
import { getTimesheetValues, isEmptyOrNull } from '../../../../utils/helpers'
import { ModalBox } from '../../../../utils/custom-components'
import { addDailySchedule, addTimesheet, resetScheduleForm, removeTimesheet, fetchTimesheets, changeShiftStatus, changeTimesheetShift } from '../../../../actions'
import { TIMESHEET_DAYS as days, TIMESHEET_SHIFTS as shifts, DATE_FORMAT as dateFormat } from '../../../../constants'
import WeekdaySelectBox from './WeekdaySelectBox'
import WeekdaySelectBoxMobile from './WeekdaySelectBoxMobile'
import ShiftsSelectBox from './ShiftsSelectBox'
import SingleTimesheet from './SingleTimesheet'
import Timesheets from './Timesheets'
import 'moment/locale/en-gb' 
import './timesheet.css'
import ButtonGroup from 'antd/lib/button/button-group'

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
    const { dispatch, timesheet: { timesheets } } = this.props
    let { week } = this.state
    dispatch(resetScheduleForm())
    const weekStart = moment().add((parseInt(week) - 1) * 7, 'days').startOf('week')
    const weekFound = !isEmpty(filter(timesheet => equals(moment(timesheet.startingDay).format('YYYY-MM-DD'), moment(weekStart).format('YYYY-MM-DD')), timesheets))
    const isLastDay = moment(weekStart).add(6, 'days').isSameOrBefore(moment())
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
    const { timesheet: { timesheets }, dispatch } = this.props
    const { schedule } = find(propEq('id', timesheetId))(timesheets)
    const selectedShift = find(propEq('id', shiftId))(schedule)
    const formValues = {}
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
    const { formValues, dispatch } = this.props
    const { editableTimeheet } = this.state
    const { shift } = formValues
    const startTime = shift === 'Customized Shift' ? moment(formValues.startTime).format('LTS') : formValues.startTime
    const endTime = shift === 'Customized Shift' ? moment(formValues.endTime).format('LTS') : formValues.endTime
    formValues.time = `${startTime} - ${endTime}`
    formValues.status = true
    dispatch(changeTimesheetShift(omit(['day', 'startTime', 'endTime'], formValues), editableTimeheet))
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
        formValues.startTime = join(':', dropLast(1, split(':', moment(formValues.startTime).format('LTS'))))
        formValues.endTime = join(':', dropLast(1, split(':', moment(formValues.endTime).format('LTS'))))
        dispatch(addDailySchedule(formValues))
        this.hideDrawer()
      }
    }else{
      console.log('Form', formValues)
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
    const { weeklyDates } = this.state
    const isExpired = moment.utc(weeklyDates[parseInt(day.id)-1]).isSameOrBefore(moment.utc())
    return isExpired
  }

  getShiftByDay = (date, schedule) => {
    return head(filter(day => moment.utc(day.date).format(dateFormat) === date, schedule))
  }

  getTimesheetShiftByDay = (timesheet, day) => {
    const { schedule, startingDay } = timesheet
    const { id } = day
    const date = moment.utc(startingDay).add(parseInt(id) - 1, 'days').format(dateFormat)
    const shift = {}
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
    const { dispatch } = this.props
    dispatch(changeShiftStatus(shift, status, timesheet))
  }

  render() {
    const { visible, selectedDay, selectedShift, scheduleForm, customizedShiftError, weeklyDates, specificDate, editShiftModal, timesheet, week } = this.state
    const { timesheet: { timesheets, isLoading }, formValues={} } = this.props
    const { startTime, endTime } = formValues
    return (
      <Spin spinning={isLoading} tip="Loading...">
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
                      {`${moment(head(weeklyDates)).format('ll')}-${moment(last(weeklyDates)).format('ll')}`} 
                    </Divider>
                    <Col span={24}>
                      <ButtonGroup>
                        <Button type="primary" disabled={week > 4} onClick={this.skipCurrentWeek}>
                          Skip <Icon type="right" />
                        </Button>
                        <Button type="primary" onClick={this.resetWeek}>
                        <Icon type="undo" /> Reset
                        </Button>
                        <Button type="primary" onClick={this.hideScheduleForm}>
                        <Icon type="close" /> Close
                        </Button>
                      </ButtonGroup>
                    </Col>
                    <Col  xs={0} sm={0} md={0} lg={24}>
                      <WeekdaySelectBox
                        days={days}
                        showDrawer={this.showDrawer}
                        getSpecificDate={this.getSpecificDate}
                        getScheduleByDay={this.getScheduleByDay}
                        addTimesheet={this.addTimesheet}
                        getDayStatus={this.getDayStatus}
                      />
                    </Col>
                    <Col  xs={24} sm={24} md={24} lg={0}>
                      <WeekdaySelectBoxMobile
                        days={days}
                        showDrawer={this.showDrawer}
                        getSpecificDate={this.getSpecificDate}
                        getScheduleByDay={this.getScheduleByDay}
                        addTimesheet={this.addTimesheet}
                        getDayStatus={this.getDayStatus}
                      />
                    </Col>
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
                extra={
                  <Button
                    type="primary"
                    onClick={this.showScheduleForm}
                  >
                    <Icon type="plus" /> Add new Timesheet
                  </Button>}
              /> :
              <Row gutter={16} className="timesheets-row">
                <Col xs={24} sm={24} md={24} lg={10} xl={11}>
                  <Row>
                    <Col span={24} className="timesheet">
                      <div className="timesheet-indicator">
                        <Row>
                          <Col xs={18} sm={20} md={19} span={21} className="title">
                            <Icon type="calendar" /> Add new Timesheet
                          </Col>
                          <Col xs={6} sm={4} md={5} span={3} className="navigator">
                            <Button
                              type="link"
                              onClick={this.showScheduleForm}
                              disabled={length(timesheets) > 4}
                            >
                              <Icon type="plus-circle" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                    {
                    map(ts => {
                      return(
                        <Col span={24} key={ts.id} className="timesheet">
                          <Timesheets
                            timesheet={ts}
                            showTimesheet={this.showTimesheet}
                          />
                          {
                            !isEmptyOrNull(timesheet) && equals(ts, timesheet) ?
                            <Col xs={24} sm={24} md={24} lg={0} >
                              <SingleTimesheet
                                days={days}
                                timesheet={timesheet}
                                getTimesheetShiftByDay={this.getTimesheetShiftByDay}
                                deleteTimesheet={this.deleteTimesheet}
                                changeShiftAvailability={this.changeShiftAvailability}
                                showEditShiftModal={this.showEditShiftModal}
                                getDayStatus={this.getDayStatus}
                              />
                            </Col>:
                            ''
                          }
                        </Col>
                      )
                    }, timesheets)
                  }
                  </Row>
                </Col>
                <Col xs={0} sm={0} md={0} lg={14} xl={{ span: 12, offset: 1 }}>
                  {
                    isEmptyOrNull(timesheet) ?
                    '' :
                    <SingleTimesheet
                      days={days}
                      timesheet={timesheet}
                      getTimesheetShiftByDay={this.getTimesheetShiftByDay}
                      deleteTimesheet={this.deleteTimesheet}
                      changeShiftAvailability={this.changeShiftAvailability}
                      showEditShiftModal={this.showEditShiftModal}
                      getDayStatus={this.getDayStatus}
                    />
                  }
                </Col>
              </Row>
            }
            <div className="drawer">
              <Drawer
                title={`${selectedDay} (${moment(specificDate).format('ll')})`}
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
                  disabled={selectedShift === '' || (selectedShift === 'Customized Shift' && (startTime === '' || endTime === ''))}
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
                      addStartTime={this.addStartTime}
                      addEndTime={this.addEndTime}
                      selectShift={this.selectShift}
                    />
                  </span>
                }
                submitText={
                  <span>
                    <Icon type="save" /> Update
                  </span>
                }
                cancelText={<><Icon type="close" /> Close </>}
                submitHandler={this.updateTimesheetShift}
                cancelHandler={this.hideEditShiftModal}
              />
            </div>
          </div>
        </div>
      </Spin>
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
