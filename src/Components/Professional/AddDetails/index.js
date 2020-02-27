import React from 'react'
import { Row, Col, Card, Timeline, Icon, Button } from 'antd'
import AddPhoneForm from '../DetailForms/AddPhoneForm'
import PersonalDetailsForm from '../DetailForms/PersonalDetailsForm'
import AddressForm from '../DetailForms/AddressForm'
import ProfessionalDetailsForm from '../DetailForms/ProfessionalDetailsForm'

import './addDetails.css'

const AddDetails = ({ findAddresses, addressSelectHandler, addresses }) => {
  // const { Step } = Steps
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
              <>
                <Icon type="solution" />
                Mobile Verification
              </>
            }
            bordered={false}
          >
            <ProfessionalDetailsForm
            />
            <Row>
              <Col span={5} offset={3}></Col>
              <Col span={12} offset={1} className="form-actions">
                <Button className="success-btn" size="large">
                  <Icon type="check" />
                  Save
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
export default AddDetails