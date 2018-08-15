import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login, logout, getToken } from './actions/sessionActions';
import { getCurrentUser } from './actions/userActions';

import Header from './components/Header';
import LoginForm from './components/LoginForm';
import Welcome from './components/Welcome';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  componentDidMount() {
    this.props.getToken();
  }

  componentDidUpdate(prevProps) {
    if (this.props.token &&
        this.props.token !== prevProps.token &&
        !this.props.user
      ) {
      this.props.getCurrentUser();
    }
  }

  handleLogin = ({ username, password } ) =>
    this.props.login({ username, password });

  handleLogout = () => this.props.logout();

  render() {
    const { user, validating, error } = this.props;

    const content = !user ? (
      <LoginForm
        login={this.handleLogin}
        error={error}
        validating={validating}
      />
    ) : (
      <Welcome
        user={user}
        logout={this.handleLogout}
      />
    )

    return (
      <div className="App">
        <Header logo={logo} title="JWT Demo" />
        {content}
      </div>
    );
  }
}

export default connect(
  (state) => ({
    token: state.session.token,
    user: state.session.user,
    validating: state.session.validating,
    error: state.session.error
  }),
  {
    login,
    logout,
    getToken,
    getCurrentUser
  }
)(App);
