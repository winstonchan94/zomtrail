import React, { Component } from 'react';

class Story extends Component {
  render() {
    return (
      <div className='story-div'>
        <h2 className='story-title'>Story</h2>
        <p className='story-content'>Thank you for playing! Please be aware that this game will require internet connection and use of your location.
        Remember to stay aware of your surroundings during gameplay!
        </p>
        <div className='action-buttons'>
          <button className="button mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default Story;
