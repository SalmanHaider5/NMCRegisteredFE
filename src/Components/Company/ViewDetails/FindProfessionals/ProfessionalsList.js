import React from 'react'
import moment from 'moment'
import { map, isEmpty } from 'ramda'
import { Row, Col, Empty, PageHeader, Icon, Spin } from 'antd'
import ProfessionalCard from './ProfessionalCard'
import { isEmptyOrNull, mapIndexed } from '../../../../utils/helpers'

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
  formValues,
  searchInputValue,
  currentWeek,
  offerModal,
  showOfferModal,
  hideOfferModal,
  company,
  offerFormShifts,
  submitOfferRequest,
  isLoading
}) => {
  return (
    <Spin spinning={isLoading} tip='Loading...'>
      {
        isEmptyOrNull(searchInputValue) ?
        '' :
        isEmpty(professionals) ?
        <Empty description="No professionals available for this search" /> :
        mapIndexed((date, index) => {
        return(
          <>
            <PageHeader
              className="date-header"
              title={moment(date).format('LL')}
              subTitle={moment(date).format('dddd')}
              extra={isEmptyOrNull(professionals[index]) ? <><Icon type="file-search" /> No Professional Found</> : ''}
            />
            <Row gutter={16} className="professionals-list">
              {
                isEmptyOrNull(professionals[index]) ?
                '' :
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
                        offerModal={offerModal}
                        company={company}
                        formValues={formValues}
                        showOfferModal={showOfferModal}
                        hideOfferModal={hideOfferModal}
                        offerFormShifts={offerFormShifts}
                        submitOfferRequest={submitOfferRequest}
                      />
                    </Col>
                  )
                }, professionals[index] || [])
              }
            </Row>
          </>
        )
        }, currentWeek)
      }
    </Spin>
  )
}
export default ProfessionalsList
