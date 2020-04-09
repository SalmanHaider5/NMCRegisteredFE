import React from 'react'
import { Card, Icon, Button, Row, Col, Spin } from 'antd'
import { ModalBox } from '../../../../utils/custom-components'
import PersonalDetails from './PersonalDetails/'
import AddressDetails from './AddressDetails/'
import ProfessionalDetails from './ProfessionalDetails/'
import PersonalDetailsForm from '../../DetailForms/PersonalDetailsForm'
import AddressForm from '../../DetailForms/AddressForm'
import ProfessionalDetailsForm from '../../DetailForms/ProfessionalDetailsForm'
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
  formValues,
  phoneVerified,
  showImageModal,
  hideImageModal,
  imageModal,
  fileRemoveHandler,
  imageRemoveHandler,
  crbRemoveHandler,
  showDocumentModal,
  hideDocumentModal,
  documentModal,
  documentModalType,
  getDocumentType
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
              <Col span={10}>
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
                      phoneVerified={phoneVerified}
                    />
                  }
                </Card>
              </Col>
              <Col span={14}>
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
              </Col>
            </Row>
            <Row>
              <Col span={24} className='pro-card'>
                <Card
                  title={
                    <span>
                      <Icon type="pencil" />
                      Professional Details
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
                      showDocumentModal={showDocumentModal}
                      hideDocumentModal={hideDocumentModal}
                      documentModal={documentModal}
                      documentModalType={documentModalType}
                      getDocumentType={getDocumentType}
                      imageModal={imageModal}
                      showImageModal={showImageModal}
                      hideImageModal={hideImageModal}
                    />
                  }
                </Card>
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
                  fileRemoveHandler={fileRemoveHandler}
                  crbRemoveHandler={crbRemoveHandler}
                  imageRemoveHandler={imageRemoveHandler}
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