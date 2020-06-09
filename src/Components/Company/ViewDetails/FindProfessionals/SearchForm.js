import React from 'react'
import { Field } from 'redux-form'
import { defaultTo, map } from 'ramda'
import { Row, Col, DatePicker, Form, Steps, Icon, Radio, Divider, Button } from 'antd'
import { QUALIFICATION_OPTIONS as skills, TIMESHEET_SHIFTS as shifts, DATE_FORMAT } from '../../../../constants'
import { SelectField } from '../../../../utils/custom-components'
import { isEmptyOrNull } from '../../../../utils/helpers'

const SearchForm = ({
  isPaid,
  searchProfessionalsBySkills,
  formValues,
  showMessage,
  searchDateError,
  datePickerType,
  changeDatePickerType
}) => {
  const { searchForm = {} } = defaultTo({}, formValues)
  const { skill, searchDate, shift } = searchForm
  const { Step } = Steps
  const FormItem = Form.Item
  const { RangePicker } = DatePicker
  
  const getDateState = (skill, date) => {
    if(isEmptyOrNull(skill)){
      return 'wait'
    }else{
      return isEmptyOrNull(date) ? 'process' : 'finish' 
    }
  }

  const getShiftState = (skill, date, shift) => {
    if(isEmptyOrNull(skill) || isEmptyOrNull(date)){
      return 'wait'
    }else{
      return isEmptyOrNull(shift) ? 'process' : 'finish'
    }
  }

  const getFinalState = (shift) => {
    return isEmptyOrNull(shift) ? 'wait' : 'finish'
  }

  return (
    <span>
      <Row className="search-form-container">
        <Steps className="process-steps">
          <Step status={ isEmptyOrNull(skill) ? 'process' : 'finish' } title="Choose a Skill" icon={<Icon type="highlight" />} />
          <Step status={getDateState(skill, searchDate)} title="Pick a Date" icon={<Icon type="calendar" />} />
          <Step status={getShiftState(skill, searchDate, shift)} title="Select a Shift" icon={<Icon type="hourglass" />} />
          <Step status={getFinalState(shift)} title="Done" icon={<Icon type="smile-o" />} />
        </Steps>
        <Col span={12}>
          <Field
            name="skill"
            component={SelectField}
            options={skills}
            hintText={'Choose a Skill'}
            disabled={!isPaid}
            onChange={value => showMessage('skill', value)}
            label={'Skills'}
          />
        </Col>
        <Col span={12}>
          <FormItem
            label={'Pick a Date'}
            labelCol={{ span: 5, offset: 3 } }
            wrapperCol={{ span: 10 }}
            labelAlign='left'
            colon={false}
            extra={
              isEmptyOrNull(searchDateError) ?
              <Button
                className="link-button"
                type="link"
                disabled={!isPaid || isEmptyOrNull(skill)}
                onClick={changeDatePickerType}
              >
                { datePickerType === 'singular' ? 'Multiple Days?' : 'Single Day?' }
              </Button> :
              <span className="field-error">{searchDateError}</span>
            }
          >
            {
              datePickerType === 'singular' ?
              <DatePicker
                onChange={value => showMessage('date', value)}
                format={DATE_FORMAT}
                placeholder={'Choose Date'}
                disabled={!isPaid || isEmptyOrNull(skill)}
              />:
              <RangePicker
                onChange={value => showMessage('date', value)}
                format={DATE_FORMAT}
                placeholder={'Choose Date'}
                disabled={!isPaid || isEmptyOrNull(skill)}
              />
            }
          </FormItem>
        </Col>
      </Row>
      <Row className="shifts-row">
        <Radio.Group value={shift} onChange={searchProfessionalsBySkills} buttonStyle="solid">
          {
            map(shift=>{
              return (
                <Radio.Button
                  key={shift.id}
                  value={shift.id}
                  disabled={!isPaid || isEmptyOrNull(searchDate) || !isEmptyOrNull(searchDateError)}
                >
                  <span className="shift-name">{shift.name}</span>
                  {!isPaid || isEmptyOrNull(searchDate) || !isEmptyOrNull(searchDateError) ? '' : 
                    <>
                      <Divider/>
                      <span className="shift-time">{shift.startTime} - {shift.endTime}</span>
                    </>
                  }
                </Radio.Button>
              )
            }, shifts)
          }
        </Radio.Group>
      </Row>
    </span>
  )
}

export default SearchForm
