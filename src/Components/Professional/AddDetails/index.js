import React from 'react'
import { length, prop } from 'ramda'
import { Row, Col, Card, Icon, Button } from 'antd'
import { isEmptyOrNull } from '../../../utils/helpers'
import AddPhoneForm from '../DetailForms/AddPhoneForm'
import PersonalDetailsForm from '../DetailForms/PersonalDetailsForm'
import AddressForm from '../DetailForms/AddressForm'
import ProfessionalDetailsForm from '../DetailForms/ProfessionalDetailsForm'
import BankDetailsForm from '../DetailForms/BankDetailsForm'

import './addDetails.css'

const AddDetails = ({
  findAddresses,
  addressSelectHandler,
  addresses,
  professional,
  verifyProfessionalPhone,
  sendVerificationCode,
  getFormIcon,
  phoneVerified,
  current,
  next,
  prev,
  saveDetails,
  formValues,
  getFormName,
  invalid,
  codeSent,
  dateHandler,
  editPhoneNumber,
  imageRemoveHandler,
  fileRemoveHandler,
  crbRemoveHandler,
  changePostalCode,
  saveBankDetails,
  onFileAttach
}) => {
  const { phone } = professional
  const isPhoneAdded = !isEmptyOrNull(phone) && phoneVerified ? true : false
  
  const components = [
    <PersonalDetailsForm
      addForm={true}
      dateHandler={dateHandler}
      formValues={formValues}
    />,
    <AddressForm
      findAddresses={findAddresses}
      addressSelectHandler={addressSelectHandler}
      addresses={addresses}
      changePostalCode={changePostalCode}
      addForm={true}
      formValues={formValues}
    />,
    <ProfessionalDetailsForm
      formValues={formValues}
      fileRemoveHandler={fileRemoveHandler}
      crbRemoveHandler={crbRemoveHandler}
      imageRemoveHandler={imageRemoveHandler}
      onFileAttach={onFileAttach}
    />
  ]
  return (
    <div className="addform-container">
      <Row className="addform-panel">
        <Col xs={0} sm={0} md={0} lg={7} xl={5} offset={1} className="progress-panel">
          <div className="progress-tail">
            {
              isPhoneAdded ?
                isEmptyOrNull(prop('fullName', professional)) ?
                  getFormIcon(current, 'form-icon')
                :
                <Icon type="bank" className="form-icon" />
              :
                <Icon type="solution" className="form-icon" />
            }
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={17} xl={19} className="form-panel">
          <Card
            title={
              isPhoneAdded ?
                isEmptyOrNull(prop('fullName', professional)) ?
                <span>
                  {getFormIcon(current)} {getFormName(current)}
                </span>:
                <span>
                  <Icon type="bank" /> Banking Details
                </span>
              :
              <span>
                <Icon type="solution" /> Mobile Verification
              </span>
            }
            bordered={false}
          >
            { 
              !isPhoneAdded ?
                <AddPhoneForm
                  formValues={formValues}
                  sendVerificationCode={sendVerificationCode}
                  codeSent={codeSent}
                  editPhoneNumber={editPhoneNumber}
                /> :
                isEmptyOrNull(prop('fullName', professional)) ?
                components[current] :
                <BankDetailsForm />
            }
            <Row>
              <Col span={5} offset={3}>
                {
                  current > 0 && current < 3 ?
                  <Button type="primary" onClick={prev}>
                    <Icon type="left" /> Previous
                  </Button> :
                  ''
                }
              </Col>
              <Col span={12} offset={1} className="form-actions">
                {
                  isPhoneAdded ?
                    current === 2 || !isEmptyOrNull(prop('fullName', professional)) ?
                    <Button
                      className="next-btn success-btn"
                      disabled={invalid}
                      onClick={isEmptyOrNull(prop('fullName', professional)) ? saveDetails: saveBankDetails}
                    >
                      <Icon type="check" /> Save
                    </Button> :
                    <Button className="next-btn" type="primary" disabled={current === 1 ? (invalid || length(addresses.addresses) === 0) : invalid} onClick={next}>
                      Next <Icon type="right" />
                    </Button> :
                  <Button className="success-btn next-btn" onClick={verifyProfessionalPhone} disabled={!codeSent}>
                    <Icon type="check-circle" /> Verify
                  </Button>  
                }
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
export default AddDetails