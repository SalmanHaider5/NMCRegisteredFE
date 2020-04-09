import React from 'react'
import { Row, Col, Card, Icon, Button } from 'antd'
import PersonalDetailsForm from '../Forms/PersonalDetailsForm'
import ProfessionalDetailsForm from '../Forms/ProfessionalDetailsForm'
// import PaymentForm from '../Forms/PaymentForm'

import './addDetails.css'

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
  formValues,
  getFormName,
  invalid,
  changePostalCode
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
    />
  ]
  return (
    <div className="addform-container">
      <Row gutter={16} className="addform-panel">
        <Col span={5} offset={1} className="progress-panel">
          <div className="progress-tail">
            <Icon type="solution" className="form-icon" />
          </div>
        </Col>
        <Col span={19} className="form-panel">
          <Card
            title={
              <span>
                {getFormIcon(current)} {getFormName(current)}
              </span>
            }
            bordered={false}
          >
            { components[current] }
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
                  current === 1 ?
                  <Button className="next-btn success-btn" disabled={invalid} onClick={saveDetails}>
                    <Icon type="check" /> Save
                  </Button> :
                  <Button className="next-btn" type="primary" disabled={invalid} onClick={next}>
                    Next <Icon type="right" />
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