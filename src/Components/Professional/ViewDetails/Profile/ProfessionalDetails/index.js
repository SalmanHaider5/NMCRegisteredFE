import React from 'react'
import { List, Icon, Divider, Tooltip, Modal, Avatar, Col, Button } from 'antd'
import { SERVER_URL as url } from '../../../../../constants'
import { isEmptyOrNull } from '../../../../../utils/helpers'
import { DocumentViewer } from '../../../../../utils/custom-components'
import WorkExperience from '../WorkExperience'

const ProfessionalDetails = ({
  professional,
  getDocumentType,
  documentModal,
  documentModalType,
  showDocumentModal,
  hideDocumentModal,
  showImageModal,
  imageModal,
  hideImageModal
}) => {
  const {
    fullName,
    nmcPin,
    cpdHours,
    qualification,
    document,
    crbDocument,
    profilePicture
  } = professional
  return (
    <>
      <Col xs={24} sm={24} md={24} lg={{ span: 11, offset: 0 }} xl={{ span: 11, offset: 0 }}>
        <List className="profile-list">
          <List.Item>
            <label>
              <Icon type="profile" />
              NMC Pin
            </label>
            <span className="label-value">{nmcPin}</span>
          </List.Item>
          <List.Item>
            <label>
              <Icon type="highlight" />
              Qualification
            </label>
            <span className="label-value">{qualification}</span>
          </List.Item>
          <List.Item>
            <label>
              <Icon type="hourglass" />
              CPD
            </label>
            <span className="label-value">{cpdHours} Hours</span>
          </List.Item>
        </List>
      </Col>
      <Col xs={24} sm={24} md={24} lg={{ span: 11, offset: 2 }} xl={{ span: 11, offset: 2 }}>
        <List className="profile-list">
          <List.Item>
            <label>
              <Icon type="audit" />
              DBS Number
            </label>
            <span className="label-value">
              {
                isEmptyOrNull(crbDocument) ?
                `Not added yet` :
                crbDocument
              }
            </span>
          </List.Item>
          <List.Item>
            <label>
              <Icon type="user" />
              Photo ID
            </label>
            <span className="label-value">
              {
                isEmptyOrNull(profilePicture) ?
                'Not added yet':
                <Tooltip title="View Profile ID">
                  <Button type="link" onClick={() => showImageModal()}>
                    <Avatar src={`${url}${profilePicture}`} />
                  </Button>
                </Tooltip>
              }
            </span>
            <Modal
              visible={imageModal}
              onCancel={hideImageModal}
              footer={null}
              bodyStyle={{
                padding: 0
              }}
            >
              <div className="modal-image">
                <img alt={fullName} src={`${url}${profilePicture}`} style={{ width: '100%'}} />
              </div>
            </Modal>
          </List.Item>
        </List>
        <Modal
          visible={documentModal}
          footer={null}
          style={{
            top: 20
          }}
          className="document-modal"
          bodyStyle={{
            padding: 0,
            overflow: 'hidden',
            backgroundColor: 'transparent'
          }}
          maskStyle={{
            color: '#000'
          }}
          width={getDocumentType(documentModalType === 'CRB' ? crbDocument : document) === 'document' ? 750 : 'fit-content'}
          onCancel={hideDocumentModal}
        >
          <DocumentViewer document={documentModalType === 'CRB' ? crbDocument : documentModalType === 'CV/Resume' ? document : ''} />
        </Modal>
      </Col>
      <Col span={24}>
        <Divider orientation="left">Work Experience</Divider>
        <WorkExperience professional={professional}/>
      </Col>
    </>
  )
}
export default ProfessionalDetails
