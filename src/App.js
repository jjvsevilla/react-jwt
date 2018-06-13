import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import services from './services';

class App extends Component {
  state = {
    username: '',
    password: '',
    token: null,
    user: null,
    error: null
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    this.setState({ error: null });
    services.login(username, password)
      .then(response => {
        this.setState({
          token: response.token,
          user: response.user
        });
      })
      .catch((err) => {
        this.setState({ error: err });
      })
  }

  getUser = () => {
    services.getRandomUser()
      .then(user => this.setState({ user }))
  }

  render() {
    const { username, password, user, error } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">JWT demo</h1>
        </header>

        <div className="login-wrapper">
          <form className="App-form" onSubmit={this.handleSubmit}>
            <label>
              username: <input type="text" name="username" value={username} onChange={this.handleChange} />
            </label>
            <label>
              password: <input type="password" name="password" value={password} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
          {error && <p className="form-error">{error.message}</p>}
        </div>

        <button onClick={this.getUser}>Get User</button>

        {user &&
        <div className="jwt-result">
          <pre>{JSON.stringify(user, undefined, 2)}</pre>
        </div>}
      </div>
    );
  }
}

export default App;
