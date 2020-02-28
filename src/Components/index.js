import React, { Component } from 'react'
import { withRouter, Route, Switch } from 'react-router-dom'
import Home from './Home'
import Company from './Company'
import Professional from './Professional'
import ResetPassword from './ResetPassword'

class Application extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/company/:userId" component={Company} />
        <Route path="/professional/:userId" component={Professional} />
        <Route path="/:userId/verify/:token" component={Home} />
        <Route path="/:userId/resetPassword/:token" component={ResetPassword} />
      </Switch>
    )
  }
}

export default withRouter(Application)