import React, { Component } from 'react';
import SignInWith from './SignInWith';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      agreed: false,
    };
  }

  handleCheckBox() {
    return (e) => {
      if (e.target.checked) {
        document.getElementById('signin-button')
          .style.display = 'flex';
      } else {
        document.getElementById('signin-button')
          .style.display = 'none';
      }
    };
  }

  handleCloseModal() {
    document.getElementById('tos-modal')
      .style.display = 'none';
  }

  handleOpenModal() {
    document.getElementById('tos-modal')
      .style.display = 'block';
  }

  handleAgreeTos() {
    document.getElementById('tos-label').MaterialCheckbox.check();
    document.getElementById('signin-button')
      .style.display = 'flex';
    document.getElementById('tos-modal')
      .style.display = 'none';
  }

  renderTos() {
    return (
      <div id="tos-modal" className="tos-modal">
        <div className="tos-modal-content">
          <span className="close"
            onClick={this.handleCloseModal}>&times;</span>
  <h1>Purpose & Intention:</h1>

  <p>ZomTrail is a web application game that guides players throughout the city as they traverse within a fictional setting. The main goal of ZomTrail is provide as entertaining as possible a platform to gather rich natural language data created by real people for the purpose of Google’s research towards machine learning.</p>

  <h1>Privacy and Use of Data:</h1>

  <p>Any and all personal identification information will not be shared. The only data that will be shared with Google and in the future if it is to be opensourced are the text directions provided either via direct input or speech-to-text. The photographs of the waypoints will also be shared.</p>

  <p>Please be aware that there is a leadership board and that those who reach it will be prompted for a name. Those records will not be shared with specific entities but will be public to all other users.</p>

  <p>Only three pieces of information will be shared:
  Waypoints selected/visited
  Directions given (in text format)
  Photographs submitted</p>

  <p>Though the app will occasionally ask for the user’s current location at certain points in time, this data is used only for gameplay and will not be shared with a 3rd party.</p>

  <p>The data will be shared and may be modified (for formatting reasons and/or to protect user anonymity) before submission to Google Inc. Google may also later release the data to be public for other institutions that may also wish to utilize the data for their machine learning research.</p>

  <h1>Data Ownership:</h1>

  <p>Although ZomTrail maintains ownership over all entered/given data to the application, ZomTrail will only use the data in accordance with the purposes laid out in the “Privacy and Use of Data” section of this Terms of Use.</p>

  <h1>Data Usage:</h1>

  <p>ZomTrail is a game that requires active connection to the internet. Though we have created with efficiency as a core tenant, data must be used in many of the game’s mechanics. By playing, the user agrees to shoulder any payment that may be sustained from such usage.</p>


  <h1>Claiming Prizes:</h1>

  <p>Players that remain on the leadership board at a specific moment in time may be elgible for certain prizes from physical items like cash or movie tickets to digital items like titles and badges.</p>

  <p>ZomTrail reserves the right to revoke the prize to any winners who reach such a position through unintentional, malicious, or alternative means that go against the spirit of the game.</p>

  <h1>Safety</h1>

  <p>ZomTrail is a game played in real-time in the real world. As a result, users are responsible for their own safety in physically navigating through the world as they are immersed in the game.</p>

  <p>Please be aware of your surroundings!</p>

  <h1>Limitation of Liability:</h1>

  <p>By using this application, users agree that they waive any right to pursue recourse against ZomTrail in the event of any injury or damages.</p>

  <p>Though ZomTrail will protect user data as well (and remove any irrelevant user-identifiable data from its servers), it cannot be responsible for any data breaches or exposures. As a result, please do not submit or reveal any such information to the application.</p>

  <h1>Term Changes:</h1>

  <p>ZomTrail maintains the ability to change the terms of this agreement at any time. Upon such a change, users of the application will be notified, and must agree once again before being allowed to use the app. This is to ensure that users are aware of all new conditions before continuing usage and prevent unintentional waiving of rights.</p>

          <div className='continue-buttons'>
            <button
              onClick={this.handleAgreeTos}
              className="continue mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
              I Agree
            </button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className='login-div'>
        {this.renderTos()}
        <h2 className='login-title'>Welcome to Zomtrail</h2>
        <img
          className='logo'
          src="pic/Icons-Footsteps-vertical.png"
          alt="Smiley face"></img>
        <div className='tos-text'>
          <a
            onClick={this.handleOpenModal}>Terms of Service
          </a>
        </div>
        <div className='tos-checkbox-div'>
          <label className="tos-label mdl-checkbox mdl-js-checkbox"
            id='tos-label'
            htmlFor="checkbox-agree-tos">
            <input
              className="tos-checkbox mdl-checkbox__input"
              type="checkbox" id="checkbox-agree-tos"
              onChange={this.handleCheckBox()}
              />
            <span className="mdl-checkbox__label">I understand and agree to the ToS</span>
          </label>
        </div>

        <SignInWith/>
      </div>
    );
  }
}

export default Login;
