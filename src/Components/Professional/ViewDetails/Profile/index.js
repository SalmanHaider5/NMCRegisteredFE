import React from 'react'
import { Card, Icon, Button, Row, Col, Spin } from 'antd'
import PersonalDetails from './PersonalDetails/'
import PersonalDetailsForm from '../../DetailForms/PersonalDetailsForm'
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
              <Col span={personalDetailsEditForm ? 24 : 12} offset={1}>
                <Card
                  title={
                    <span>
                      <Icon type="solution" />
                      Personal Details
                    </span>
                  }
                  extra={
                    <Button
                      type={personalDetailsEditForm ? "default" : "primary"}
                      className={personalDetailsEditForm ? "success-btn" : ""}
                      onClick={editPersonalDetails}>
                      <Icon
                        type={personalDetailsEditForm ? "check" : "edit"}
                      />
                    </Button>
                  }
                >
                  {
                    personalDetailsEditForm ?
                    <PersonalDetailsForm /> :
                    <PersonalDetails
                      professional={professional}
                    />
                  }
                </Card>
              </Col>
              <Col span={12} offset={1}>
                <Card
                  title={
                    <span>
                      <Icon type="solution" />
                      Personal Details
                    </span>
                  }
                  extra={
                    <Button type="primary" onClick={editPersonalDetails}>
                      <Icon type="edit" />
                    </Button>
                  }
                >
                  {
                    personalDetailsEditForm ?
                    <PersonalDetailsForm /> :
                    <PersonalDetails
                      professional={professional}
                    />
                  }
                </Card>
              </Col>
            </Row>
          </div>  
        </div>
      </div>
    </Spin>
  )
}

export default Profile
