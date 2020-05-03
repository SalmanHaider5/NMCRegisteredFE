import React from 'react'
import { Card, Icon, List, Button, Tooltip, Modal } from 'antd'
import { isEmptyOrNull } from '../../../../utils/helpers'
import { DocumentViewer } from '../../../../utils/custom-components'
import { SERVER_URL as url } from '../../../../constants'

const ProfessionalCard = ({
  professional,
  documentModal,
  documentModalType,
  showDocumentModal,
  hideDocumentModal,
  getDocumentType,
  imageModal,
  showImageModal,
  hideImageModal
}) => {
  const {
    status,
    fullName,
    profilePicture,
    document,
    crbDocument,
    shift,
    time,
    email,
    phone,
    nmcPin
  } = professional
  return (
    <Card
      title={
        <span>
          <Icon type="user" /> {fullName}
        </span>
      }
      extra={
        <span>
          <Icon type={status === 'Female' ? 'woman' : 'man'} /> {status}
        </span>
      }
      actions={[
        <Tooltip title="Professional ID">
          <Button type="link" onClick={showImageModal} disabled={isEmptyOrNull(profilePicture)}>
            <Icon type="user" />
          </Button>
        </Tooltip>,
        <Tooltip title="CV/Resume">
          <Button type="link" onClick={() => showDocumentModal('CV/Resume')} disabled={isEmptyOrNull(document)}>
            <Icon type="file-pdf" />
          </Button>
        </Tooltip>,
        <Tooltip title="DBS Document">
          <Button type="link" onClick={() => showDocumentModal('CRB')} disabled={isEmptyOrNull(crbDocument)}>
            <Icon type="audit" />
          </Button>
        </Tooltip>
      ]}
    >
      <List className="professional-details">
        <List.Item>
          <label>
            <Icon type="clock-circle" /> {shift}
          </label>
          <span>{time}</span>
        </List.Item>
        <List.Item>
          <label>
            <Icon type="mail" /> Email 
          </label>
          <span>{email}</span>
        </List.Item>
        <List.Item>
          <label>
            <Icon type="phone" /> Phone 
          </label>
          <span>{phone}</span>
        </List.Item>
        <List.Item>
          <label>
            <Icon type="profile" /> NMC Pin 
          </label>
          <span>{nmcPin}</span>
        </List.Item>
      </List>
      <Modal
        visible={imageModal}
        onCancel={hideImageModal}
        footer={null}
        bodyStyle={{
          padding: 0
        }}
      >
        <div className="professionals-card modal-image">
          <img alt={fullName} src={`${url}${profilePicture}`} style={{ width: '100%'}} />
        </div>
      </Modal>
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
    </Card>
  )
}
export default ProfessionalCard
