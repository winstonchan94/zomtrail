import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

class DropdownMenu extends Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleOpenMenu() {
    let dropdown = document.getElementById('drop-down-menu');
    if (dropdown.style.display === "block") {
      dropdown.style.display = "none";
    } else {
      dropdown.style.display = "block";
    }
  }

  handleLogout() {
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
      <div className='menu-div'>
        <div className='menu'
          id='menu'>
          <i className="fas fa-bars"
            onClick={this.handleOpenMenu}></i>
        </div>
        <div className='drop-down-menu'
          id='drop-down-menu'>
          <ul>
            <li className='option-li'>Scoreboard</li>
            <li className='option-li'>Start A new game</li>
            <li className='option-li'
              onClick={this.handleLogout}>Logout</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default withRouter(DropdownMenu);
