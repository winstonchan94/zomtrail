import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';

class Story extends Component {
  constructor(props) {
    super(props);

    this.handleContiune = this.handleContiune.bind(this);
    this.logout = this.logout.bind(this);
  }

  handleContiune() {
    this.props.history.push("/waypoints");
  }

  logout () {
    window.gapi.load('auth2', () => {
      window.gapi.auth2.init().then(() => {
        let auth2 = window.gapi.auth2.getAuthInstance();
        auth2.signOut().then(() => {
          console.log('Successfully sign out');
          this.props.history.push("/");
        });
      });
    });
  }

  render() {
    return (
      <div className='story-div'>
        <h2 className='story-title'>Zomtrail Storyline</h2>
        <p className='story-content'>Thank you for playing! Please be aware that this game will require internet connection and use of your location.
        Remember to stay aware of your surroundings during gameplay!
        </p>
        <div className='continue-buttons'>
          <button
            onClick={this.logout}
            className="continue mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
            Logout
          </button>
          <button
            onClick={this.handleContiune}
            className="continue mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
            Contiune
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Story);
