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
    this.dingLa = "xd";
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
    }).then(() => this.handleContinue("waypoints"));
  }
  handleContinue(type) {
    if (this.state.pathId) {
      axios({
        method: "PATCH",
        url: `/api/users/${this.userId}`,
        data: { user: this.state.user }
      }).then((res) => {
        console.log(res.data);
        this.props.history
          .push(`/${this.userId}/${this.state.pathId}/${type}`);
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
    // for material design lite
    let elements = document.querySelectorAll('.mdl-button, .mdl-tooltip');
    window.componentHandler.upgradeElements(elements);

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
          this.setState({ path: result.data, pathId: result.data.pathId });
        });
      } else {
        axios({
          method: "GET",
          url: `/api/paths/${this.state.user.currentPathId}`
        }).then((data) => {
          if (data) {
            this.setState({ path: data.data[0], pathId: this.state.user.currentPathId });
          } else {
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
              this.setState({ path: result.data, pathId: result.data.pathId });
            });
          }
        });
      }
    });

  }

  render() {
    let continueButton;
    let gameWonMessage = (<p>Congratulations! You've finished a max length journey and can now start a new game! Enjoy!</p>);
    if (this.state.user && this.state.path) {
      if ((this.state.user.currentPathId > -1) && (this.state.path.steps.length < 9)) {
        continueButton = (
                  <button
                    onClick={() => { this.handleContinue('game'); }}
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
