import React from 'react'
import { Card, Icon, List, Button, Tooltip, Modal } from 'antd'
import { defaultTo } from 'ramda'
import { isEmptyOrNull } from '../../../../utils/helpers'
import { DocumentViewer, ModalBox } from '../../../../utils/custom-components'
import { SERVER_URL as url } from '../../../../constants'
import { OfferForm } from './OfferForm'

const ProfessionalCard = ({
  professional,
  documentModal,
  documentModalType,
  showDocumentModal,
  hideDocumentModal,
  getDocumentType,
  imageModal,
  showImageModal,
  hideImageModal,
  offerModal,
  showOfferModal,
  hideOfferModal,
  company,
  offerFormShifts,
  formValues,
  submitOfferRequest
}) => {
  const {
    id,
    status,
    fullName,
    profilePicture,
    document,
    crbDocument,
    shift,
    time,
    nmcPin
  } = professional
  const { offerForm = {} } = defaultTo({}, formValues)
  const { shiftRate, shifts } = offerForm
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
            <Icon type="mail" /> NMC Pin 
          </label>
          <span>{nmcPin}</span>
        </List.Item>
        <List.Item>
          <label>
            <Icon type="solution" /> DBS Number 
          </label>
          <span>{crbDocument}</span>
        </List.Item>
        <List.Item>
          <label>
            <Icon type="form" /> Send an Offer 
          </label>
          <Button type="primary" shape="circle" onClick={() => showOfferModal(id)}><Icon type="paper-clip" /></Button>
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
      <ModalBox
        title={<>Send an Offer Request</>}
        visible={offerModal}
        top={20}
        size={800}
        content={<OfferForm company={company} offerFormShifts={offerFormShifts} />}
        submitText={<><Icon type="save" /> Send</>}
        cancelText={<><Icon type="close" /> Cancel </>}
        cancelHandler={hideOfferModal}
        submitHandler={submitOfferRequest}
        submitDisabled={isEmptyOrNull(shiftRate) || isEmptyOrNull(shifts)}
      />
    </Card>
  )
}
export default ProfessionalCard
