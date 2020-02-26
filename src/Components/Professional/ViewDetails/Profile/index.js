import React from 'react'
import { Card, Icon, Button, Row, Col, Spin } from 'antd'
import PersonalDetails from './PersonalDetails/'
import AddressDetails from './AddressDetails/'
import ProfessionalDetails from './ProfessionalDetails/'
import WorkExperience from './WorkExperience/'
// import PersonalDetailsForm from '../../DetailForms/PersonalDetailsForm'
import './profile.css'

const Profile = ({ isLoading, professional, personalDetailsEditForm, editPersonalDetails }) => {
  return (
    <Spin spinning={isLoading} tip="Loading...">
      <div className="inner-wrapper">
        <div className="steps-content">
          <div className="steps-header">
            <h3>Profile</h3>
          </div>
          <div className="profile-view">
            <Row>
              <Col span={10} offset={1}>
                <Card
                  title={
                    <span>
                      <Icon type="user" />
                      Personal Details
                    </span>
                  }
                  extra={
                    <Button
                      type={personalDetailsEditForm ? "default" : "link"}
                      className={personalDetailsEditForm ? "success-btn" : ""}
                      onClick={editPersonalDetails}>
                      <Icon
                        type={personalDetailsEditForm ? "check" : "edit"}
                      />
                    </Button>
                  }
                >
                  {
                    <PersonalDetails
                      professional={professional}
                    />
                  }
                </Card>
                <Row>
                  <Col span={24}>
                    <Card
                      title={
                        <span>
                          <Icon type="solution" />
                          Professional Details
                        </span>
                      }
                      extra={
                        <Button type="link" onClick={editPersonalDetails}>
                          <Icon type="edit" />
                        </Button>
                      }
                    >
                      {
                        <ProfessionalDetails
                          professional={professional}
                        />
                      }
                    </Card>
                  </Col>
                </Row>
              </Col>
              <Col span={14} offset={1}>
                <Card
                  title={
                    <span>
                      <Icon type="environment" />
                      Address Details
                    </span>
                  }
                  extra={
                    <Button type="link" onClick={editPersonalDetails}>
                      <Icon type="edit" />
                    </Button>
                  }
                >
                  {
                    <AddressDetails
                      professional={professional}
                    />
                  }
                </Card>
                <Row>
                  <Col span={24}>
                    <Card
                      title={
                        <span>
                          <Icon type="book" />
                          Work Experience
                        </span>
                      }
                      extra={
                        <Button type="link" onClick={editPersonalDetails}>
                          <Icon type="edit" />
                        </Button>
                      }
                    >
                      {
                        <WorkExperience
                          professional={professional}
                        />
                      }
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>  
        </div>
      </div>
    </Spin>
  )
}

export default Profile
