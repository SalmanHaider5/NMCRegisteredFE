import React, { Component } from 'react'
import { withRouter, Route, Switch } from 'react-router-dom'
import Home from './Home'
import Company from './Company'

class Application extends Component {
  render() {
    return (
      <Switch>
        kfk
        <Route exact path="/" component={Home} />
        <Route path="/company/:userId" component={Company} />
      </Switch>
    )
  }
}

export default withRouter(Application)