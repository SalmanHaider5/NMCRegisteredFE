import React from 'react'
import { Row, Col } from 'antd'
import { PersonalDetails } from './PersonalDetails'
import { AddressDetails } from './AddressDetails'
import { ProfessionalDetails } from './ProfessionalDetails'
import { BankDetails } from './BankDetails'
import { CardContainer } from '../../../../utils/custom-components'
import { EditFormModal } from './EditFormModal'
import './profile.css'

const Profile = (props) => {

  const { showEditFormModal } = props

  return (
    <div className="inner-wrapper">
      <div className="steps-content">
        <div className="steps-header">
          <h3>Profile</h3>
        </div>
        <div className="profile-view">
          <Row>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <CardContainer
                icon="user"
                title="Personal Details"
                name="Personal"
                clickHandler={showEditFormModal}
                wrapper={<PersonalDetails {...props} />}
              />
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <CardContainer
                icon="environment"
                title="Address Details"
                name="Address"
                clickHandler={showEditFormModal}
                wrapper={<AddressDetails {...props} />}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <CardContainer
                icon="highlight"
                title="Professional Details"
                name="Professional"
                clickHandler={showEditFormModal}
                wrapper={<ProfessionalDetails {...props} />}
              />
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <CardContainer
                icon="bank"
                title="Bank Details"
                name="Bank"
                clickHandler={showEditFormModal}
                wrapper={<BankDetails {...props} />}
              />
            </Col>
          </Row>
          <EditFormModal {...props} />
        </div>
      </div>
    </div>
  )
}

export default Profile
