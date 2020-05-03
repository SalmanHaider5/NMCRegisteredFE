import React from 'react'
import { map } from 'ramda'
import { Row, Col } from 'antd'
import ProfessionalCard from './ProfessionalCard'

const ProfessionalsList = ({
  professionals,
  documentModal,
  documentModalType,
  showDocumentModal,
  hideDocumentModal,
  getDocumentType,
  imageModal,
  showImageModal,
  hideImageModal
}) => {
  return (
    <Row gutter={16} className="professionals-list">
      {
        map(professional => {
          const { id } = professional
          return(
            <Col span={8} key={id} >
              <ProfessionalCard
                professional={professional}
                documentModal={documentModal}
                documentModalType={documentModalType}
                showDocumentModal={showDocumentModal}
                hideDocumentModal={hideDocumentModal}
                getDocumentType={getDocumentType}
                imageModal={imageModal}
                showImageModal={showImageModal}
                hideImageModal={hideImageModal}
              />
            </Col>
          )
        }, professionals)
      }
    </Row>
  )
}
export default ProfessionalsList
