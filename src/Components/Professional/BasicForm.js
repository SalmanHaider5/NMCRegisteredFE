import React from 'react'
import { Field } from 'redux-form'
import { TextField, CheckboxField, ButtonTextField, SelectField, DatePickerField, ModalBox } from '../../utils/custom-components'
import { isRequired } from '../../constants'
import MobileVerificationForm from './MobileVerificationForm'



const BasicForm = ({
    verificationModal,
    showVerificationModal,
    hideVerificationModal
}) => {
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
                name="phone"
                component={ButtonTextField}
                enterButton={'Verify'}
                onSearch={showVerificationModal}
                label={'Phone'}
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
            <ModalBox
                title={'Verify your Phone'}
                visible={verificationModal}
                content={<MobileVerificationForm />}
                submitText={'Verify'}
                cancelText={'Resend'}
                submitHandler={hideVerificationModal}
                cancelHandler={hideVerificationModal}
            />
        </div>
    )
}

export default BasicForm
