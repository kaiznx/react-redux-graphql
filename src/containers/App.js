import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from '../components/Home';
import Dashboard from '../components/Dashboard';
import LoginContainer from '../containers/Login';

class App extends Component {
  render() {
    const { isAuthenticated } = this.props;
    
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' render={(props) => ( isAuthenticated
            ? <Redirect to='/dashboard' />
            : <LoginContainer {...props} />
          )} />
          <Route exact path='/dashboard' render={(props) => ( isAuthenticated
            ? <Dashboard {...props} />
            : <Redirect to='/' />
          )} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { isAuthenticated } = state.session;
  return {
    isAuthenticated
  }
}

export default connect(mapStateToProps)(App);