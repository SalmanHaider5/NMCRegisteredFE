import React from 'react'
import { Card, Icon, Button, Row, Col, Spin } from 'antd'
import { ModalBox } from '../../../../utils/custom-components'
import PersonalDetails from './PersonalDetails/'
import AddressDetails from './AddressDetails/'
import ProfessionalDetails from './ProfessionalDetails/'
import PersonalDetailsForm from '../../DetailForms/PersonalDetailsForm'
import AddressForm from '../../DetailForms/AddressForm'
import ProfessionalDetailsForm from '../../DetailForms/ProfessionalDetailsForm'
import WorkExperienceForm from '../../DetailForms/WorkExperienceForm'
import './profile.css'

const Profile = ({
  userId,
  isLoading,
  professional,
  formModal,
  formName,
  showEditFormModal,
  hideEditFormModal,
  findAddresses,
  addressSelectHandler,
  addresses,
  updateProfessionalDetails,
  getProfileStatus,
  invalid,
  formValues
}) => {
  const { dateOfBirth } = professional
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
                      formValues={formValues}
                      professional={professional}
                      getProfileStatus={getProfileStatus}
                    />
                  }
                </Card>
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
                        <Button type="link" onClick={() => showEditFormModal("Professional")}>
                          <Icon type="edit" />
                        </Button>
                      }
                    >
                      {
                        <ProfessionalDetails
                          professional={professional}
                          formValues={formValues}
                          userId={userId}
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
              size={formName === 'Experience' ? 500 : 800}
              content={
                formName === 'Personal' ?
                <PersonalDetailsForm
                  dateOfBirth={dateOfBirth}
                  formValues={formValues}
                /> :
                formName === 'Address' ?
                <AddressForm
                  findAddresses={findAddresses}
                  addressSelectHandler={addressSelectHandler}
                  addresses={addresses}
                /> :
                formName === 'Professional' ?
                <ProfessionalDetailsForm
                  formValues={formValues}
                /> :
                formName === 'Experience' ?
                <WorkExperienceForm /> :
                ''
              }
              submitText={
                <>
                  <Icon type="save" />
                  Update
                </>
              }
              cancelText={'Cancel'}
              submitDisabled={invalid}
              submitHandler={updateProfessionalDetails}
              cancelHandler={hideEditFormModal}
            />
          </div>  
        </div>
      </div>
    </Spin>
  )
}

export default Profile
