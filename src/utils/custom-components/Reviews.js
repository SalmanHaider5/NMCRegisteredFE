import React from 'react'
import { Button, List, Icon, Rate } from 'antd'
import './custom-components.css'

export const Reviews = ({
  feedback
}) => {
  return (
    <List
      className="reviews-list"
      itemLayout="horizontal"
      dataSource={feedback}
      renderItem={review => (
        <List.Item>
          <List.Item.Meta
            title={<span><Button type="primary">
              <Icon type={review.status === 'Active' ? 'minus' : 'plus'} />
            </Button><h2>{review.name}</h2><p>{review.email}</p></span>}
            description={<h4>{review.text}</h4>}
          />
          <div>
            <Rate disabled defaultValue={review.rating} />
          </div>
        </List.Item>
      )}
    />
  )
}