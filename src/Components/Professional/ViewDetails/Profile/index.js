import React from 'react'
import { Card, Icon, Button, Row, Col, Spin } from 'antd'
import { ModalBox } from '../../../../utils/custom-components'
import PersonalDetails from './PersonalDetails/'
import AddressDetails from './AddressDetails/'
import ProfessionalDetails from './ProfessionalDetails/'
import WorkExperience from './WorkExperience/'
import PersonalDetailsForm from '../../DetailForms/PersonalDetailsForm'
import AddressForm from '../../DetailForms/AddressForm'
import './profile.css'

const Profile = ({
  isLoading,
  professional,
  formModal,
  formName,
  showEditFormModal,
  hideEditFormModal,
  findAddresses,
  addressSelectHandler,
  addresses
}) => {
  
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
                      type={"link"}
                      className={""}
                      onClick={() => showEditFormModal("Personal")}>
                      <Icon
                        type={"edit"}
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
                        <Button type="link">
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
                    <Button type="link" onClick={() => showEditFormModal("Address")}>
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
                        <Button type="link">
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
            <ModalBox
              title={`Edit ${formName} Details`}
              visible={formModal}
              size={800}
              content={
                formName === 'Personal' ?
                <PersonalDetailsForm /> :
                formName === 'Address' ?
                <AddressForm
                  findAddresses={findAddresses}
                  addressSelectHandler={addressSelectHandler}
                  addresses={addresses}
                /> :
                ''
              }
              submitText={
                <>
                  <Icon type="save" />
                  Update
                </>
              }
              cancelText={'Cancel'}
              // submitHandler={verifyProfessionalPhone}
              cancelHandler={hideEditFormModal}
            />
          </div>  
        </div>
      </div>
    </Spin>
  )
}

export default Profile
