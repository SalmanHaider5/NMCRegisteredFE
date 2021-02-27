import React from 'react'
import moment from 'moment'
import { PageHeader, Icon, Row, Col } from 'antd'
import { isEmptyOrNull, mapIndexed } from '../../../../utils/helpers'
import ProfessionalCard from './ProfessionalCard'

export const CardsList = (props) => {

  const { currentWeek, professionals } = props

  return (
    <>
     {
       mapIndexed((date, index) => {
         const title = moment(date).format('LL')
         const subTitle = moment(date).format('dddd')
         const message = isEmptyOrNull(professionals[index]) ? <><Icon type="file-search" /> No professional found </> : ''
         return <span key={index}>
          <PageHeader
            className="date-header"
            title={title}
            subTitle={subTitle}
            extra={message}
          />
          <Row gutter={16} className="professionals-list">
            {
              isEmptyOrNull(professionals[index]) ? '' :
              mapIndexed((professional, i) => {

                return <Col span={8} key={i}>
                    <ProfessionalCard {...props} professional={professional} />
                </Col>

              }, professionals[index] || [])
            }
          </Row>
         </span>
       }, currentWeek)
     } 
    </>
  )
}
