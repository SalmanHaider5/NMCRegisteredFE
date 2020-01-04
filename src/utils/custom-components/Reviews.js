import React from 'react'
import { Button, List, Icon, Rate } from 'antd'
import './custom-components.css'

const ListTitle = ({ review }) => {
  return(
    <span>
      <h2>
        {review.name}
      </h2>
      <Rate disabled defaultValue={review.rate} />
      <p>{review.email}</p>
    </span>
  )
}

export const Reviews = ({
  feedback,
  hideOrShowReview
}) => {
  return (
    <List
      className="reviews-list"
      itemLayout="horizontal"
      dataSource={feedback}
      renderItem={review => (
        <List.Item>
          <List.Item.Meta
            title={<ListTitle review={review} />}
            description={<h4>{review.text}</h4>}
          />
          <div>
            <Button type="primary" onClick={() => hideOrShowReview(review)}>
              <Icon type={review.status === 'Active' ? 'minus' : 'plus'} />
            </Button>
          </div>
        </List.Item>
      )}
    />
  )
}