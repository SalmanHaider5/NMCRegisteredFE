import React from 'react'
import { Field } from 'redux-form'
import { Row, Col, message } from 'antd'
import { QUALIFICATION_OPTIONS as skills, TIMESHEET_SHIFTS as shifts } from '../../../../constants'
import { SelectField, DatePickerField } from '../../../../utils/custom-components'
import { isEmptyOrNull } from '../../../../utils/helpers'

const SearchForm = ({ isPaid, searchProfessionalsBySkills, formValues }) => {
  const { searchForm: { skill, searchDate } } = formValues
  const showMessage = type => {
    if(type === 'skill')
      message.success('Pick a Date')
    if(type === 'date')
      message.success('Choose a Shift')
  }
  return (
    <Row>
      <Col span={12}>
        <Field
          name="skill"
          component={SelectField}
          options={skills}
          hintText={'Choose a Skill'}
          disabled={!isPaid}
          onChange={() => showMessage('skill')}
          label={'Skills'}
        />
        <Field
          name="searchDate"
          component={DatePickerField}
          label={'Pick a Date'}
          onChange={() => showMessage('date')}
          disabled={!isPaid || isEmptyOrNull(skill)}
        />
      </Col>
      <Col span={12}>
        <Field
          name="shift"
          component={SelectField}
          options={shifts}
          hintText={'Choose a Shift'}
          label={'Shifts'}
          onChange={searchProfessionalsBySkills}
          disabled={!isPaid || (isEmptyOrNull(searchDate) || isEmptyOrNull(skill) )}
        />
      </Col>
    </Row>
  )
}

export default SearchForm
