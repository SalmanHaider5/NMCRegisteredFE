import React from 'react'
import { Row, Col, Card, Icon, Button } from 'antd'
import { isEmptyOrNull } from '../../../utils/helpers'
import AddPhoneForm from '../DetailForms/AddPhoneForm'
import PersonalDetailsForm from '../DetailForms/PersonalDetailsForm'
import AddressForm from '../DetailForms/AddressForm'
import ProfessionalDetailsForm from '../DetailForms/ProfessionalDetailsForm'

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
  fileChangeHandler,
  getFormName,
  invalid
}) => {
  const { phone } = professional
  const isPhoneAdded = !isEmptyOrNull(phone) || phoneVerified ? true : false
  
  const components = [
    <PersonalDetailsForm
      formValues={formValues}
      fileChangeHandler={fileChangeHandler}
    />,
    <AddressForm
      findAddresses={findAddresses}
      addressSelectHandler={addressSelectHandler}
      addresses={addresses}
    />,
    <ProfessionalDetailsForm
      formValues={formValues}
    />
  ]
  return (
    <div className="addform-container">
      <Row gutter={16} className="addform-panel">
        <Col span={5} offset={1} className="progress-panel">
          <div className="progress-tail">
            {
              isPhoneAdded ? getFormIcon(current, 'form-icon') :  <Icon type="solution" className="form-icon" />
            }
          </div>
        </Col>
        <Col span={19} className="form-panel">
          <Card
            title={
              isPhoneAdded ?
              <span>
                {getFormIcon(current)} {getFormName(current)}
              </span> :
              <span>
                <Icon type="solution" /> Mobile Verification
              </span>
            }
            bordered={false}
          >
            { isPhoneAdded ? components[current] :  <AddPhoneForm sendVerificationCode={sendVerificationCode} /> }
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
                    current === 2 ?
                    <Button className="next-btn success-btn" disabled={invalid} onClick={saveDetails}>
                      <Icon type="check" /> Save
                    </Button> :
                    <Button className="next-btn" type="primary" disabled={invalid} onClick={next}>
                      Next <Icon type="right" />
                    </Button> :
                  <Button className="success-btn next-btn" onClick={verifyProfessionalPhone}>
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