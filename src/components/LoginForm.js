import React, { Component } from 'react';

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    this.props.login({ username, password });
  }

  render() {
    const { username, password } = this.state;

    return (
      <div className="login-form">
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="field">
            <label htmlFor="username">username</label>
            <input id="username" type="text" name="username" value={username} onChange={this.handleChange} />
          </div>
          <div className="field">
            <label>password</label>
            <input type="password" name="password" value={password} onChange={this.handleChange} />
          </div>
          <div className="field">
            <input type="submit" value="Login" />
          </div>
        </form>
      </div>
    )
  }
}

export default LoginForm;
