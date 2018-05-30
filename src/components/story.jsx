import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import axios from 'axios';
class Story extends Component {
  constructor(props) {
    super(props);
    this.userId = this.props.match.params.userId;
    this.handleContinue = this.handleContinue.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      path: null,
      pathId: null
    };
  }

  handleContinue() {
    console.log(this.state);
    if (this.state.pathId){
      this.props.history.push(`/${this.userId}/${this.state.pathId}/waypoints`);
    }
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

  componentDidMount() {
    // for material design lite
    let elements = document.querySelectorAll('.mdl-button, .mdl-tooltip');
    window.componentHandler.upgradeElements(elements);

    axios({
      method: "POST",
      url: "/api/paths",
      data: {
        path: {
          start_point: null,
          end_point: null,
          steps: [],
          pathId: Math.floor(Math.random() * 100000000)
        }
      }
    }).then(res => this.setState({ path: res.data, pathId: res.data.pathId }));
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
            onClick={this.handleContinue}
            className="continue mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
            Continue
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Story);
