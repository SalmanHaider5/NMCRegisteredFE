import React from 'react'
import { Field } from 'redux-form'
import { defaultTo } from 'ramda'
import { Row, Col, DatePicker, Form } from 'antd'
import { QUALIFICATION_OPTIONS as skills, TIMESHEET_SHIFTS as shifts, DATE_FORMAT } from '../../../../constants'
import { SelectField } from '../../../../utils/custom-components'
import { isEmptyOrNull } from '../../../../utils/helpers'

const SearchForm = ({ isPaid, searchProfessionalsBySkills, formValues, showMessage, searchDateError }) => {
  const { searchForm = {} } = defaultTo({}, formValues)
  const { skill, searchDate } = searchForm
  const FormItem = Form.Item
  return (
    <Row>
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
        <FormItem
          label={'Pick a Date'}
          labelCol={{ span: 5, offset: 3 } }
          wrapperCol={{ span: 10 }}
          labelAlign='left'
          colon={false}
          extra={<span className="field-error">{searchDateError}</span>}
        >
          <DatePicker
            onChange={value => showMessage('date', value)}
            format={DATE_FORMAT}
            placeholder={'Choose Date'}
            disabled={!isPaid || isEmptyOrNull(skill)}
          />
        </FormItem>
      </Col>
      <Col span={12}>
        <Field
          name="shift"
          component={SelectField}
          options={shifts}
          hintText={'Choose a Shift'}
          label={'Shifts'}
          onChange={searchProfessionalsBySkills}
          disabled={!isPaid || isEmptyOrNull(searchDate) || !isEmptyOrNull(searchDateError)}
        />
      </Col>
    </Row>
  )
}

export default SearchForm
