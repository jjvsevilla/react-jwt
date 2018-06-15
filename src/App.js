import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import apiService from './services/apiService';
import authService from './services/authService';

const CREDENTIALS = {
  username: 'globant',
  password: '123'
}

class App extends Component {
  state = {
    username: '',
    password: '',
    user: null,
    result: null,
    error: null
  }

  componentDidMount() {
    apiService.getUser()
      .then(response => {
        if (response) {
          this.setState({ user: response.user });
        }
      })
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleLogin = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    this.setState({ error: null });
    apiService.login(username, password)
      .then(response => {
        authService.setToken(response.token);
        this.setState({ user: response.user });
      })
      .catch((err) => {
        this.setState({ error: err });
      })
  }

  handleLogout = () => {
    authService.setToken();
    this.setState({ user: null, username: '', password: '' });
  }

  getUser = () => {
    apiService.getRandomUser()
      .then(user => this.setState({ result: user }))
      .catch((err) => {
        this.setState({ error: err });
      })
  }

  render() {
    const { username, password, user, result, error } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">JWT Demo</h1>
        </header>

        {!user &&
        <div className="public-section">
          <div className="login-wrapper">
            <form className="form" onSubmit={this.handleLogin}>
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

            {error && <p className="form-error">{error.message}</p>}

            <div className="api-result">
              <pre>{JSON.stringify(CREDENTIALS, undefined, 2)}</pre>
            </div>
          </div>
        </div>}

        {user &&
        <div className="private-section">
          <p>Welcome {user.firstname} {user.lastname}</p>

          <div className="options-wrapper">
            <button onClick={this.getUser}>Get Random User</button>
            <button onClick={this.handleLogout}>Logout</button>
          </div>

          {result &&
          <div className="api-result">
            <pre>{JSON.stringify(result, undefined, 2)}</pre>
          </div>}
        </div>}
      </div>
    );
  }
}

export default App;
