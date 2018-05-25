import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

class Story extends Component {
  constructor(props) {
    super(props);

    this.handleContiune = this.handleContiune.bind(this);
  }

  handleContiune() {
    this.props.history.push("/game");
  }

  render() {
    return (
      <div className='story-div'>
        <h2 className='story-title'>Zomtrail Story</h2>
        <p className='story-content'>Thank you for playing! Please be aware that this game will require internet connection and use of your location.
        Remember to stay aware of your surroundings during gameplay!
        </p>
        <div className='continue-buttons'>
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
