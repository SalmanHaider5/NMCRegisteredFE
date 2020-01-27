import React from 'react'
import { Field } from 'redux-form'
import { TextField, CheckboxField, SelectField, DatePickerField } from '../../utils/custom-components'
import { isRequired } from '../../constants'



const BasicForm = () => {
    const options = [
        {id: 1, name: 'MBBS'},
        {id: 2, name: 'FCPS'}
    ]
    
    return (
        <div>
            <Field
                name="status"
                component={CheckboxField}
                label={'Status'}
                text={'Active'}
                validate={[isRequired]}
            />
            <Field
                name="fullName"
                component={TextField}
                label={'Full Name'}
                size={'large'}
                type="text"
                validate={[isRequired]}
                tooltipPlacement={'topRight'}
            />
            <Field
                name="dateOfBirth"
                component={DatePickerField}
                label={'Date of Birth'}
                size={'large'}
                type="text"
                validate={[isRequired]}
                tooltipPlacement={'topRight'}
            />
            <Field
                name="nmcPin"
                component={TextField}
                label={'NMC Pin Number'}
                size={'large'}
                type="text"
                validate={[isRequired]}
                tooltipPlacement={'topRight'}
            />
            <Field
                name="qualification"
                component={SelectField}
                label={'Qualification'}
                size={'large'}
                options={options}
                hintText={'Choose your Qualification'}
                validate={[isRequired]}
                tooltipPlacement={'topRight'}
            />
        </div>
    )
}

export default BasicForm
