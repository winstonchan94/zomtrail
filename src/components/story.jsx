import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

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
        <p className='story-content'>It’s the end of the world!</p>
        <p className='story-content'>Zombies, aliens, and doomsday salesman are all over the place looking for their next victims. Lead your group to safety and reach the final safe haven to escape with your lives!
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
