import React from 'react'
import { map, pathOr } from 'ramda'
import { Row, Col, Empty } from 'antd'
import ProfessionalCard from './ProfessionalCard'
import { isEmptyOrNull } from '../../../../utils/helpers'

const ProfessionalsList = ({
  professionals,
  documentModal,
  documentModalType,
  showDocumentModal,
  hideDocumentModal,
  getDocumentType,
  imageModal,
  showImageModal,
  hideImageModal,
  formValues
}) => {
  const shift =  pathOr('', ['searchForm', 'shift'], formValues)
  return (
    <Row gutter={16} className="professionals-list">
      {
        isEmptyOrNull(professionals) && !isEmptyOrNull(shift) ?
        <Empty description="No professionals available for this shift." /> :
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
