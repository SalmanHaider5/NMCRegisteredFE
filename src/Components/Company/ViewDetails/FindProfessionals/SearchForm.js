import React from 'react'
import { Field } from 'redux-form'
import { defaultTo, head, last, insert } from 'ramda'
import { Row, Col, Icon, Button, message } from 'antd'
import { QUALIFICATION_OPTIONS, TIMESHEET_SHIFTS } from '../../../../constants'
import { SelectField, ButtonTextField } from '../../../../utils/custom-components'
import { ShiftsCheckboxes } from './ShiftsCheckboxes'
import { ActionButtons } from './ActionButtons'

const SearchForm = (props) => {

  const {
    formValues,
    profile,
    currentWeek,
    skipCurrentWeek,
    resetWeek
  } = props

  const { isPaid } = defaultTo({}, profile)
  const { searchForm = {} } = defaultTo({}, formValues)
  const { skill } = searchForm
  const skills = insert(0, {id: 10, name: 'All Skills'}, QUALIFICATION_OPTIONS)
  const shifts = insert(0, {id: 0, name: 'Shifts & Dates'}, TIMESHEET_SHIFTS)

  return (
    <span>
      <Row className="search-form-container">

        <Col span={12}>
          <Field
            readOnly
            name="week"
            component={ButtonTextField}
            enterButton={<><Icon type="reload" /> Reset</>}
            fieldData={`${head(currentWeek)} - ${last(currentWeek)}`}
            onSearch={resetWeek}
            label="1. Select Week"
            specialText={
              <Button
                type="link"
                className="link-button"
                onClick={skipCurrentWeek}
              > Next Week?
              </Button>
            }
          />
        </Col>

        <Col span={12}>
          <Field
            name="skill"
            component={SelectField}
            onChange={() => message.success('Select Shifts')}
            options={skills}
            hintText={'Choose a Skill'}
            disabled={!isPaid}
            label={'2. Skills'}
          />
        </Col>
      </Row>
      <h4 style={{ margin: '0 auto', textAlign: 'left', width: '84%' }}>3. Select Shifts</h4>
      <Row className="shifts-row">
        <ShiftsCheckboxes
          skill={skill}
          shifts={shifts}
          currentWeek={currentWeek}
        />
        <ActionButtons {...props} skill={skill} />
      </Row>
    </span>
  )
}

export default SearchForm
