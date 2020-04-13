import React from 'react'
import { Row, Col, Card, Icon, Button } from 'antd'
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
  next,
  prev,
  charity,
  subsidiary,
  saveDetails,
  companyDetails,
  getFormName,
  invalid,
  changePostalCode,
  skipPaymentOption
}) => {
  const components = [
    <PersonalDetailsForm />,
    <ProfessionalDetailsForm
      addresses={addresses}
      findAddresses={findAddresses}
      addressSelectHandler={addressSelectHandler}
      charityStatusChange={charityStatusChange}
      subsidiaryStatusChange={subsidiaryStatusChange}
      subsidiary={subsidiary}
      charity={charity}
    />,
    <PaymentForm />
  ]
  return (
    <div className="addform-container">
      <Row gutter={16} className="addform-panel">
        <Col span={5} offset={1} className="progress-panel">
          <div className="progress-tail">
            {
              isEmptyOrNull(companyDetails) ?
              getFormIcon(current, 'form-icon') :
              <Icon type="pound" className="form-icon" />
            }
          </div>
        </Col>
        <Col span={19} className="form-panel">
          <Card
            title={
              <span>
                {
                  isEmptyOrNull(companyDetails) ?
                  <span>
                    {getFormIcon(current)} {getFormName(current)}
                  </span>:
                  <span>
                    <Icon type="pound" /> Payment Process
                  </span>
                }
              </span>
            }
            bordered={false}
          >
            { isEmptyOrNull(companyDetails) ?
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
                  isEmptyOrNull(companyDetails) ?
                  <Button className="next-btn" type="primary" disabled={invalid} onClick={next}>
                    Next <Icon type="right" />
                  </Button> :
                  <span>
                    <Button className="next-btn" type="primary" disabled={true} onClick={next}>
                      Next <Icon type="right" />
                    </Button>
                    <Button className="skip-btn" type="danger" onClick={skipPaymentOption}>
                      Skip <Icon type="right-square" />
                    </Button>
                  </span>
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