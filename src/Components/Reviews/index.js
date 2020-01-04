import React, { Component } from 'react'
import { connect } from 'react-redux'
import { notification, Spin, Card } from 'antd'
import { getReviews, updateReviewsStatus } from '../../actions'
import { Reviews } from '../../utils/custom-components'
import './reviews.css'

class ReviewsContainer extends Component {

  componentWillReceiveProps(nextProps) {
    if (this.props.reviews.updateRequest !== nextProps.reviews.updateRequest) {
      if (!this.props.reviews.updateRequest) {
        notification.success({
          message: 'Update Success',
          description: 'Review status is successfully updated.',
          placement: 'bottomLeft',
          style: {
            backgroundColor: 'rgb(77, 141, 45)',
            color: '#fff'
          }
        })
      }
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getReviews())
  }

  hideOrShowReview = (review) => {
    const { dispatch } = this.props
    dispatch(updateReviewsStatus(review))
  }

  render() {
    const { reviews: { isLoading, reviews } } = this.props
    return (
      <div className="reviews-container">
        <Spin spinning={isLoading} tip="Loading...">
          <Card title="Reviews & Feedback">
            <Reviews
              feedback={reviews}
              hideOrShowReview={this.hideOrShowReview}
            />
          </Card>
        </Spin>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    reviews: state.reviews
  }
}

export default connect(mapStateToProps)(ReviewsContainer)