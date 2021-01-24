import React from 'react'
import { Row, Col, Card, Icon, List } from 'antd'
import { head, defaultTo, length, join, split, last, toUpper, equals } from 'ramda'
import { isEmptyOrNull, mapIndexed } from '../../../../utils/helpers'
import { OfferActions } from './OfferActions'

export const SingleOffer = (props) => {

  const { selectedOffer } = props

  const {
    shiftRate,
    shifts,
    companyName,
    address,
    status,
    message
  } = defaultTo({}, selectedOffer)

  const list = split(',', shifts)
  const shiftsCount = length(defaultTo([],  split(',', shifts)))
  const subTitle = join(' ', [shiftsCount, 'Shift(s)', 'at', shiftRate, 'GBP per hour'])

  const cardStyle={
    position: 'relative',
    width: '90%',
    margin: '0 auto'
  }

  return (
    <Card
      title={<>
        <Icon typ="paper-clip" /> Shift Offer Details
        <span className="receipt-subtitle">{subTitle}</span>
      </>}
      bordered={false}
      style={cardStyle}
      className="receipt-card"
    >
      <Row className="data-container">
        <Col xl={8} lg={8} md={8} sm={24}>
          <label>Shifts</label>
          <List>
            {
              mapIndexed((shift, index) => {
                
                const shiftArr = split(' - ', shift) 
                const date = head(shiftArr)
                const desc = last(shiftArr)

                return <List.Item key={index}>
                  <List.Item.Meta
                    title={date}
                    description={desc}
                  />
                </List.Item>
              }, list)
            }
          </List>
        </Col>
        <Col xl={8} md={8} lg={8} sm={24}>
          <label>Company Details</label>
          <List>
            <List.Item>
              <List.Item.Meta
                title={'Company Name'}
                description={companyName}
              />
            </List.Item>
            <List.Item>
              <List.Item.Meta
                title={'Company Address'}
                description={address}
              />
            </List.Item>
          </List>
        </Col>
        <Col xl={8} md={8} lg={8} sm={24}>
          <label>Other Details</label>
          <List>
            <List.Item>
              <List.Item.Meta
                title={'Shift Rate'}
                description={`GBP ${shiftRate} per hour`}
              />
            </List.Item>
            <List.Item>
              <List.Item.Meta
                title={'Status'}
                description={toUpper(status)}
              />
            </List.Item>
            {
              isEmptyOrNull(message) ? '' :
              <List.Item>
                <List.Item.Meta
                  title={'Message'}
                  description={message}
                />
              </List.Item>
            }
          </List>
        </Col>
        <Col span={24}>
          { equals(status, 'pending') ? <OfferActions {...props} /> : '' }
        </Col>
      </Row>
    </Card>
  )
}
