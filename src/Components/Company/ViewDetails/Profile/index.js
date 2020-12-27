import React from 'react'
import { Row, Col } from 'antd'
import PersonalDetails from './PersonalDetails/'
import { CardContainer } from '../../../../utils/custom-components'
import ProfessionalDetails from './ProfessionalDetails'
import PaymentCycle from './PaymentCycle'
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
                icon="highlight"
                title="Company Details"
                name="Company"
                clickHandler={showEditFormModal}
                wrapper={<ProfessionalDetails {...props} />}
              />
              <CardContainer
                icon="hourglass"
                title="Company Payment Cycle"
                name="Cycle"
                clickHandler={showEditFormModal}
                wrapper={<PaymentCycle {...props} />}
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
