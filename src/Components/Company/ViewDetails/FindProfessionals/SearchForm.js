import React from 'react'
import { Field, FormSection } from 'redux-form'
import moment from 'moment'
import { defaultTo, head, last, insert } from 'ramda'
import { Row, Col, Icon, Button } from 'antd'
import { QUALIFICATION_OPTIONS, TIMESHEET_SHIFTS } from '../../../../constants'
import { SelectField, ButtonTextField, CheckboxField } from '../../../../utils/custom-components'
import { isEmptyOrNull, mapIndexed } from '../../../../utils/helpers'

const SearchForm = ({
  isPaid,
  searchProfessionalsBySkills,
  formValues,
  showMessage,
  currentWeek,
  skipCurrentWeek,
  resetWeek,
  hideSearchDrawer
}) => {
  const { searchForm = {} } = defaultTo({}, formValues)
  const { skill } = searchForm
  const skills = insert(0, {id: 10, name: 'All Skills'}, QUALIFICATION_OPTIONS)
  const shifts = insert(0, {id: 0, name: 'Shifts & Dates'}, TIMESHEET_SHIFTS)

  return (
    <span>
      <Row className="search-form-container">
        <Col span={12}>
          <Field
            name="week"
            component={ButtonTextField}
            enterButton={<><Icon type="reload" /> Reset</>}
            fieldData={`${head(currentWeek)} - ${last(currentWeek)}`}
            onSearch={resetWeek}
            label="Select Week"
            specialText={<Button type="link" className="link-button" onClick={skipCurrentWeek}>Next Week?</Button>}
            readOnly
          />
        </Col>
        <Col span={11}>
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
      </Row>
      <Row className="shifts-row">
        {
          mapIndexed((shift, index) => {
            return <span key={index}>
              {
                isEmptyOrNull(shift.name) ? <div className="shift-name"></div> : <div className="shift-name">{shift.name}</div>
              }
              {
                mapIndexed((date, i) => {
                  return <span key={i}>
                    { index === 0 ?
                      <div className="shift-date">
                        {moment(date).format('Do MMM')}
                      </div> :
                      <div className="shift-cell">
                        <FormSection name={`day${i}`}>
                          <Field
                            name={`shift${index}`}
                            component={CheckboxField}
                            defaultValue={false}
                          />
                        </FormSection>
                      </div>}
                  </span>
                }, currentWeek)
              }
              <br />
            </span>
          }, shifts)
        }
        <div className="search-btn">
          <Button className="success-btn" disabled={isEmptyOrNull(skill)} onClick={searchProfessionalsBySkills}>
            <Icon type="search" /> Search
          </Button>
          <Button type="danger" onClick={hideSearchDrawer}>
            <Icon type="close" /> Cancel
          </Button>
        </div>
      </Row>
    </span>
  )
}

export default SearchForm
