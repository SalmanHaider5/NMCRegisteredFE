import React from 'react'
import { Col, Icon, Card, List } from 'antd'
import { prop, equals, nth } from 'ramda'
import { SingleOffer } from './SingleOffer'

export const Requests = ({ offers, currentIndex, setIndex, updateOfferStatus }) => {

  const selectedOffer = nth(currentIndex, offers)

  return (
    <Card className="offers-list-container">
      <Col span={6} className="list-content">
        <List
          rowKey="id"
          dataSource={offers}
          renderItem={
            (offer, index) => {
              return <List.Item key={index} className={equals(currentIndex, index) ? 'active-list-item' : 'list-item' } onClick={() => setIndex(index)}>
                <List.Item.Meta
                  title={<><Icon type="tag" /> &nbsp;&nbsp; {prop('professionalName', offer)}</>}
                  description={`£ ${offer.shiftRate} per hour`}
                />
                <div className="list-arrow">
                  <Icon type="arrow-right" />
                </div>
              </List.Item>
            }
          }
        />
      </Col>
      <Col span={18} className="offer-content">
          <SingleOffer selectedOffer={selectedOffer} updateOfferStatus={updateOfferStatus} />
      </Col>
    </Card>
  )
}
