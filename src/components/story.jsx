import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import axios from 'axios';
class Story extends Component {
  constructor(props) {
    super(props);
    this.userId = this.props.match.params.userId;
    this.handleNewGame = this.handleNewGame.bind(this);
    this.handleContinue = this.handleContinue.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      path: null,
      pathId: null,
      user: null
    };
  }
  handleNewGame() {
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
    }).then((result) => {
      let editUser = this.state.user;
      editUser.currentPathId = result.data.pathId;
      this.setState({ path: result.data, pathId: result.data.pathId, user: editUser });
    }).then(() => this.handleContinue());
  }
  handleContinue() {
    if (this.state.pathId){
      axios({
        method: "PATCH",
        url: `/api/users/${this.userId}`,
        data: { user: this.state.user }
      }).then((res) => {
        console.log(res.data);
        this.props.history
          .push(`/${this.userId}/${this.state.pathId}/waypoints`);
      });
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
    axios({
      method: "GET",
      url: `/api/users/${this.userId}`
    }).then((res) => {
      this.setState({ user: res.data });
      if (this.state.user.currentPathId < 0) {
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
        }).then((result) => {
          let editUser = this.state.user;
          editUser.currentPathId = result.data.pathId;
          this.setState({ path: result.data, pathId: result.data.pathId, user: editUser });
        });
      } else {
        axios({
          method: "GET",
          url: `/api/paths/${this.state.user.currentPathId}`
        }).then(data => this.setState({ path: data.data, pathId: this.state.user.currentPathId }));
      }
    });

  }

  render() {
    let continueButton;
    if (this.state.user) {
      if (this.state.user.currentPathId > -1) {
        continueButton = (
                  <button
                    onClick={this.handleContinue}
                    className="continue mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
                    Continue Previous Journey
                  </button>
                );
      }
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
              onClick={this.handleNewGame}
              className="continue mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
              Begin New Adventure
            </button>
            {continueButton}
          </div>
        </div>
      );
    } else {
      return(<div>loading</div>);
    }
  }
}

export default withRouter(Story);
