import React from 'react'
import { prop } from 'ramda'
import { Row, Col, Card, Icon, Button, Spin } from 'antd'
import PersonalDetailsForm from '../Forms/PersonalDetailsForm'
import ProfessionalDetailsForm from '../Forms/ProfessionalDetailsForm'
import PaymentForm from '../Forms/PaymentForm'

import './addDetails.css'
import { isEmptyOrNull } from '../../../utils/helpers'
import { last } from 'ramda'

const AddDetails = ({
  findAddresses,
  addressSelectHandler,
  charityStatusChange,
  subsidiaryStatusChange,
  addresses,
  getFormIcon,
  current,
  adBlockerExists,
  next,
  prev,
  charity,
  subsidiary,
  saveDetails,
  companyDetails,
  getFormName,
  invalid,
  changePostalCode,
  skipPaymentOption,
  formValues,
  makePaymentRequest,
  secret,
  isLoading,
  paypalToken,
  paypalPayment,
  makePaypalPayment,
  termsDrawer,
  showTermsDrawer,
  hideTermsDrawer
}) => {
  const components = [
    <PersonalDetailsForm />,
    <ProfessionalDetailsForm
      addresses={addresses}
      findAddresses={findAddresses}
      formValues={formValues}
      addressSelectHandler={addressSelectHandler}
      charityStatusChange={charityStatusChange}
      subsidiaryStatusChange={subsidiaryStatusChange}
      subsidiary={subsidiary}
      changePostalCode={changePostalCode}
      charity={charity}
    />,
    <PaymentForm
      makePaymentRequest={makePaymentRequest}
      skipPaymentOption={skipPaymentOption}
      adBlockerExists={adBlockerExists}
      paypalToken={paypalToken}
      formValues={formValues}
      secret={secret}
      paypalPayment={paypalPayment}
      makePaypalPayment={makePaypalPayment}
      termsDrawer={termsDrawer}
      showTermsDrawer={showTermsDrawer}
      hideTermsDrawer={hideTermsDrawer}
    />
  ]
  return (
    <Spin spinning={isLoading} tip="Loading...">
      <div className="addform-container">
        <Row className="addform-panel">
          <Col xs={0} sm={0} md={0} lg={7} xl={5} offset={1} className="progress-panel">
            <div className="progress-tail">
              {
                isEmptyOrNull(companyDetails) ?
                getFormIcon(current, 'form-icon') :
                <Icon type="money-collect" className="form-icon" />
              }
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={17} xl={19} className="form-panel">
            <Card
              title={
                <span>
                  {
                    isEmptyOrNull(prop('firstName', companyDetails)) ?
                    <span>
                      {getFormIcon(current)} {getFormName(current)}
                    </span>:
                    <span>
                      <Icon type="money-collect" /> Payment Process
                    </span>
                  }
                </span>
              }
              bordered={false}
            >
              { isEmptyOrNull(prop('firstName', companyDetails)) ?
                components[current] :
                last(components)
              }
              <Row>
                <Col span={5} offset={3}>
                {
                  current === 1 ?
                    <Button type="primary" onClick={prev}>
                      <Icon type="left" /> Previous
                    </Button>:
                  ''
                }
                </Col>
                <Col span={12} offset={1} className="form-actions">
                  {
                    current === 1 ?
                    <Button className="next-btn success-btn" disabled={invalid} onClick={saveDetails}>
                      <Icon type="check" /> Save
                    </Button> :
                    isEmptyOrNull(prop('firstName', companyDetails)) ?
                    <Button className="next-btn" type="primary" disabled={invalid} onClick={next}>
                      Next <Icon type="right" />
                    </Button> :
                    ''
                  }
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </Spin>
  )
}
export default AddDetails