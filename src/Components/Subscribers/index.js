import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getSubscribers, deleteSubscriber } from '../../actions'
import AllSubscribers from './Subscribers'

class Subscribers extends Component {
  
  componentDidMount(){
    const { dispatch } = this.props
    dispatch(getSubscribers())
  }

  deleteSubscriber = (event) => {
    const { dispatch } = this.props
    const { target: { id } } = event
    dispatch(deleteSubscriber(id))
  }
  
  render() {
    const { subscribers: { isLoading, subscribers } } = this.props
    return (
      <div>
        <AllSubscribers
          deleteSubscriber={this.deleteSubscriber}
          isLoading={isLoading}
          subscribers={subscribers}
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