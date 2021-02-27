import React from 'react'
import { FormSection, Field } from 'redux-form'
import moment from 'moment'
import { CheckboxField } from '../../../../utils/custom-components'
import { isEmptyOrNull, mapIndexed } from '../../../../utils/helpers'

export const WeekCheckboxes = (props) => {

  const { currentWeek, shiftIndex, skill } = props

  return (
    <>
      {
        mapIndexed((date, index) => {
          return <span key={index}>
            { shiftIndex === 0 ?
              <div className="shift-date">
                {moment(date).format('Do MMM')}
              </div> :
              <div className="shift-cell">
                <FormSection name={`day${index}`}>
                  <Field
                    name={`shift${shiftIndex}`}
                    component={CheckboxField}
                    defaultValue={true}
                    disabled={isEmptyOrNull(skill) || moment(date).isBefore()}
                  />
                </FormSection>
              </div>}
          </span>
        }, currentWeek)
      }
    </>
  )
}
