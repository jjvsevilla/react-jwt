import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import services from './services';

class App extends Component {
  state = {
    user: null
  }

  getUser = () => {
    services.getRandomUser().then(data => {
      this.setState({
        user: data
      })
    })
  }

  render() {
    const { user } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
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
