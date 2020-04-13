import React from 'react'
import { Field } from 'redux-form'
import { Row, Col } from 'antd'
import { QUALIFICATION_OPTIONS as skills, TIMESHEET_SHIFTS as shifts } from '../../../../constants'
import { SelectField, DatePickerField } from '../../../../utils/custom-components'

const SearchForm = ({ isPaid, searchProfessionalsBySkills }) => {
  return (
    <Row>
      <Col span={12}>
        <Field
          name="skill"
          component={SelectField}
          options={skills}
          hintText={'Choose a Skill'}
          disabled={!isPaid}
          onChange={searchProfessionalsBySkills}
          label={'Skills'}
        />
        <Field
          name="searchDate"
          component={DatePickerField}
          label={'Pick a Date'}
          disabled={!isPaid}
        />
      </Col>
      <Col span={12}>
        <Field
          name="shift"
          component={SelectField}
          options={shifts}
          hintText={'Choose a Shift'}
          label={'Shifts'}
          disabled={!isPaid}
        />
      </Col>
    </Row>
  )
}

export default SearchForm
