import React, { Component } from 'react';
import Gmap from './gmap';

class Game extends Component {
  render() {
    return (
      <div className='story-div'>
        <Gmap />
        <div className='gameplay-screen'>
          <h1>GamePlay</h1>
          <h1>Screen</h1>
          <div className='action-buttons'>
            <button className="action-button mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--accent">
              Scavenge
            </button>
            <button className="action-button mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--accent">
              Rest
            </button>
          </div>
        </div>
        <form className='directions' action="#">
          <div className="dir-textfield mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <textarea
              className="dir-textarea mdl-textfield__input"
              type="text" rows= "4" id="sample1" />
            <label
              className="dir-label mdl-textfield__label"
              htmlFor="sample1">Directions
            </label>
          </div>
        </form>
        <div className='summit-action-buttons'>
          <button className="summit-button mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
            Summit
          </button>
        </div>
      </div>
    );
  }
}

export default Game;
