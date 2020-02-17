import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, getFormValues } from 'redux-form'
import { Row, Col, Button, Result, Icon, Divider, Drawer } from 'antd'
import { TimePickerField } from '../../utils/custom-components'
import { TIMESHEET_DAYS as days, TIMESHEET_SHIFTS as shifts } from '../../constants'
import WeekdaySelectBox from './WeekdaySelectBox'
import ShiftsSelectBox from './ShiftsSelectBox'
import './timesheet.css'

class Timesheet extends Component {
  constructor(props){
    super(props)
    this.state = {
      visible: false,
      selectedDay: '',
      selectedShift: ''
    }
  }

  showDrawer = (day) => {
    const { name } = day
    this.setState({
      visible: true,
      selectedDay: name,
      selectedShift: ''
    })
  }

  selectShift = (shift) => {
    const { name } = shift
    this.setState({ selectedShift: name })
  }

  hideDrawer = () => {
    this.setState({
      visible: false,
      selectedDay: ''
    })
  }

  render() {
    const { visible, selectedDay, selectedShift } = this.state
    return (
      <div>
        <headers>
          <div className='signup-headers'>
            <div className='header-body'>
                <Row>
                  <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                    <p className='logo'>LOGO</p>
                  </Col>
                  <Col xs={15} sm={16} md={16} lg={16} xl={16}></Col>
                  <Col xs={5} sm={4} md={4} lg={4} xl={4}>
                    <Button ghost onClick={this.logout}>Logout</Button>
                  </Col>
                </Row>
              </div>
          </div>
        </headers>
        <div className="signup-wrapper">
          <div className="inner-wrapper">
            <div className="steps-content">
              <div className="steps-header">
                <h3>Timesheet Management</h3>
              </div>
              <div>
                <Row gutter={16} className="weekly-row">
                  <WeekdaySelectBox days={days} showDrawer={this.showDrawer} />
                </Row>
              </div>
              <Divider>Timesheets</Divider>
              <Result
                title="No Timesheets Added"
                subTitle="You have not added any timesheet yet"
                extra={<Button type="primary"><Icon type="plus" />Add new Timesheet</Button>}
              />
              <div className="drawer">
                <Drawer
                  title={`${selectedDay} Timesheet`}
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
                    selectedShift === 'custom' ?
                    <>
                      <Field
                        name="startTime"
                        component={TimePickerField}
                        hintText={'Start Time'}
                        use12hours={true}
                      />
                      <Field
                        name="endTime"
                        component={TimePickerField}
                        hintText={'End Time'}
                        use12Hours={true}
                      />
                    </> :
                    ''
                  }
                  <Button
                    block
                    className="success-btn select-button"
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
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    formValues: getFormValues('timesheet')(state),
  }
}

export default connect(mapStateToProps)(
  reduxForm({
    form: 'timesheet'
  })(Timesheet)
)
