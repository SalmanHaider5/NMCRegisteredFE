import React from 'react'
import { Field } from 'redux-form'
import { ButtonTextField, ModalBox } from '../../utils/custom-components'
import { isRequired, isNumber } from '../../constants'
import MobileVerificationForm from './MobileVerificationForm'

const AddPhoneForm = ({
    verificationModal,
    showVerificationModal,
    hideVerificationModal,
    verifyProfessionalPhone
}) => {
    
    return (
        <div>
            <Field
                name="phone"
                component={ButtonTextField}
                enterButton={'Verify'}
                onSearch={showVerificationModal}
                label={'Phone'}
                size={'large'}
                type="text"
                validate={[isRequired, isNumber]}
                tooltipPlacement={'topRight'}
            />
            <ModalBox
                title={'Verify your Phone'}
                visible={verificationModal}
                content={<MobileVerificationForm />}
                submitText={'Verify'}
                cancelText={'Resend'}
                submitHandler={verifyProfessionalPhone}
                cancelHandler={hideVerificationModal}
            />
        </div>
    )
}

export default AddPhoneForm
