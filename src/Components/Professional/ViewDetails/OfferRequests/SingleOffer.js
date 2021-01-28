import React from 'react'
import { Row, Col, Card, Icon, List } from 'antd'
import { head, defaultTo, length, join, split, last, toUpper, equals, not } from 'ramda'
import { isEmptyOrNull, mapIndexed } from '../../../../utils/helpers'
import { OfferActions } from './OfferActions'
import MessageForm from './MessageForm'
import { FormSection } from 'redux-form'

export const SingleOffer = (props) => {

  const { selectedOffer } = props

  const {
    shiftRate,
    shifts,
    companyName,
    address,
    status,
    professionalMsg,
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
          <label>Shift Details</label>
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
          </List>
        </Col>
        <Col xl={8} md={8} lg={8} sm={24}>
          <label>Messages</label>
          <List>
            {
              isEmptyOrNull(message) ? '' :
              <List.Item>
                <List.Item.Meta
                  title={companyName}
                  description={message}
                />
              </List.Item>
            }
            <List.Item>
              {
                isEmptyOrNull(professionalMsg) && equals(status, 'pending') ?
                <FormSection name="shiftMessage">
                  <MessageForm />
                </FormSection> :
                not(isEmptyOrNull(professionalMsg)) ?
                <List.Item.Meta
                  title={'You'}
                  description={professionalMsg}
                /> : ''
              }
            </List.Item>
          </List>
        </Col>
        <Col span={24}>
          { equals(status, 'pending') ? <OfferActions {...props} /> : '' }
        </Col>
      </Row>
    </Card>
  )
}
