import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import Index from './components/layout/layout'
export default () => (
  <Router>
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/main/home" push />} />
      <Route path="/main" component={Index} />
    </Switch>
  </Router>
)