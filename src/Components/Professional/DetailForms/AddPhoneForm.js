import React from 'react'
import { Field } from 'redux-form'
import { ButtonTextField, ModalBox } from '../../../utils/custom-components'
import { isRequired, isNumber } from '../../../constants'
import MobileVerificationForm from '../MobileVerificationForm'

const AddPhoneForm = ({
	code,
	phoneVerified,
	showVerificationModal,
	hideVerificationModal,
	verifyProfessionalPhone
}) => {
	return (
		<div>
			<div className="steps-header">
				<h3>Mobile Verification</h3>
			</div>
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
				specialText={'Please add your phone to verify your account'}
			/>
			<ModalBox
				title={'Verify your Phone'}
				visible={(code === 'success' && !phoneVerified) || code === 'error'}
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
