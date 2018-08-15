import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRandomUser } from '../actions/userActions';
import Viewer from './Viewer';

class Welcome extends Component {

  getRandomUser = (event) => {
    event.preventDefault();
    this.props.getRandomUser();
  }

  // handleWrongApi = () => {
  //   this.setState({ error: null });
  //   apiService.callWrongEndpoint()
  //     .then(response => {
  //       console.log('handleWrongApi', response)
  //     })
  //     .catch((err) => {
  //       this.setState({ error: err });
  //     })
  // }

  render() {
    const { user, logout } = this.props;

    return (
      <div className="private-section">
        <p>Welcome {user.firstname} {user.lastname}</p>

        <div className="options-wrapper">
          <button onClick={this.getRandomUser}>Get Random User</button>
          <button onClick={logout}>Logout</button>
        </div>

        {this.props.randomUser &&
          <Viewer
            result={this.props.randomUser}
            loading={this.props.loading}
          />}
      </div>
    )
  }
}

export default connect(
  (state) => ({
    loading: state.user.token,
    randomUser: state.user.randomUser,
    error: state.user.error
  }),
  {
    getRandomUser
  }
)(Welcome);
