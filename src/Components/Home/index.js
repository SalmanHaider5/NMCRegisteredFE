import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter, Redirect, Switch } from 'react-router-dom'

import Home from './Home'
import Login from './Login'

class App extends Component {
  
  render() {
    const { login: { auth } } = this.props
    console.log(this.props)
    return (
      <div>
        <Switch>
          <Route path="/login" component={Login} />
          { auth && (<Route path="/" component={Home} />) }
          { !auth && (<Redirect to="/login" />) }
          <Redirect to="/orders" />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return{
    login: state.login.verification
  }
}

export default withRouter(connect(mapStateToProps)(App))