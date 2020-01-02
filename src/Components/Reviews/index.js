import React, { Component } from 'react'
import { connect } from 'react-redux'
import { filter, contains, toLower } from 'ramda'
import { notification, Spin } from 'antd'
import { getReviews, updateReviewsStatus } from '../../actions'
import { Reviews } from '../../utils/custom-components'
// import AllSubscribers from './Subscribers'

class ReviewsContainer extends Component {

  componentWillReceiveProps(nextProps) {
    if (this.props.reviews.updateRequest !== nextProps.reviews.updateRequest) {
      if (!this.props.reviews.updateRequest) {
        notification.success({
          message: 'Delete Success',
          description: 'Subscriber is successfully removed.',
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

  render() {
    console.log('Reviews', this.props.reviews)
    const { reviews: { isLoading, reviews } } = this.props
    return (
      <div className="subscribers-container">
        <Spin spinning={isLoading} tip="Loading...">
          <Reviews feedback={reviews} />
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