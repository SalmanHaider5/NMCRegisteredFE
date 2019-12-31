import React, { Component } from 'react'
import { connect } from 'react-redux'
import { filter, contains, toLower } from 'ramda'
import { notification } from 'antd'
import { getSubscribers, deleteSubscriber } from '../../actions'
import AllSubscribers from './Subscribers'

class Subscribers extends Component {

  componentWillReceiveProps(nextProps){
    if(this.props.subscribers.deleteRequest !== nextProps.subscribers.deleteRequest){
      if(!this.props.subscribers.deleteRequest){
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
  
  componentDidMount(){
    const { dispatch } = this.props
    dispatch(getSubscribers())
  }

  deleteSubscriber = id => {
    const { dispatch } = this.props
    dispatch(deleteSubscriber(id))
  }

  onSearch = e => {
    const { subscribers: { subscribers }, dispatch } = this.props
    const value = e.target.value 
    if(value.length === 0) { dispatch(getSubscribers()) }
    const filteredSubscribers = filter(subscriber => contains(toLower(value), toLower(subscriber.email)), subscribers)
    dispatch({
      type: 'FETCH_SUBSCRIBERS_SUCCESS',
      payload: filteredSubscribers
    })
  }
  
  render() {
    const { subscribers: { isLoading, subscribers } } = this.props
    return (
      <div className="subscribers-container">
        <AllSubscribers
          deleteSubscriber={this.deleteSubscriber}
          isLoading={isLoading}
          subscribers={subscribers}
          onSearch={this.onSearch}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    subscribers: state.subscribers
  }
}

export default connect(mapStateToProps)(Subscribers)