import React from 'react'
import { Row, Col, Card, Icon, List } from 'antd'
import { head, defaultTo, split, last, toUpper, equals } from 'ramda'
import { isEmptyOrNull, mapIndexed } from '../../../../utils/helpers'
import { ActionButtons } from './ActionButtons'

export const SingleOffer = (props) => {

  const { selectedOffer, updateOfferStatus } = props

  const {
    shiftRate,
    shifts,
    professionalName,
    professionalNmc,
    status,
    message,
    professionalMsg
  } = defaultTo({}, selectedOffer)

  const list = split(',', defaultTo('', shifts))
  const subTitle = toUpper(defaultTo('', status))

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
        <Col span={8}>
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
        <Col span={8}>
          <label>Professional Details</label>
          <List>
            <List.Item>
              <List.Item.Meta
                title={'Professional Name'}
                description={professionalName}
              />
            </List.Item>
            <List.Item>
              <List.Item.Meta
                title={'NMC Pin'}
                description={professionalNmc}
              />
            </List.Item>
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
                description={toUpper(defaultTo('', status))}
              />
            </List.Item>
          </List>
          </List>
        </Col>
        <Col span={8}>
          <label>Messages</label>
          <List>
            {
              isEmptyOrNull(message) ? '' :
              <List.Item>
                <List.Item.Meta
                  title={'You'}
                  description={message}
                />
              </List.Item>
            }
            {
              isEmptyOrNull(professionalMsg) ? '' :
              <List.Item>
                <List.Item.Meta
                  title={professionalName}
                  description={professionalMsg}
                />
              </List.Item>
            }
          </List>
        </Col>
        <Col span={24}>
          {
            equals(status, 'accepted') ?
            <ActionButtons
              offer={selectedOffer}
              updateOfferStatus={updateOfferStatus}
            /> : ''

          }
        </Col>
      </Row>
    </Card>
  )
}
