import React from 'react'
import { List, Icon, Divider, Tooltip, Modal, Tag } from 'antd'
import { split, last } from 'ramda'
import WorkExperience from '../WorkExperience'
import { isEmptyOrNull } from '../../../../../utils/helpers'
import { DocumentViewer } from '../../../../../utils/custom-components'

const ProfessionalDetails = ({
  professional,
  getDocumentType,
  documentModal,
  documentModalType,
  showDocumentModal,
  hideDocumentModal
}) => {
  const {
    nmcPin,
    cpdHours,
    qualification,
    document,
    crbDocument
  } = professional
  const fileType = last(split('.', document))
  return (
    <span>
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
            <Icon type="audit" />
            CRB { isEmptyOrNull(crbDocument) ? '' : <Tag color="cyan">{crbDocument}</Tag> }
          </label>
          <span className="label-value">
            {
              isEmptyOrNull(crbDocument) ?
              `Not added yet` :
              <Tooltip title="Veiew Certificate">
                <Icon type="eye" onClick={() => showDocumentModal('CRB')} />
              </Tooltip>
            }
          </span>
        </List.Item>
        <List.Item>
          <label>
            <Icon type="hourglass" />
            CPD
          </label>
          <span className="label-value">{cpdHours} Hours</span>
        </List.Item>
        <List.Item>
          <label>
            <Icon type={fileType === 'pdf' ? `file-pdf` : `file-word` } />
            CV/Resume { isEmptyOrNull(document) ? '' :  <Tag color="cyan">{document}</Tag> }
          </label>
          <span className="label-value">
            {
              isEmptyOrNull(document) ?
              `Not added yet`:
                <Tooltip title="View Resume/CV">
                  <Icon type="eye" onClick={() => showDocumentModal('CV/Resume')} />
                </Tooltip>
            }
          </span>
        </List.Item>
      </List>
      <Divider orientation="left">Work Experience</Divider>
      <WorkExperience
        professional={professional}
      />
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
    </span>
  )
}
export default ProfessionalDetails
