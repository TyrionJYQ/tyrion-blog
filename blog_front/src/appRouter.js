import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import Index from './components/layout/layout';
import Login from './components/login/login';
import Register from './components/register/register';
export default () => (
  <Router>
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/main/home" push />} />
      <Route path="/main" component={Index} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
  </Router>
)