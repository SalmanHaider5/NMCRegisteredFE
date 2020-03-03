import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { reduxForm, getFormValues, change, reset } from 'redux-form'
import { isEmpty, length, add, find, propEq, map, range, init, head, last, nth, subtract } from 'ramda'
import { Row, Col, Button, Result, Icon, Divider, Drawer, TimePicker } from 'antd'
import { getTimesheetValues } from '../../../../utils/helpers'
import { addDailySchedule, addTimesheet, resetScheduleForm, removeTimesheet } from '../../../../actions'
import { TIMESHEET_DAYS as days, TIMESHEET_SHIFTS as shifts, TIME_FORMAT as timeFormat } from '../../../../constants'
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
      specificDate: ''
    }
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
    console.log(weeklyDates)
    this.setState({
      scheduleForm: true,
      weeklyDates
    })
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
    const { timesheet: { timesheet }, dispatch } = this.props
    console.log(timesheet)
    // dispatch(addTimesheet(timesheet))
    // this.setState({ scheduleForm: false })
  }

  getSpecificDate = day => {
    const { weeklyDates } = this.state
    const { id } = day
    this.setState({
      specificDate: nth(subtract(id, 1), weeklyDates)
    })
  }

  getTimesheetShiftByDay = (timesheetId, dayId) => {
    const { timesheet: { timesheets } } = this.props
    const selectedTimesheet = find(propEq('id', timesheetId))(timesheets)
    const { schedule } = selectedTimesheet
    return find(propEq('id', dayId))(schedule)
  } 

  render() {
    const { visible, selectedDay, selectedShift, scheduleForm, customizedShiftError, weeklyDates, specificDate } = this.state
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
                      <Col span={12}>
                        <SingleTimesheet
                          days={days}
                          timesheet={timesheet}
                          getTimesheetShiftByDay={this.getTimesheetShiftByDay}
                          deleteTimesheet={this.deleteTimesheet}
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
                />
                {
                  selectedShift === 'Customized Shift' ?
                  <span>
                    <TimePicker use12Hours format={timeFormat} onChange={this.addStartTime} placeholder="Start Time" />
                    <TimePicker use12Hours format={timeFormat} onChange={this.addEndTime} placeholder="End Time" />
                    <p className="error-message">{customizedShiftError}</p>
                  </span> :
                  ''
                }
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
