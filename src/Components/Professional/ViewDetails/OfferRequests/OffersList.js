import React from 'react'
import { equals, prop } from 'ramda'
import { List, Icon } from 'antd'

export const OffersList = (props) => {

  const { offers, currentIndex, setIndex } = props

  return (
    <List
      rowKey="id"
      dataSource={offers}
      renderItem={(offer={}, index) => (
        <List.Item className={equals(currentIndex, index) ? 'active-list-item' : 'list-item' } onClick={() => setIndex(index)}>
          <List.Item.Meta
            title={<><Icon type="tag" /> &nbsp;&nbsp; {prop('companyName', offer)}</>}
            description={`£ ${offer.shiftRate} per hour`}
          />
          <div className="list-arrow">
            <Icon type="arrow-right" />
          </div>
        </List.Item>
      )}
    />
  )
}
