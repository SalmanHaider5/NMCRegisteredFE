import React from 'react'
import { equals, length, prop, not, defaultTo } from 'ramda'
import { isEmptyOrNull } from '../../../utils/helpers'
import AddPhoneForm from '../DetailForms/AddPhoneForm'
import PersonalDetailsForm from '../DetailForms/PersonalDetailsForm'
import AddressForm from '../DetailForms/AddressForm'
import ProfessionalDetailsForm from '../DetailForms/ProfessionalDetailsForm'
import BankDetailsForm from '../DetailForms/BankDetailsForm'
import { FormContainer } from '../../../utils/custom-components'

import './addDetails.css'
import { Loader } from '../../../utils/custom-components'

const AddDetails = (props) => {

  const {
    profile,
    phoneVerified,
    formValues,
    codeSent,
    addresses,
    formInvalid,
    saveDetails,
    dateHandler,
    findAddresses,
    editPhoneNumber,
    saveBankDetails,
    changePostalCode,
    imageRemoveHandler,
    addressSelectHandler,
    sendVerificationCode,
    verifyProfessionalPhone
  } = props

  const { phone } = profile,
    { isLoading } = addresses,
    { phoneCode } = defaultTo({}, formValues),
    isPhoneAdded = !isEmptyOrNull(phone) && phoneVerified ? true : false,
    addressesNotFound = equals(length(addresses.addresses), 0),
    profileCreated = not(isEmptyOrNull(prop('fullName', profile))),
    panelValiation= not(codeSent) || isEmptyOrNull(phoneCode)
  
  const getIcon = () => {
    if(isPhoneAdded && profileCreated){
      return 'bank'
    }else if(isPhoneAdded && not(profileCreated)){
      return 'user'
    }else if(not(isPhoneAdded)){
      return 'phone'
    }
  }

  const tabs = [
    {
      key: '1',
      icon: "user",
      label: "Personal Details",
      wrapper: 
        <PersonalDetailsForm
          dateHandler={dateHandler}
          formValues={formValues} 
        />,
      validation: formInvalid
    },
    {
      key: '2',
      icon: "environment",
      label: "Address Details",
      wrapper:
        <Loader
          size="large"
          isLoading={isLoading}
          loadingText={'Loading Addresses...'}
          wrapper={
            <AddressForm
              addresses={addresses}
              formValues={formValues}
              findAddresses={findAddresses}
              changePostalCode={changePostalCode}
              addressSelectHandler={addressSelectHandler}
            />
          }
        />,
      validation: formInvalid || addressesNotFound
    },
    {
      key: '3',
      icon: "highlight",
      label: "Experience Details",
      wrapper:
      <ProfessionalDetailsForm
        formValues={formValues}
        imageRemoveHandler={imageRemoveHandler}
      />,
      validation: formInvalid
    }
  ]

  return (
    <>
        <FormContainer
          icon={getIcon()}
          tabs={isPhoneAdded && not(profileCreated)}
          tabsData={tabs}
          tabsSubmit={saveDetails}
          panelValidation={profileCreated ? formInvalid : panelValiation}
          title={profileCreated ? 'Bank Details' : 'Phone Verification'}
          panelSubmit={profileCreated ? saveBankDetails : verifyProfessionalPhone}
          panelSubmitText={profileCreated ? 'Save' : 'Verify'}
          wrapper={
            profileCreated ?
            <BankDetailsForm />:
            <AddPhoneForm
              formValues={formValues}
              codeSent={codeSent}
              editPhoneNumber={editPhoneNumber}
              sendVerificationCode={sendVerificationCode}
            />
          }
        />
    </>
    // <div className="addform-container">
    //   <Row className="addform-panel">
    //     <Col xs={0} sm={0} md={0} lg={7} xl={5} offset={1} className="progress-panel">
    //       <div className="progress-tail">
    //         {
    //           isPhoneAdded ?
    //             isEmptyOrNull(prop('fullName', professional)) ?
    //               getFormIcon(current, 'form-icon')
    //             :
    //             <Icon type="bank" className="form-icon" />
    //           :
    //             <Icon type="solution" className="form-icon" />
    //         }
    //       </div>
    //     </Col>
        // <Col xs={24} sm={24} md={24} lg={17} xl={19} className="form-panel">
    //       <Card
    //         title={
    //           isPhoneAdded ?
    //             isEmptyOrNull(prop('fullName', professional)) ?
    //             <span>
    //               {getFormIcon(current)} {getFormName(current)}
    //             </span>:
    //             <span>
    //               <Icon type="bank" /> Banking Details
    //             </span>
    //           :
    //           <span>
    //             <Icon type="solution" /> Mobile Verification
    //           </span>
    //         }
    //         bordered={false}
    //       >
    //         { 
    //           !isPhoneAdded ?
    //             <AddPhoneForm
                  // formValues={formValues}
                  // sendVerificationCode={sendVerificationCode}
                  // codeSent={codeSent}
                  // editPhoneNumber={editPhoneNumber}
    //             /> :
    //             isEmptyOrNull(prop('fullName', professional)) ?
    //             components[current] :
    //             <BankDetailsForm />
    //         }
    //         <Row>
    //           <Col span={5} offset={3}>
    //             {
    //               current > 0 && current < 3 ?
    //               <Button type="primary" onClick={prev}>
    //                 <Icon type="left" /> Previous
    //               </Button> :
    //               ''
    //             }
    //           </Col>
    //           <Col span={12} offset={1} className="form-actions">
    //             {
    //               isPhoneAdded ?
    //                 current === 2 || !isEmptyOrNull(prop('fullName', professional)) ?
    //                 <Button
    //                   className="next-btn success-btn"
    //                   disabled={invalid}
    //                   onClick={isEmptyOrNull(prop('fullName', professional)) ? saveDetails: saveBankDetails}
    //                 >
    //                   <Icon type="check" /> Save
    //                 </Button> :
    //                 <Button className="next-btn" type="primary" disabled={current === 1 ? (invalid || length(addresses.addresses) === 0) : invalid} onClick={next}>
    //                   Next <Icon type="right" />
    //                 </Button> :
                  // <Button className="success-btn next-btn" onClick={verifyProfessionalPhone} disabled={!codeSent || isEmptyOrNull(formValues.phoneCode)}>
                  //   <Icon type="check-circle" /> Verify
                  // </Button>  
    //             }
    //           </Col>
    //         </Row>
    //       </Card>
    //     </Col>
    //   </Row>
    // </div>
  )
}
export default AddDetails